// @ts-nocheck
import mongoose, { Mongoose } from 'mongoose'
import chalk from 'chalk'

const databaseConnection = async (_) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(chalk.greenBright('Mongodb connected', conn.connection.host))
  } catch (error) {
    console.log(chalk.redBright('failed to connect to database', error.message))
  }
}

mongoose.set('strictQuery', false)
export default databaseConnection
