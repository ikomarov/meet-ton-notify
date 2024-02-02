import {configurations} from '../consts/core-config.js'
import models from '../models/index.js'
import {logError, logInfo} from '../utils/logger.js'
import clientRedis from '../services/redis/index.js'

async function initializeConfigurations() {
  for (const config of configurations) {
    const existingConfig = await models.Config.findOne({code: config.code})
    if (!existingConfig) {
      await models.Config.create(config)
      logInfo(`Конфигурация '${config.code}' создана.`)
    }
  }

  logInfo('Проверка и инициализация конфигураций в MongoDB завершена.')
}

async function initializeRedisConfigurations() {
  for (const config of configurations) {
    const configKey = `config:${config.code}`
    const existingConfig = await clientRedis.get(configKey)

    if (!existingConfig) {
      await clientRedis.set(configKey, JSON.stringify(config))
      logInfo(`Конфигурация '${config.code}' создана в Redis.`)
    }
  }

  logInfo('Проверка и инициализация конфигураций в Redis завершена.')
}

initializeRedisConfigurations().catch((e) => logError("",e))
initializeConfigurations().catch((e) => logError("",e))
