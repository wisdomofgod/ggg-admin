import { getOrders, reGenerate } from '@/services/ant-design-pro/admin';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Space, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';

const STATUS_MAP: any = {
  '': '未支付',
  unpaid: '未支付',
  paid: '生成中',
  paying: '支付中',
  refunded: '已退款',
  generate: '生成中',
  done: '已完成',
  timeout: '生成失败',
};

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const onReGenerate = (record: any) => {
    reGenerate({ order_number: record.order_number }).then(() => {
      message.success('重新生成成功!');
      actionRef?.current?.reload();
    });
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '订单ID',
      dataIndex: 'id',
      // sorter: true,
      hideInForm: true,
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '论文编号',
      dataIndex: 'order_number',
      valueType: 'textarea',
    },
    {
      title: '文章标题',
      dataIndex: 'paper_name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: STATUS_MAP,
      // render: (_: any, record: any) => (
      //   <Space size="middle">
      //     <a>{STATUS_MAP[_]}</a>
      //   </Space>
      // )
    },
    {
      title: '用户',
      dataIndex: 'username',
      render: (dom: string, entity: any) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom && dom !== '-' ? dom : `临时用户：${entity.created_by_tmp_user}`}
          </a>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      hideInForm: true,
      search: false,
    },
    {
      title: '支付时间',
      dataIndex: 'payment_time',
      hideInForm: true,
      search: false,
    },
    {
      title: '完成时间',
      dataIndex: 'completed_time',
      hideInForm: true,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: any) => {
        if (record.status == 'done') {
          return (
            <Space size="middle">
              <a
                onClick={() => {
                  window.open(record.download_url);
                }}
              >
                下载
              </a>
              <a
                onClick={() => {
                  onReGenerate(record);
                }}
              >
                重新生成
              </a>
            </Space>
          );
        }
        if (record.status == 'timeout' || record.status == 'paid') {
          return (
            <Space size="middle">
              <a
                onClick={() => {
                  onReGenerate(record);
                }}
              >
                重新生成
              </a>
            </Space>
          );
        }

        return <></>;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={getOrders}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
