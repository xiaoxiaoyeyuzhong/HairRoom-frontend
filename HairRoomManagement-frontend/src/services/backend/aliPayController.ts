// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** refund POST /api/alipay/refund */
export async function refundUsingPost(body: API.AliPayRefund, options?: { [key: string]: any }) {
  return request<API.BaseResponsestring>('/api/alipay/refund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
