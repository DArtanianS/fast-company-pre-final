import express, { Router } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import createServer from 'connect'
import chalk from 'chalk'

import Rout from './routes/index'
import initDatabase from './startUp/initDatabase'



class App {
   public express: express.Application
   public route: Router

   public constructor() {
      this.express = express()

      this.route = Router()
      this.middlewares()
      this.database()
      // this.routes()
      
   }

   private middlewares(): void {
      this.express.use(express.json())
      this.express.use(express.urlencoded({extended: false}))
      this.express.use(cors())
      this.express.use('/api', Rout)
   }

   private async database(): Promise<void> {
      try {
         mongoose.connection.once('open', () => {
            initDatabase()
         })
         await mongoose.connect(process.env.MONGO_URI)
         console.log(chalk.bold.yellow('MongoDB Connect...'))
      } catch (error) {
         console.log(chalk.bold.red(error.message))
         process.exit(1)
      }
   }

   // private routes(): void {
   //    this.express.use(Rout)
   // }
}

export default new App().express