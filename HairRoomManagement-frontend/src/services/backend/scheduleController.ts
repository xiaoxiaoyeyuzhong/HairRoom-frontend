// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** autoSchedule POST /api/schedule/autoSchedule */
export async function autoScheduleUsingPost(
  body: API.AutoScheduleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/schedule/autoSchedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
