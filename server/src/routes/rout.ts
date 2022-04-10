import { Router, Request, Response } from 'express'

// const routes = Router()

export default Router().get('/', (req: Request, res: Response) => {
   return res.send('Hola a todos!')
})

// export default routes