import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React from 'react';
import {updateBillUsingPost} from "@/services/backend/billController";

interface Props {
  oldData?: API.BillVO; // 需要oldData属性，让外面传旧数据进来
  visible: boolean;
  columns: ProColumns<API.BillVO>[];
  onSubmit: (values: API.BillAddRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: API.BillUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateBillUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData,visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新账单'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.BillUpdateRequest) => {
          const success = await handleUpdate(
            {
              ...values,
              id: oldData.id as any
            });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
