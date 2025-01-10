import {avatarUploadUsingPost, updateUserUsingPost} from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React, {useEffect, useState} from 'react';
import {RcFile} from "antd/es/upload";
import {ProFormUploadButton} from "@ant-design/pro-form";


interface Props {
  oldData?: API.UserVO;
  visible: boolean;
  columns: ProColumns<API.UserVO>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateUserUsingPost(fields);
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
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fileList, setFileList] = useState<any[]>([]);  // 用于管理上传的文件列表
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userAvatar, setUserAvatar] = useState<any>(oldData.userAvatar || []);  // 初始化头像为旧头像

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { // 组件渲染后执行，当旧数据变化时会重新执行
    // 如果有旧头像，设置 fileList 以便预览
    if (oldData.userAvatar) {
      setFileList([{
        uid: '-1', // 必须是唯一的标识
        name: 'avatar.jpg',
        status: 'done', // 上传成功
        url: oldData.userAvatar, // 旧头像的 URL
      }]);
    }
  }, [oldData]);

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  // 自定义上传方法
  const handleUpload: (userAvatar: RcFile) => Promise<string> = async (userAvatar: RcFile) => {
    const body = {}; // 如果有其他需要传递的参数可以放这里
    try {
      const response = await avatarUploadUsingPost(body, userAvatar);

      if (response && response.data) {
        setUserAvatar(response.data);  // 更新头像URL
        // return response.data;  // 返回文件 URL,但是action会使用Post访问图片，但是Post方法不被允许
        return response;
      }
      throw new Error('上传失败，未收到文件 URL');
    } catch (error) {
      console.error('头像上传失败', error);
      throw error;  // 上传失败时抛出错误
    }
  };

  // 处理columns，避免重复的头像字段
  const updatedColumns = columns.map(col => {
    if (col.dataIndex === 'userAvatar') {
      return {
        ...col,
        renderFormItem: (_, { ...rest }) => {
          return (
            <ProFormUploadButton
              label="点击下方，上传头像"
              name="userAvatar"
              action={handleUpload}
              fieldProps={{
                listType: 'picture-card',
                showUploadList: true,
                accept: '.jpg,.png',
                // fileList,
                maxCount: 1, // 限制上传的文件只有一个
                onChange: handleChange,
              }}
              fileList = {fileList}
              extra="支持扩展名：.jpg .png"
              {...rest}
            />
          );
        }
      };
    }
    return col;  // 保持其他columns不变
  });

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={updatedColumns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.UserUpdateRequest) => {
          // 如果有上传新的头像，更新 userAvatar
          if (fileList && fileList.length > 0) {
            values.userAvatar = userAvatar;  // 使用上传后的头像URL
          } else {
            values.userAvatar = oldData.userAvatar;  // 保留旧头像
          }
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
export default UpdateModal;
