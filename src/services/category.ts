import request from '@/utils/request';

//获取分类
export async function getCategory(): Promise<any> {
  return request('/admin/category');
}

