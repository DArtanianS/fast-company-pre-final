import {Router, Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import {check, validationResult} from 'express-validator'

import User from '../models/User'
import generateUserData from '../utils/halpers'
import tokenService from '../services/teken.serves'

const router = Router({mergeParams: true})

router.post('/signUp', [
   check('email', 'Некорректный email').isEmail(),
   check('password', 'Минимальная длинна пароля 8 символов').isLength({min: 8}),
   async (req: Request, res: Response) => {
      try {
         const errors = validationResult(req)
         if(!errors.isEmpty()) {
            return res.status(400).json({
               error: {
                  message: 'INVALID_DATA',
                  code: 400,
                  errors: errors.array()
               }
            })
         }

         const {email, password} = req.body

         const existingUser = await User.findOne({email})

         if(existingUser) {
            return res.status(400).json({
               error: {
                  message: 'EMAIL_EXISTS',
                  code: 400
               }
            })
         }

         const hashedPassword = await bcrypt.hash(password, 12)

         const newUser = await User.create({
            ...generateUserData(),
            ...req.body,
            password: hashedPassword
         })

         const tokens = tokenService.generate({
            _id: await newUser._id
         })

         await tokenService.save(newUser._id, tokens.refreshToken)

         res.status(201).send({...tokens, userId: newUser._id})
      } catch (error) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже!'
         })
      }
}])
router.post('/signInWithPassword', 
   check('email', 'Некорректный email').normalizeEmail().isEmail(),
   check('password', 'Пароль не может быть пустым').exists(),
   [async (req: Request, res: Response) => {
      try {
         const errors = validationResult(req)
         if(!errors.isEmpty()) {
            return res.status(400).json({
               error: {
                  message: 'INVALID_DATA',
                  code: 400,
                  errors: errors.array()
               }
            })
         }

         const {email, password} = req.body

         const existingUser = await User.findOne({email})

         if(!existingUser) {
            return res.status(400).send({
               error: {
                  message: 'EMAIL_NOT_FOUND',
                  code: 400
               }
            })
         }

         const isPasswodEqual = bcrypt.compare(password, existingUser.password)
         if(!isPasswodEqual) {
            return res.status(400).send({
               error: {
                  message: 'INVALID_PASSWORD',
                  code: 400
               }
            })
         }

         const tokens = tokenService.generate({_id: existingUser._id})
         await tokenService.save(existingUser._id, tokens.refreshToken)

         return res.send({...tokens, userId: existingUser._id})

      } catch (error) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже!'
         })
      }
}])

function isTokenInvalid(data: any, dbToken: any): boolean {
   return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req: Request, res: Response) => {
   try {
      const {refresh_token: refreshToken} = req.body
      const data = tokenService.validateResresh(refreshToken)
      const dbToken = await tokenService.findToken(refreshToken)

      if(isTokenInvalid(data, dbToken)) {
         return res.status(401).json({message: 'Unauthorized'})
      }

      const tokens = await tokenService.generate({
         _id: data?._id
      })

      await tokenService.save(data._id, tokens.refreshToken)

      return res.send({...tokens, userId: data._id})
   } catch (error) {
      res.status(500).json({
         message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
   }
})

export default router