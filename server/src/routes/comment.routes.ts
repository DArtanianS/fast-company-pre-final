import {Router, Request, Response} from 'express'

import auth from '../middleware/auth.middleware'
import Comment from '../models/Comment'

const router = Router({mergeParams: true})

router
   .route('/')
   .get(auth, async (req: Request, res: Response) => {
      try {
         const {orderBy, equalTo} = req.query
         const list = await Comment.find({[orderBy]: equalTo})
         return res.send(list)
      } catch (error) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже!'
         })
      }
   })
   .post(auth, async (req: Request, res: Response) => {
      try {
         const newComment = await Comment.create({
            ...req.body,
            userId: req.user._id
         })
         return res.status(201).send(newComment)
      } catch (error) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже!'
         })
      }
   })

   router.delete('/:commentId', auth, async (req: Request, res: Response) => {
      try {
         const {commentId} = req.params
         const delededComment = await Comment.findById(commentId)
         // const delededComment = await Comment.find({_id: commentId})

         if(delededComment?.userId.toString() === req.user._id) {
            await delededComment?.remove()

            return res.send(null)
         } else {
            return res.status(401).json({message: 'Unauthorized'})
         }
      } catch (error) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже!'
         })
      }
   })

export default router