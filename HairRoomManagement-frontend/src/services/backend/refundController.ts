// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** checkRefund POST /api/refund/check */
export async function checkRefundUsingPost(
  body: API.RefundUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/refund/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listRefundByPage POST /api/refund/list */
export async function listRefundByPageUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRefundByPageUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRefundVO>('/api/refund/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
