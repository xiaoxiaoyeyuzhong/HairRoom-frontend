import {addUserUsingPost, avatarUploadUsingPost} from '@/services/backend/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React, {useState} from 'react';
import {ProFormUploadButton} from "@ant-design/pro-form";
import {RcFile} from "antd/es/upload";

interface Props {
  visible: boolean;
  columns: ProColumns<API.UserVO>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addUserUsingPost(fields);
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

  const [fileList, setFileList] = useState<any[]>([]);  // 用于管理上传的文件列表

  const [UserAvatar,setUserAvatar] = useState<any>([]);

  const handleChange = (info: any)=>{
    setFileList(info.fileList);

  }

  // 自定义上传方法
  const handleUpload = async (userAvatar: RcFile) => {
    // const formData = new FormData();
    // formData.append('userAvatar', userAvatar);
    const body = {};
    try {
      // 调用上传接口
      const response = await avatarUploadUsingPost(body,userAvatar);

      // 提取文件 URL (假设返回的数据结构是 response.data)
      if (response && response.data) {
        console.log("上传后，返回值为"+response.data);
        setUserAvatar(response.data);

        return response.data;  // 返回文件 URL
      }
      throw new Error('上传失败，未收到文件 URL');
    } catch (error) {
      console.error('头像上传失败', error);
      throw error;  // 上传失败时抛出错误
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'新建用户'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={[
          ...columns,
          {
            title: '头像',
            dataIndex: 'userAvatar',
            hideInSearch: true,
            renderFormItem: (_, {...rest }) => {
              return (
                <ProFormUploadButton
                  label="上传头像"
                  name="userAvatar"
                  action={handleUpload}
                  fieldProps={{
                    listType: 'picture-card',
                    showUploadList: true,
                    accept: '.jpg,.png',
                    fileList,
                    onChange: handleChange,
                  }}
                  extra="支持扩展名：.jpg .png"
                  {...rest}
                />
              );
            },
          },
        ]}
        onSubmit={async (values: API.UserAddRequest) => {

          if(fileList && fileList.length > 0) {
            console.log("fileList[0]的值是", fileList[0]);
            // values.userAvatar = fileList[0];
            values.userAvatar = UserAvatar;
            console.log("values.userAvatar是" + values.userAvatar);
          }
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
