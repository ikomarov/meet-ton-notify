import {configurations} from '../../consts/core-config.js'
import models from '../../models/index.js'
import clientRedis from './index.js'

export async function syncConfigs() {
  for (const config of configurations) {
    const configKey = `config:${config.code}`
    const configDb = await models.Config.findOne({code: config.code})

    if (configDb) {
      await clientRedis.set(configKey, JSON.stringify(configDb))
    }
  }
}
