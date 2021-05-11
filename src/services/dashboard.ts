import request from '@/utils/request';

export async function dashHttp(): Promise<any> {
    return request('/admin/index');
  }
  