import { Application } from 'https://deno.land/x/oak/mod.ts'
import { PORT } from './config.ts'
import { HOST } from './config.ts'

import routes from './routes.ts'

const app = new Application

app.use(routes.routes())
app.use(routes.allowedMethods())

console.log(`Server is running. Open http://localhost:${PORT}`)

await app.listen({ port: PORT })