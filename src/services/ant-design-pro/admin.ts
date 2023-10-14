// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getUsers(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getOrders(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/orders', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function reGenerate(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/reGenerate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getInviteInfo(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/getInviteInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
