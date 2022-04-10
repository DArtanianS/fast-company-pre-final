import jwt from 'jsonwebtoken'

import Token from '../models/Token'

interface ITokenGenerate {
      accessToken: string
      refreshToken: string
      expiresIn: number
}

class TokenService {

   generate(payload: object): ITokenGenerate {
   
   const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: '1h'
   })
   const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET)
      return {accessToken, refreshToken, expiresIn: 3600}
   }

   async save(userId: string, refreshToken: string) {
      const data = await Token.findOne({user: userId})
      if(data) {
         data.refreshToken = refreshToken
         return data.save()
      }

      const token = await Token.create({user: userId, refreshToken})
      return token
   }

   validateResresh(refreshToken: string) {
      return this.validateToken(refreshToken, process.env.REFRESH_SECRET)
   }

   validateAccess(accesToken: string) {
     return this.validateToken(accesToken, process.env.ACCESS_SECRET)
   }

   private validateToken(tokrn: string, sicretToken: string) {
      try {
         return jwt.verify(tokrn, sicretToken)
      } catch (error) {
         return null
      }
   }

   async findToken(refreshToken: string) {
      try {
         return await Token.findOne({refreshToken})
      } catch (error) {
         return null
      }
   }
}

export default new TokenService()