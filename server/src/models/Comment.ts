import {Document, Schema, model} from 'mongoose'

import { CommentsInterface } from './../interface/IComment'

const commentSchema = new Schema({
   content: {
      type: String,
      required: true
   },
   // На чьей странице находится комментарий
   pageId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   // Кто оставил комментарий
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
}, {
   timestamps: {createdAt: 'created_at'}
})

const commentModel = model<CommentsInterface & Document>('Comment', commentSchema)

export default commentModel