import {Document, Schema, model} from 'mongoose'

import { TokensInterface } from '../interface/IToken'

const tokenSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   refreshToken: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const tokenModel = model<TokensInterface & Document>('Token', tokenSchema)

export default tokenModel
