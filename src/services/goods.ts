import request from '@/utils/request';

//获取商品列表
export async function getGoods(params:any): Promise<any> {
  return request('/admin/goods',{params});
}

//商品上架下架
export async function isOn(goods_id:any): Promise<any> {
  return request.patch(`/admin/goods/${goods_id}/on`);
}

//推荐和不推荐商品
export async function isRecommend(goods_id:any): Promise<any> {
  return request.patch(`/admin/goods/${goods_id}/recommend`);
}
// //添加用户列表
// export async function addUsers(params:any): Promise<any> {
//   return request.post('/admin/users',{params});
// }


// //修改用户信息
// export async function updateUsers(uid:any,params:any): Promise<any> {
//   return request.put(`/admin/users/${uid}`,{params});
// }

// //查看用户详情
// export async function detailUsers(uid:any): Promise<any> {
//   return request(`/admin/users/${uid}`);
// }