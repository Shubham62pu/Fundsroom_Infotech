export declare const successResponse: (data: any, message?: string) => {
    success: boolean;
    message: string;
    data: any;
};
export declare const paginatedResponse: (data: any[], total: number, page: number, limit: number) => {
    success: boolean;
    data: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
//# sourceMappingURL=apiResponse.d.ts.map