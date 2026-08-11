export const successResponse = (data: any, message?: string) => ({
  success: true,
  message: message || 'Success',
  data,
});

export const paginatedResponse = (
  data: any[],
  total: number,
  page: number,
  limit: number
) => ({
  success: true,
  data,
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
});
