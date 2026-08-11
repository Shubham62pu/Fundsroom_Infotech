"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedResponse = exports.successResponse = void 0;
const successResponse = (data, message) => ({
    success: true,
    message: message || 'Success',
    data,
});
exports.successResponse = successResponse;
const paginatedResponse = (data, total, page, limit) => ({
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
});
exports.paginatedResponse = paginatedResponse;
//# sourceMappingURL=apiResponse.js.map