import React,{Fragment} from 'react'
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {  Modal, message } from 'antd';
import { addUsers } from '@/services/user';
 const Create = (props:any) => {

const {handleCancel,isModalVisible, actionRef}=props
    const addSubmit = async(vals:any) => {
        const res=await addUsers(vals)
        if (res.status === undefined) {
          message.success('添加成功');
          actionRef.current.reload()
          handleCancel(false);
         
        } else {
          message.error('添加失败');
        }  
            
      };
    return (
        <Fragment>
        <Modal title="添加用户" visible={isModalVisible} onCancel={()=>handleCancel(false)} footer={null} destroyOnClose={true}>
        <ProForm onFinish={(value:any) => addSubmit(value)}>
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
            rules={[{ required: true, message: '请输入昵称' },{ type:'email', message: '邮箱格式不正确' }]}
          />
           <ProFormText.Password
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[{ required: true, message: '请输入密码' },{ min:8, message: '密码最少8位' }]}
          />
        </ProForm>
      </Modal>
        </Fragment>
    )
}

export default Create