import 'dotenv/config'
import chalk from 'chalk'

import app from './app'

// console.log(chalk.bold.red())

const PORT = process.env.PORT || 5000



app.listen(PORT, () => {

   console.log(chalk.bold.green`Server started on port: ${PORT}`)
})