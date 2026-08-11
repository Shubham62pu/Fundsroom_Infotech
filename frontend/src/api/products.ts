import apiClient from './client';

export const productsApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/products', { params }),
  getById: (id: string) =>
    apiClient.get(`/products/${id}`),
  create: (data: any) =>
    apiClient.post('/products', data),
  update: (id: string, data: any) =>
    apiClient.put(`/products/${id}`, data),
};
