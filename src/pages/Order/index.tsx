import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tag, message, Modal } from 'antd';

import {
  CheckCircleOutlined ,
  CloseCircleOutlined  
 
} from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getOrders } from '@/services/order';
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
};
const Order = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [ModalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [id, setId] = useState(undefined);
 
  const getData = async (params: any) => {
    let res = await getOrders(params);
    console.log(res, 'ffff');
    return { data: res.data, success: true, total: res.meta.pagination.total };
  };

  const lockUser = async (uid: any) => {
    // let res = await changeStatus(uid);
    // if (res.status === undefined) {
    //   message.success('操作成功');
    // } else {
    //   message.error('操作失败');
    // }
  };

  //隐藏model
  const handleCancel = (isShow: any) => {
    setisModalVisible(isShow);
  };

  const editModel = (isShow: any, uid: any) => {
    setModalVisibleEdit(isShow);
    setId(uid);
  };


  //获取详情数据
  const detailDatas=(isShow:any,id:any)=>{
    setisModalVisible(isShow)
    setId(id)
  }
  const columns: ProColumns<GithubIssueItem>[] = [
    { title: '单号', dataIndex: 'order_no' },
    { title: '用户', dataIndex: 'user_id', hideInSearch: true },
    { title: '金额', dataIndex: 'amount', hideInSearch: true },

    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_: any, record: any) => {
        return record.status === 1 ? (
          <Tag icon={<CheckCircleOutlined /> } color="success">
            已支付
          </Tag>
        ) : (
          <Tag color="error" icon={<CloseCircleOutlined />}>
            未支付
          </Tag>
        );
      },
    },
    { title: '支付时间', dataIndex: 'pay_time', hideInSearch: true },
    { title: '支付类型', dataIndex: 'pay_type', hideInSearch: true },
    { title: '支付单号', dataIndex: 'trade_no' },

    {
      title: '操作',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_: any, record: any) => [
        <a
          key={1}
          onClick={() => {
            // console.log( record);
            
             detailDatas(true,record.id)
          }}
          style={{marginRight:'30px'}}
        >
          详情
        </a>,

        <a
          key={2}
          onClick={() => {
            editModel(true, record.id);
          }}
        >
          发货
        </a>,
      ],
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
        headerTitle="订单列表"
      
      />
   {
     id?   <Create isModalVisible={isModalVisible} handleCancel={handleCancel} actionRef={actionRef} id={id}/>:''
   }
      {/* 当组件显示时才挂载 */}
      {ModalVisibleEdit ? (
        <Edit
          ModalVisibleEdit={ModalVisibleEdit}
          editModel={editModel}
          actionRef={actionRef}
          uid={uid}
        />
      ) : (
        ''
      )}
    </PageHeaderWrapper>
  );
};

export default Order;
