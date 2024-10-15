import { z } from '@hono/zod-openapi';

const ErrorMessage = z.object({
    error: z.string(),
    message: z.string()
});

export default ErrorMessage;