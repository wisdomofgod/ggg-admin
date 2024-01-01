import { getInvites } from '@/services/ant-design-pro/admin';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { DatePicker, Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '邀请人用户ID',
      dataIndex: 'invite_user_id',
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
      title: '邀请正式用户数',
      dataIndex: 'invite_formal_users',
      valueType: 'textarea',
      render: (dom: any, entity) => {
        return dom.length;
      },
    },
    {
      title: '邀请临时用户数',
      dataIndex: 'invite_tmp_users',
      tooltip: '不含转正式用户数',
      render: (dom: any, entity) => {
        return dom.length;
      },
    },
    {
      title: '邀请支付订单数',
      tooltip: '没有选择订单创建时间时默认为上个月',
      dataIndex: 'lm_invite_orders',
      hideInForm: true,
      search: false,
    },
    {
      title: '订单创建时间',
      dataIndex: 'created_time',
      // hideInForm: false,
      hideInTable: true,
      renderFormItem: () => {
        return <DatePicker.RangePicker />;
      },
      search: {
        transform: (value, namescape, allValues) => {
          return { startTime: value[0], endTime: value[1] };
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
          }}
          disabled={true}
        >
          详情
        </a>,
      ],
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
        request={getInvites}
        columns={columns}
      />

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
