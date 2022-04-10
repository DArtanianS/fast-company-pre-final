import { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'

import tokenService from '../services/teken.serves'

interface newReq extends Request {
   user?: string | JwtPayload | null
}

export default function (req: newReq, res: Response, next: NextFunction) {
   if(req.method === 'OPTIONS'){
      return next()
   }

   try {
      // Bearer token
      const token = req.headers.authorization?.split(' ')[1]
      if(!token) {
         return res.status(401).json({message: 'Unauthorized'})
      }

      const data = tokenService.validateAccess(token)

      console.log('Decoded', data)

      req.user = data

      next()
   } catch (error) {
      
   }
}