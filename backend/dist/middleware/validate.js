"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            // Zod v4 uses .issues (renamed from .errors in v3)
            if (error instanceof zod_1.ZodError || error?.name === 'ZodError') {
                const zodError = error;
                return res.status(400).json({
                    error: 'Validation failed',
                    details: zodError.issues ?? zodError.errors ?? [],
                });
            }
            return next(error);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map