import apiClient from './client';

export const challansApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/challans', { params }),
  getById: (id: string) =>
    apiClient.get(`/challans/${id}`),
  create: (data: any) =>
    apiClient.post('/challans', data),
  update: (id: string, data: any) =>
    apiClient.put(`/challans/${id}`, data),
  confirm: (id: string) =>
    apiClient.patch(`/challans/${id}/confirm`),
  cancel: (id: string) =>
    apiClient.patch(`/challans/${id}/cancel`),
};
