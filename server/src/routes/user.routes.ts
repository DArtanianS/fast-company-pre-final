import {Router, Request, Response} from 'express'

import User from '../models/User'
import auth from '../middleware/auth.middleware'

const router = Router({mergeParams: true})

router.patch('/:userId', auth, async (req, res) => {
   try {
      const {userId} = req.params

      if(userId) {
         const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true} )
         res.send(updatedUser)
      } else {
         return res.status(401).json({message: 'Unauthorized'})
      }
   } catch (error) {
      res.status(500).json({
         message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const list = await User.find()
   return res.send(list)
   } catch (error) {
      res.status(500).json({
         message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
   }
})

export default router