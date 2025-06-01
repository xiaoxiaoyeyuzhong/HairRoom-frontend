// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listBusinessSituation POST /api/businessSituation/list */
export async function listBusinessSituationUsingPost(
  body: API.BusinessSituationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListBusinessSituationVO>('/api/businessSituation/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listBusinessSituationByPage POST /api/businessSituation/list/page */
export async function listBusinessSituationByPageUsingPost(
  body: API.BusinessSituationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageBusinessSituationVO>('/api/businessSituation/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
