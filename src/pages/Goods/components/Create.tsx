import React, { Fragment } from 'react';
import ProForm, { ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';

import { Modal, message, Cascader, Button } from 'antd';
import AliyunOSSUpload from '@/components/AliyunUploadOSS';
import Editor from '@/components/Editor';
const Create = (props: any) => {
  const { handleCancel, isModalVisible, actionRef, cateData } = props;
  const [formObj]: any = ProForm.useForm();

  const addSubmit = async (vals: any) => {
    console.log(vals)
    // const res = await addUsers(vals);
    // if (res.status === undefined) {
    //   message.success('添加成功');
    //   actionRef.current.reload();
    //   handleCancel(false);
    // } else {
    //   message.error('添加失败');
    // }
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
        title="添加商品"
        visible={isModalVisible}
        onCancel={() => handleCancel(false)}
        footer={null}
        destroyOnClose={true}
      >
        <ProForm onFinish={(value: any) => addSubmit(value)} form={formObj}>
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
            name="sales"
            label="商品库存"
            placeholder="请输入商品库存"
            min={0}
            rules={[{ required: true, message: '请输入商品库存' }]}
          />
          <ProForm.Item
            label="商品主图"
            name="cover"
            rules={[{ required: true, message: '请上传商品主图' }]}
          >
            {/* 解决受控 */}
            <div>
              <AliyunOSSUpload accept="image/*" setCoverKey={setCoverKey} />
            </div>
          </ProForm.Item>

          <ProForm.Item
            label="商品详情"
            name="details"
            rules={[{ required: true, message: '请输入商品详情' }]}
          >
            <Editor setEditorKey={setEditorKey} />
          </ProForm.Item>
        </ProForm>
      </Modal>
    </Fragment>
  );
};

export default Create;
