


import React, { Fragment,useState, useEffect } from 'react';
import ProForm, { ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';

import { Modal, message, Cascader, Button,Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AliyunOSSUpload from '@/components/AliyunUploadOSS';
import Editor from '@/components/Editor';
import { updateGoods } from '@/services/goods';
import { values } from 'lodash';
const Edit = (props: any) => {
  const [formObj]: any = ProForm.useForm();
  const { editModel, ModalVisibleEdit, actionRef, uid,cateData,goodsDetail,setModalVisibleEdit } = props;
  const [initialValues,setinitialValues]=useState({})
  const [flag,setFlag]=useState(true)
  
  useEffect(() => {
    setinitialValues({...goodsDetail})
    
  }, []);
  const addSubmit = async (vals: any) => {
    // console.log(vals,uid,'fffffrtyui');
    const res=await updateGoods(uid,{...vals,category_id:vals.category_id[1]})
    if (res.status === undefined) {
      message.success('修改成功');
      actionRef.current.reload()
      setModalVisibleEdit(false);
     
    } else {
      message.error('修改失败');
    }  
    
   
  };
  //设置上传的name
  const setCoverKey = (fileKey: any) => {
    formObj.setFieldsValue({
      'cover': fileKey,
    });
  };

//设置富文本的name
const setEditorKey = (content: any) => {
  formObj.setFieldsValue({
    'details': content,
  });
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
        <ProForm onFinish={(value: any) => addSubmit(value)} form={formObj} initialValues={{...goodsDetail}}>
          <ProForm.Item
            className="item"
            label="分类"
            name="category_id"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Cascader
              fieldNames={{ label: 'name', value: 'id' }}
              options={cateData}
              placeholder="请选择分类"
              // defaultValue={}
            />
          </ProForm.Item>

          <ProFormText
            name="title"
            label="商品名称"
            placeholder="请输入商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          />
          <ProFormTextArea
            name="description"
            label="商品描述"
            placeholder="请输入商品描述"
            rules={[{ required: true, message: '请输入商品描述' }]}
          />
          <ProFormDigit
            name="price"
            label="商品价格"
            min={0}
            placeholder="请输入商品价格"
            rules={[{ required: true, message: '请输入商品价格' }]}
          />
          <ProFormDigit
            name="stock"
            label="商品库存"
            placeholder="请输入商品库存"
            min={0}
            rules={[{ required: true, message: '请输入商品库存' }]}
          />
           <ProFormText
            name="cover"
            hidden={true}
            
          />
          <ProForm.Item
            label="商品主图"
            name="cover"
            rules={[{ required: true, message: '请上传商品主图' }]}
          >
            {/* 解决受控 */}
            <div>
              <AliyunOSSUpload accept="image/*" setCoverKey={setCoverKey} showUploadList={true} setFlag={setFlag}>
              <Button icon={<UploadOutlined />}>点击上传商品主图</Button>
              </AliyunOSSUpload>
              {!goodsDetail.cover_url&&!flag?'':
              <Image src={goodsDetail.cover_url} width={200}/>
              }
            </div>
          </ProForm.Item>

          <ProForm.Item
            label="商品详情"
            name="details"
            rules={[{ required: true, message: '请输入商品详情' }]}
          >
            <Editor setEditorKey={setEditorKey} content={goodsDetail.details}/>
          </ProForm.Item>
        </ProForm>
      </Modal>
    </Fragment>
  );
};

export default Edit;