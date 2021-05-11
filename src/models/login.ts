
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin ,outAccountLogin} from '@/services/login';
;
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
   
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
    
    if(response.status===undefined){
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      history.replace( '/');
      message.success('🎉 🎉 🎉  登录成功！');
    }
     else{
      message.error('登录失败');
     }
     
    },

    *logout(_,{call}) {
      //loading
     const load=message.loading('退出中...')
      //请求Api,退出登录
      const response=yield call(outAccountLogin)
      //判断是否请求成功
      if(response.status===undefined){
        // 删除本地的token和useInfo
        localStorage.removeItem('access_token')
        localStorage.removeItem('userInfo')
        //重定向到登录
        history.replace( '/login');
        message.success('✨ ✨ ✨  退出成功！');
      }

      load()
    },

   
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.access_token);
      localStorage.setItem('access_token',payload.access_token)
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
