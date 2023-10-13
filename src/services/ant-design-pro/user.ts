// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送验证码 POST /api/login/captcha */
export async function getUsers(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
