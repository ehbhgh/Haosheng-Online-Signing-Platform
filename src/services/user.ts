import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/admin/user');

}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

//获取用户列表
export async function getUsers(params:any): Promise<any> {
  return request('/admin/users',{params});
}

//改变禁用状态
export async function changeStatus(uid:any): Promise<any> {
  return request.patch(`/admin/users/${uid}/lock`);
}

//添加用户列表
export async function addUsers(params:any): Promise<any> {
  return request.post('/admin/users',{params});
}


//修改用户信息
export async function updateUsers(uid:any,params:any): Promise<any> {
  return request.put(`/admin/users/${uid}`,{params});
}

//查看用户详情
export async function detailUsers(uid:any): Promise<any> {
  return request(`/admin/users/${uid}`);
}