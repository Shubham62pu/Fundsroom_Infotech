

export interface DashboardMetrics {
  totalCustomers: number;
  totalProducts: number;
  lowStockAlerts: number;
  draftChallans: number;
  confirmedChallans: number;
}

// In a real app, we would fetch this from the backend.
// For now, returning mock data until backend endpoint is available.
export const dashboardApi = {
  getMetrics: async (): Promise<{ data: { data: DashboardMetrics } }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      data: {
        data: {
          totalCustomers: 128,
          totalProducts: 452,
          lowStockAlerts: 14,
          draftChallans: 8,
          confirmedChallans: 42
        }
      }
    };
  }
};
