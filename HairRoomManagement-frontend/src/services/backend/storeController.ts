// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStore GET /api/store/add */
export async function addStoreUsingGet(options?: { [key: string]: any }) {
  return request<number>('/api/store/add', {
    method: 'GET',
    ...(options || {}),
  });
}

/** addStore PUT /api/store/add */
export async function addStoreUsingPut(options?: { [key: string]: any }) {
  return request<number>('/api/store/add', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** addStore POST /api/store/add */
export async function addStoreUsingPost(options?: { [key: string]: any }) {
  return request<number>('/api/store/add', {
    method: 'POST',
    ...(options || {}),
  });
}

/** addStore DELETE /api/store/add */
export async function addStoreUsingDelete(options?: { [key: string]: any }) {
  return request<number>('/api/store/add', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** addStore PATCH /api/store/add */
export async function addStoreUsingPatch(options?: { [key: string]: any }) {
  return request<number>('/api/store/add', {
    method: 'PATCH',
    ...(options || {}),
  });
}
