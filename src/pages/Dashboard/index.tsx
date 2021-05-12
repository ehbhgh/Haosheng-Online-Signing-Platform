import React, { useState,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { dashHttp } from '@/services/dashboard';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
type objType={
 goods_count: number,
order_count: number,
users_count: number
}
const Dashboard = () => {
   const [data,setData]=useState<objType>({})
  useEffect(() => {
    getDataHttp();   
  }, []);
  
  const getDataHttp = async () => {
   const data = await dashHttp()
   setData(data)
    let {users_count,goods_count,order_count}=data
    let myChart1 = echarts.init(document.getElementById('main1'));
    showData(myChart1,users_count,'user')
    let myChart2 = echarts.init(document.getElementById('main2'));
    showData(myChart2,goods_count,'shopping')
    let myChart3= echarts.init(document.getElementById('main3'));
    showData(myChart3,order_count,'order')
  };

  const showData=(myChart:any,num:number,name:string)=>{
    let option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
            hideDelay:1000
        },
        series: [{
            name: 'Pressure',
            type: 'gauge',
            min:0,
            max:5000,
            detail: {
                formatter: '{value}',
                width:200
            },
            data: [{
                value: num,
                name
            }]
        }]
    };
    option && myChart.setOption(option);
  }
  return (
    <PageHeaderWrapper>
      <Row gutter={16}>
        <Col span={8}>
          <Card>  
            <div id="main1" style={{width: '100%',height:400}}></div>
            <Statistic
            title="用户数"
            value={data.users_count}
            precision={0}
             valueStyle={{color:'#3f8600'}}
             prefix={<ArrowUpOutlined/>}
          />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <div id="main2" style={{width: '100%',height:400}}></div>
          <Statistic
            title="商品数"
            value={data.goods_count}
            precision={0}
            valueStyle={{color:'#88D0FF'}}
            prefix={< ArrowDownOutlined/>}
          />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <div id="main3" style={{width: '100%',height:400}}></div>
          <Statistic
            title="订单数"
            value={data.order_count}
            precision={0}
            valueStyle={{color:'#864c00'}}
            prefix={<ArrowUpOutlined/>}
          />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default Dashboard;
