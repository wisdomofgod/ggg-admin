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
  return request<any>('/api/admin/re_generate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getDashboardInfo(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/getDashboardInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getInvites(params: {}, options?: { [key: string]: any }) {
  return request<any>('/api/admin/invites', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
