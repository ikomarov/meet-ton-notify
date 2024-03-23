import {config} from 'dotenv'

config()

export const CONTRACT_KEY = process.env.CONTRACT_KEY
export const NETWORK = process.env.NETWORK
export const REDIS_CONNECT = process.env.REDIS_CONNECT
export const PAYMENT_TIMEOUT = process.env.PAYMENT_TIMEOUT
export const KAFKA_GROUP = process.env.KAFKA_GROUP
export const KAFKA_TOPIC = process.env.KAFKA_TOPIC
export const KAFKA_BROKER = process.env.KAFKA_BROKER