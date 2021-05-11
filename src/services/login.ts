import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}


export async function outAccountLogin() {
  return request.post('/auth/logout');
}
