import apiClient from './client';

export const stockMovementsApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/stock-movements', { params }),
  create: (data: any) =>
    apiClient.post('/stock-movements', data),
};
