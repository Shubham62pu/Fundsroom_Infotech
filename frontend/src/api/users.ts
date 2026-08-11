import apiClient from './client';

export const usersApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/users', { params }),
  create: (data: any) =>
    apiClient.post('/users', data),
  update: (id: string, data: any) =>
    apiClient.put(`/users/${id}`, data),
  updateStatus: (id: string, isActive: boolean) =>
    apiClient.patch(`/users/${id}/status`, { isActive }),
};
