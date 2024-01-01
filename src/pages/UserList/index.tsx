import { getUsers, delUser } from '@/services/ant-design-pro/admin';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { DatePicker, Drawer, Popconfirm, Space, message } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const deleteUser = async (record: any) => {
    const res = await delUser({ id: record.id });
    if (res.error) {
      message.error(res.error);
    } else {
      message.success('删除成功');
      actionRef.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '用户ID',
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
      title: '用户名',
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '总订单数',
      dataIndex: 'total_orders',
      hideInForm: true,
      search: false,
    },
    {
      title: '注册时间',
      dataIndex: 'created_time',
      hideInForm: false,
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
      render: (_, record) => {
        return (
          <Space size="middle">
            <a
              key="config"
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              用户详情
            </a>
            <Popconfirm
              key="del"
              title="是否确认删除?"
              onConfirm={() => {
                deleteUser(record);
              }}
            >
              <a>删除用户</a>
            </Popconfirm>
          </Space>
        );
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
        request={getUsers}
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
