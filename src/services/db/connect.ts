import {config} from 'dotenv'

config()

import mongoose from 'mongoose'
import {logError} from '../../utils/logger.js'

(async () => {
  const mongoDB = process.env.MONGODB

  try {
    await mongoose.connect(mongoDB as string)
  } catch (err) {
    logError('MongoDB', err as Error)
  }

  mongoose.Promise = global.Promise

  const db = mongoose.connection

  db.on('error', (error) => logError('MongoDB', error))
})()

export default mongoose
