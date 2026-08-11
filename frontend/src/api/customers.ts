import apiClient from './client';

export const customersApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/customers', { params }),
  getById: (id: string) =>
    apiClient.get(`/customers/${id}`),
  create: (data: any) =>
    apiClient.post('/customers', data),
  update: (id: string, data: any) =>
    apiClient.put(`/customers/${id}`, data),
  addNote: (id: string, note: string) =>
    apiClient.post(`/customers/${id}/notes`, { note }),
};
