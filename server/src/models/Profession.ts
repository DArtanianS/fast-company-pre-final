import {Document, Schema, model} from 'mongoose'

import { ProfessionsInterface } from '../interface/IProfession'

const professionSchema = new Schema({
   name: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const professionModel = model<ProfessionsInterface & Document>('Profession', professionSchema)

export default professionModel

