import {Document, Model} from 'mongoose'
import Profession from '../models/Profession'
import Qualitie from '../models/Qualitie'
import professionsMock from '../mock/professions.json'
import qualitiesMock from '../mock/qualities.json'
import { ProfessionsInterface } from '../interface/IProfession'
import { QualitiesInterface } from '../interface/IQualitie'

interface IId {
   _id?: string
}
interface Prof extends ProfessionsInterface, IId {}
interface Qual extends QualitiesInterface, IId {}

export default async function initDatabase() {
   const professions = await Profession.find()
   if(professions.length !== professionsMock.length) {
      await createInitialEntity(Profession, professionsMock)
   }

   const qualities = await Qualitie.find()
   if(qualities.length !== qualitiesMock.length) {
      await createInitialEntity(Qualitie, qualitiesMock)
   }
}

async function createInitialEntity(Model: (Model<ProfessionsInterface & Document> | Model<QualitiesInterface & Document>), data: (Prof[] | Qual[])) {
   await Model.collection.drop()
   return Promise.all(
      data.map(async item => {
         try {
            delete item._id

            const newItem = new Model(item)
            await newItem.save()
            return newItem
         } catch (error) {
            return error
         }
      })
   )
}