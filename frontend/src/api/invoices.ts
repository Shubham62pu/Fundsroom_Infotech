import apiClient from './client';

export const invoicesApi = {
  list: (params?: Record<string, any>) =>
    apiClient.get('/invoices', { params }),
  getById: (id: string) =>
    apiClient.get(`/invoices/${id}`),
  create: (challanId: string) =>
    apiClient.post('/invoices', { challanId }),
  downloadPDF: (id: string) =>
    apiClient.get(`/invoices/${id}/pdf`, { responseType: 'blob' }),
};
