import request from '@/utils/request';
//获取订单列表
export async function getOrders(params:any): Promise<any> {
    return request('/admin/orders',{params});
  }
  
  //获取订单详情
  export async function getOrdersDetail(uid:any): Promise<any> {
    return request('/admin/orders/'+uid);
  }
  