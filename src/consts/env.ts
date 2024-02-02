import {config} from 'dotenv'

config()

export const CONTRACT_KEY = process.env.CONTRACT_KEY
export const NETWORK = process.env.NETWORK
export const REDIS_CONNECT = process.env.REDIS_CONNECT
export const PAYMENT_TIMEOUT = process.env.PAYMENT_TIMEOUT