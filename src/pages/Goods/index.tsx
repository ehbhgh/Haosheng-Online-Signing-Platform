import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Switch, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getGoods, isRecommend, isOn, detailGoods } from '@/services/goods';
import { getCategory } from '@/services/category';
import Create from './components/Create';
import Edit from './components/Edit';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  price: number;
  stock: number;
  sales: number;
};
const User = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [ModalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [deatilStatus, setGoodsDetailAtatus] = useState(false);
  const [uid, setUid] = useState(undefined);
  const [cateData, setcateData] = useState([]);
  const [goodsDetail, setGoodsDetail] = useState([]);
  const getData = async (params: any) => {
    let res = await getGoods(params);
    return { data: res.data, success: true, total: res.meta.pagination.total };
  };

  //是否上架
  const isOnHangdle = async (uid: any) => {
    const res = await isOn(uid);
    if (res.status === undefined) message.success('操作成功');
  };
  //是否推荐
  const isRecommendHandle = async (uid: any) => {
    const res = await isRecommend(uid);
    if (res.status === undefined) message.success('操作成功');
  };
  //获取分类数据

  //隐藏model
  const handleCancel = async (isShow: any) => {
    const res = await getCategory();
    if (res.status === undefined) {
      setcateData(res);
      setisModalVisible(isShow);
    }
  };

  const editModel = async (isShow: any, uid: any,title:any) => {
    const res = await getCategory();
    if (res.status === undefined) {
      setcateData(res);
      setModalVisibleEdit(isShow);
      setUid(uid);
    }
    if(title==='编辑'){
      const goodsRes = await detailGoods(uid);
      if(goodsRes){
          const {pid,id}=goodsRes.category
          const defaultCategory=pid===0?[id]:[pid,id]
         setGoodsDetail({...goodsRes,category_id:defaultCategory});
        setGoodsDetailAtatus(true)
      }
    

    }

  };
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '商品预览',
      dataIndex: '',
      hideInSearch: true,
      render: (_: any, record: any) => (
        <Image
          width={64}
          src={record.cover_url}
          placeholder={<Image preview={false} src={record.cover_url} width={200} />}
        />
      ),
    },
    { title: '商品名', dataIndex: 'title', copyable: true },
    {
      title: '商品价格',
      dataIndex: 'price',
      hideInSearch: true,
      copyable: false,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      hideInSearch: true,
      copyable: false,
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: '商品销量',
      dataIndex: 'sales',
      hideInSearch: true,
      copyable: false,
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',

      render: (_: any, record: any) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          defaultChecked={record.is_on === 1}
          onChange={() => isOnHangdle(record.id)}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (_: any, record: any) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.is_recommend === 1}
          onChange={() => isRecommendHandle(record.id)}
        />
      ),
      valueType: 'radioButton',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
    },
    { title: '创建时间', dataIndex: 'created_at', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            editModel(true, record.id,'编辑');
          }}
        >
          编辑
        </a>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => getData(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => handleCancel(true)}
          >
            新建
          </Button>,
        ]}
      />
      <Create
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        actionRef={actionRef}
        cateData={cateData}
      />

      {/* 当组件显示时才挂载 */}
      {ModalVisibleEdit&&deatilStatus ? (
        <Edit
          ModalVisibleEdit={ModalVisibleEdit}
          editModel={editModel}
          actionRef={actionRef}
          uid={uid}
          cateData={cateData}
          goodsDetail={goodsDetail}
          setModalVisibleEdit={setModalVisibleEdit}
        />
      ) : (
        ''
      )}
    </PageHeaderWrapper>
  );
};

export default User;
