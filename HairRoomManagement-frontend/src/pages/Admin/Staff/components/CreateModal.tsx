import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React from 'react';
import {addStaffUsingPost} from "@/services/backend/staffController";

interface Props {
  visible: boolean;
  columns: ProColumns<API.StaffVO>[];
  onSubmit: (values: API.StaffAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.StaffAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addStaffUsingPost(fields);
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'新建员工'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.StaffAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
