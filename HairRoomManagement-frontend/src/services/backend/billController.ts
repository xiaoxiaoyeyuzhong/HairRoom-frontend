// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addBill POST /api/Bill/add */
export async function addBillUsingPost(body: API.BillAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/Bill/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteBill POST /api/Bill/delete */
export async function deleteBillUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/Bill/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getBillById POST /api/Bill/get */
export async function getBillByIdUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBillByIdUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBill>('/api/Bill/get', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listBillByPage POST /api/Bill/list */
export async function listBillByPageUsingPost(
  body: API.BillQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBillVO>('/api/Bill/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateBill POST /api/Bill/update */
export async function updateBillUsingPost(
  body: API.BillUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/Bill/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
