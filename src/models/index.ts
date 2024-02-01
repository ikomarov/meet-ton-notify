import dbconnect from '../services/db/connect.js'
import Config from './Config.js'
import Likes from './Likes.js'
import Match from './Match.js'
import Payments from './Payments.js'
import ProfilesSchema from './Profiles.js'

// @ts-ignore
const Schema = dbconnect.mongoose.Schema

export default {
  // @ts-ignore
  Config: dbconnect.mongoose.model('Config', new Schema(Config)),
  // @ts-ignore
  Match: dbconnect.mongoose.model('Match', new Schema(Match)),
  // @ts-ignore
  Likes: dbconnect.mongoose.model('Likes', new Schema(Likes)),
  // @ts-ignore
  Payments: dbconnect.mongoose.model('Payments', new Schema(Payments)),
  Profiles: ProfilesSchema,
}
