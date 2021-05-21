import request from '@/utils/request';

//获取分类
export async function getCategory(): Promise<any> {
  return request('/admin/category');
}
//添加分类
export async function addCategory(params:any): Promise<any> {
  
  return request.post('/admin/category',{params});
}
//获取分类详情
export async function detailCategory(pid:any): Promise<any> {
  return request(`/admin/category/${pid}`);
}


//修改分类信息
export async function updateCategory(uid:any,params:any): Promise<any> {
  return request.put(`/admin/category/${uid}`,{params});
}