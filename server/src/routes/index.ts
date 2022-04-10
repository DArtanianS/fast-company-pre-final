import express from 'express'
import authRouter from './auth.routes'
import commentRouter from './comment.routes'
import professionRouter from './profession.routes'
import qualityRouter from './quality.routes'
import userRouter from './user.routes'

const router = express.Router({mergeParams: true})

router.use('/auth', authRouter)
router.use('/comment', commentRouter)
router.use('/profession', professionRouter)
router.use('/quality', qualityRouter)
router.use('/user', userRouter)

export default router