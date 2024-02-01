import {createClient} from 'redis'
import {REDIS_CONNECT} from '../../consts/env.js'
import {logError, logWarn} from '../../utils/logger.js'

const clientRedis = createClient({url: REDIS_CONNECT})

clientRedis.on('error', err => {
  logError('Ошибка подключения к Redis:', err)
})

clientRedis.on('ready', () => {
  logWarn('Redis готов к использованию')
})

clientRedis.on('end', () => {
  logWarn('Подключение к Redis закрыто')
})

// Подключаемся к Redis
clientRedis.connect().catch(err => {
  logError('Ошибка подключения к Redis:', err)
})

export default clientRedis
