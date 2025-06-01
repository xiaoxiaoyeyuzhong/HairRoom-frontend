import CreateModal from "@/pages/Admin/Staff/components/CreateModal";
import UpdateModal from "@/pages/Admin/Staff/components/UpdateModal";
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {deleteStaffUsingPost, listStaffByPageUsingPost} from "@/services/backend/staffController";
import {PlusOutlined} from "@ant-design/icons";

/**
 * 员工管理页面
 *
 * @constructor
 */
const StaffAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.StaffVO>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.StaffVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteStaffUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.StaffVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '员工名称',
      dataIndex: 'staffName',
      valueType: 'text',
    },
    {
      title: '员工性别',
      dataIndex: 'staffSex',
      valueType: 'text',
    },
    {
      title: '员工年龄',
      dataIndex: 'staffAge',
      valueType: 'text',
    },
    {
      title: '员工电话',
      dataIndex: 'staffPhone',
      valueType: 'text',
    },
    {
      title: '员工邮件',
      dataIndex: 'staffEmail',
      valueType: 'text',
    },
    {
      title: '创建用户id',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '所属门店id',
      dataIndex: 'storeId',
      valueType: 'text',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.StaffVO>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // 表格需要重新加载（首次渲染、分页、查找、筛选）时执行，请求数据
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listStaffByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.BillQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default StaffAdminPage;
