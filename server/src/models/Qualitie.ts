import {Document, Schema, model} from 'mongoose'

import { QualitiesInterface } from '../interface/IQualitie'

const qualitieSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   color: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

const qualitieModel = model<QualitiesInterface & Document>('Qualitie', qualitieSchema)

export default qualitieModel
