import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar,Switch,message} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {getUsers,changeStatus}from "@/services/user"
const User = () => {
  const actionRef = useRef<ActionType>();
 
  const getData=async(params:any)=>{
    let res=await getUsers(params)
    return {data:res.data,success:true,total:res.meta.pagination.total}
  }


  const lockUser=async (uid:any)=>{
    let res=await changeStatus(uid)
    if(res.status===undefined){
      message.success('操作成功')
    }
    else{
      message.error('操作失败')
    }
  }


  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_: any, record: any) => (
        <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
      ),
    },
    { title: '姓名', 
    dataIndex: 'name'
    },
     { title: '邮箱', 
     dataIndex: 'email',
   
     },
     {
        title: '是否禁用',
        dataIndex: 'is_locked',
        hideInSearch: true,
        render: (_: any, record: any) => (
            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={record.is_locked===0} onChange={()=>lockUser(record.id)} />
        )
      },
      { title: '创建时间', 
      dataIndex: 'created_at',
      hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: 'is_locked',
        hideInSearch: true,
        render: (_: any, record: any) =><a href="" onChange={()=>{}}>编辑</a>
      },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) =>  getData(params)}
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
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};

export default User;
