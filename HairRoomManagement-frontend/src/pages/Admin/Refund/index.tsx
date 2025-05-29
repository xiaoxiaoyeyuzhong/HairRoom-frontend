import CreateModal from '@/pages/Admin/Refund/components/CreateModal';
import CheckModal from '@/pages/Admin/Refund/components/CheckModal';
import { deleteUserUsingPost } from '@/services/backend/userController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {checkRefundUsingPost, listRefundByPageUsingPost} from "@/services/backend/refundController";
import {refundUsingPost} from "@/services/backend/aliPayController";

/**
 * 退款管理页面
 *
 * @constructor
 */
const RefundAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [checkModalVisible, setCheckModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.RefundVO>();

  /**
   * 审核状态通过节点
   *
   * @param row
   */
  const handleCheckPass = async (row: API.RefundVO) => {
    const hide = message.loading('正在审核');
    if (!row) return true;
    try {
      await checkRefundUsingPost({
        id: row.id as any,
        auditSituation: 1,
      });
      hide();
      message.success('审核成功');
      actionRef?.current?.reload();

      // 调用退款接口，完成退款
      await refundUsingPost({
        tradeNo: row.tradeNo,
        outTradeNo: row.outTradeNo,
        refundReason: row.refundReason,
        refundAmount: row.refundAmount,
      })
      hide();
      message.success('退款成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 审核状态驳回节点
   *
   * @param row
   */
  const handleCheckReject = async (row: API.RefundVO) => {
    const hide = message.loading('正在审核');
    if (!row) return true;
    try {
      await checkRefundUsingPost({
        id: row.id as any,
        auditSituation: 2,
      });
      hide();
      message.success('审核成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('审核失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.RefundVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      // disable: true,
      title: '支付宝交易号',
      dataIndex: 'tradeNo',
      valueType: 'text',
    },
    {
      title: '商户订单号',
      dataIndex: 'outTradeNo',
      valueType: 'text',
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      valueType: 'text',
    },
    {
      title: '退款原因',
      dataIndex: 'refundReason',
      valueType: 'textarea',
    },
    {
      title: '审核情况',
      dataIndex: 'auditSituation',
      hideInForm: true,
      valueEnum: {
        0:{
          text: '未审核',
          color: "yellow",
        },
        1: {
          text: '审核通过',
          color: "green",
        },
        2: {
          text: '审核不通过',
          color: "red",
        },
      },
    },
    {
      title: '退款情况',
      dataIndex: 'refundSituation',
      hideInForm: true,
      valueEnum: {
        0:{
          text: '未退款',
          color: "yellow",
        },
        1: {
          text: '已退款',
          color: "green",
        },
        2: {
          text: '退款失败',
          color: "red",
        },
      },
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
              setCheckModalVisible(true);
            }}
          >
            详情
          </Typography.Link>
          {!(record.refundSituation === 1) &&
            (<Typography.Link type="success" onClick={() => handleCheckPass(record)}>
            通过
          </Typography.Link>
            )}
          {!(record.refundSituation === 1) && (
            <Typography.Link
              type="danger"
              onClick={() => handleCheckReject(record)}
            >
              驳回
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RefundVO>
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

          const { data, code } = await listRefundByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);

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
      <CheckModal
        visible={checkModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setCheckModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCheckModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default RefundAdminPage;
