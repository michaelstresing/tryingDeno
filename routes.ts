import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getTest, getTests, addTest, updateTest, deleteTest } from './controller.ts'

const router = new Router()

router.get('/tests', getTests)
      .get('/tests/:id', getTest)
      .post('/tests', addTest)
      .put('/tests', updateTest)
      .delete('/tests/:id', deleteTest)

export default router