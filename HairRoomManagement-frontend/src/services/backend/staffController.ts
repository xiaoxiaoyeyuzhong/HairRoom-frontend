// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStaff POST /api/staff/add */
export async function addStaffUsingPost(
  body: API.StaffAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/staff/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteStaff POST /api/staff/delete */
export async function deleteStaffUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/staff/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getStaffById POST /api/staff/get */
export async function getStaffByIdUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStaffByIdUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStaff>('/api/staff/get', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listStaffByPage POST /api/staff/list */
export async function listStaffByPageUsingPost(
  body: API.StaffQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStaffVO>('/api/staff/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateStaff POST /api/staff/update */
export async function updateStaffUsingPost(
  body: API.StaffUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/staff/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
