import request from '@/utils/request';


export async function ossConfig(): Promise<any> {
    return request('/auth/oss/token');
  }
  