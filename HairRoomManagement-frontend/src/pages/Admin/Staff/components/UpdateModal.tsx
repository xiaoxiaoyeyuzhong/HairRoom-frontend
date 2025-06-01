import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React from 'react';
import {updateStaffUsingPost} from "@/services/backend/staffController";

interface Props {
  oldData?: API.StaffVO; // 需要oldData属性，让外面传旧数据进来
  visible: boolean;
  columns: ProColumns<API.StaffVO>[];
  onSubmit: (values: API.StaffAddRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: API.StaffAddRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateStaffUsingPost(fields);
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
      title={'更新员工信息'}
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
        onSubmit={async (values: API.StaffUpdateRequest) => {
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
