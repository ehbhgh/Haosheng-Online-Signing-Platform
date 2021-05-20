import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Select, message,Skeleton } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getCategory, addCategory, detailCategory } from '@/services/category';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
type GithubIssueItem = {
  title: string;
  dataIndex: string;
  key: string;
  width: string;
  render: () => Element;
};

function TreeData() {
  const [res, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [formObj]: any = ProForm.useForm();
  const [isLoad, setisLoad] = useState(false);
  const [goodsDetail, setgoodsDetail] = useState({});
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setisLoad(true);
    let res = await getCategory();
    if (res !== undefined) {
      res = JSON.parse(JSON.stringify(res).replace(/id/g, 'key'));
      setData(res);
      setisLoad(false);
    } else {
      setisLoad(false);
    }
  };

  //详情数据
  const detailData = async (pid: any) => {
    let res = await detailCategory(pid);
   
    if (res != undefined) {
      setgoodsDetail({
        name: res.name,
      });
      setIsCategory(true);
      res = JSON.parse(JSON.stringify(res).replace(/id/g, 'key'));
      console.log(res, 'tttt');
    } else {
      message.error('获取详情数据失败');
    }
  };
  console.log(goodsDetail, 'ddeewww');

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsCategory(false);
  };
  //修改操作
  const showCate = (pid: any) => {
    //调用详情数据
    detailData(pid);
  };
  //添加操作
  const addSubmit = async (value: any) => {
    let item: any = res.find((item: any) => item.key);
    let ret = await addCategory({ pid: item.pkey, name: value.name });
    if (ret.status === undefined) {
      message.success('添加成功');
      initData();
      setIsModalVisible(false);
    } else {
      message.error('添加失败');
    }
  };

  //修改操作
  const modifySubmit = (value: any) => {
    console.log(value, 'ffff');
  };
  let options: any[] = [];
  res.forEach((item: any) => {
    options.push({
      key: item.key,
      value: item.name,
    });
  });
  let obj = {};
  options = options.reduce((item, next) => {
    obj[next.value] ? '' : (obj[next.value] = true && item.push(next));
    return item;
  }, []);

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'play',
      key: 'play',
      width: '12%',
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            showCate(record.key);
          }}
        >
          编辑
        </a>
      ),
    },
  ];
  // const goodsDetail={
  //   name:'dddd',
  //   pid:'dddd'
  // }
  console.log( goodsDetail,'ffffferrw');
  
  return (
    <>
      <Button type="primary" onClick={showModal}>
        添加分类
      </Button>
      <div style={{ width: '100%', height: '30px' }}></div>
      <Modal title="添加分类" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <ProForm onFinish={(value: any) => addSubmit(value)} form={formObj}>
          <ProForm.Item
            className="item"
            label="父级分类"
            name="pid"
            rules={[{ required: true, message: '请输入父类' }]}
          >
            <Select placeholder="请选择父类" options={options}></Select>
          </ProForm.Item>
          <ProFormText
            name="name"
            label="父类名称"
            placeholder="请输入父类名称"
            rules={[{ required: true, message: '请输入父类名称' }]}
          />
        </ProForm>
      </Modal>

      <Modal title="修改分类" visible={isCategory} onCancel={handleCancel} footer={null}>
      {/* <Skeleton active /> */}
         <ProForm
          onFinish={(value: any) => modifySubmit(value)}
          form={formObj}
          initialValues={{ ...goodsDetail }}
        >
          <ProFormText
            name="name"
            label="父类名称"
            placeholder="请输入父类名称"
            rules={[{ required: true, message: '请输入父类名称' }]}
          />
        </ProForm>
      </Modal>
      <Table columns={columns} dataSource={res} loading={isLoad} />
    </>
  );
}
const Classification = () => {
  return (
    <PageHeaderWrapper>
      <TreeData />
    </PageHeaderWrapper>
  );
};

export default Classification;
