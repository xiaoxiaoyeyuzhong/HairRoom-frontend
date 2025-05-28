import {updateUserUsingPost} from '@/services/backend/userController';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';



interface Props {
  oldData?: API.RefundVO;
  visible: boolean;
  columns: ProColumns<API.RefundVO>[];
  onSubmit: (values: API.RefundUpdateRequest) => void;
  onCancel: () => void;
}

/**
 * 审核节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在审核');
  try {
    await updateUserUsingPost(fields);
    hide();
    message.success('审核成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('审核失败，' + error.message);
    return false;
  }
};

/**
 * 审核弹窗
 * @param props
 * @constructor
 */
const CheckModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  // 没有效果，禁用编辑
  // const disabledColumns: ProColumns<API.RefundVO>[] = columns.map(column => ({
  //   ...column,
  //     disable: true,  // 禁用编辑
  // }));

  return (
    <Modal
      destroyOnClose
      title={'审核'}
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
          disabled: true, // 将所有的组件置为不可用
        }}
        onSubmit={async (values: API.RefundUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CheckModal;
