import {Document, Schema, model} from 'mongoose'

import { UsersInterface } from '../interface/IUser' 

const userSchema = new Schema({
   name: {
      type: String,
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
   },
   completedMeetings: Number,
   image: String,
   profession: {
      type: Schema.Types.ObjectId, 
      ref: 'Profession'
   },
   qualities: [{
      type: Schema.Types.ObjectId, 
      ref: 'Qualitie'
   }],
   rate: Number,
   sex: {
      type: String, 
      enum: ['male' ,'female']
   }
}, {
   timestamps: true
})

const userModel = model<UsersInterface & Document>('User', userSchema)

export default userModel
