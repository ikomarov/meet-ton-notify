import {config} from 'dotenv'

config()

export const CONTRACT_URL = process.env.CONTRACT_URL
export const NETWORK = process.env.NETWORK
export const REDIS_CONNECT = process.env.REDIS_CONNECT