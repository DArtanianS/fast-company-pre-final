import {Router, Request, Response} from 'express'
import Qualitie from '../models/Qualitie'

const router = Router({mergeParams: true})

router.get('/',async (req: Request, res: Response) => {
   try {
      const list = await Qualitie.find()
      res.json(list)
   } catch (error) {
      res.status(500).json({
         message: 'На сервере произошда ошибка. Попробуйте позже'
      })
   }
})

export default router