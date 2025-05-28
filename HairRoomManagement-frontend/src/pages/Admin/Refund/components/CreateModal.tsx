import {addUserUsingPost, avatarUploadUsingPost} from '@/services/backend/userController';
import {ProColumns, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
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
  const handleUpload :(userAvatar: RcFile) => Promise<string> = async (userAvatar: RcFile) => {
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
        return response;
        // return response.data; // 返回data，会请求图片，但是云存储不允许post请求图片，导致错误

        // 创建符合API.getAvatarUsingGETParams类型的变量，变量代表的对象包含一个avatarUrl，值是response.data
        // const avatarGetParams : API.getAvatarUsingGETParams = {avatarUrl : response.data};
        // const avatarGet = await getAvatarUsingGet(avatarGetParams);
        // return avatarGet.data || '';  // 返回文件 URL,如果为空，返回空串

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
      // 如果已经有头像字段，移除或不渲染它
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
                fileList,
                maxCount: 1,// 限制上传的文件只有一个
                onChange: handleChange,
              }}
              extra="支持扩展名：.jpg .png"
              {...rest}
            />
          );
        }
      };
    }
    return col; // 保持其他columns不变
  });

  return (
    <Modal
      destroyOnClose
      title={'新建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={
          updatedColumns
        }
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
