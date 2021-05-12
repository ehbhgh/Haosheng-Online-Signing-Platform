import React, { Fragment, useEffect,useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message,Skeleton } from 'antd';
import { updateUsers, detailUsers } from '@/services/user';
const Edit = (props: any) => {
  const [initialValues,setinitialValues]=useState({})
  const { editModel, ModalVisibleEdit, actionRef, uid } = props;
  console.log(uid);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    //发送请求获取用户详情
    if (uid !== undefined) {
      const res = await detailUsers(uid);
      
      setinitialValues({
       name:res.name,
       email:res.email
      })
      
    }
  };
  const edmitSubmit = async ( vals: any) => {
    const res = await updateUsers(uid, vals);
    if (res.status === undefined) {
      message.success('修改成功');
      actionRef.current.reload()
      editModel(false);
    } else {
      message.error('修改失败');
    }
  };
  return (
    <Fragment>
      <Modal
        title="修改用户"
        visible={ModalVisibleEdit}
        onCancel={() => editModel(false)}
        footer={null}
        destroyOnClose={true}
      >
        {JSON.stringify(initialValues) === "{}"?<Skeleton active paragraph={{rows:4}}/>:
        <ProForm onFinish={(value: any) => edmitSubmit(value)} initialValues={initialValues}>
          <ProFormText
            name="name"
            label="昵称"
            placeholder="请输入名称"
            rules={[{ required: true, message: '请输入昵称' }]}
          />

          <ProFormText
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[
              { required: true, message: '请输入昵称' },
              { type: 'email', message: '邮箱格式不正确' },
            ]}
          />
        </ProForm>}
      </Modal>
    </Fragment>
  );
};

export default Edit;
