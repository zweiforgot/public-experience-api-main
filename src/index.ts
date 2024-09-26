import "@/setup/env";
import "@/lib/cache";
import "@/setup/endpoints";

import app from "@/lib/app";
import v1 from "@/api/routes/v1";

app.route('/v1', v1);

export default app;