import schedule from 'node-schedule'
import {syncConfigs} from '../redis/sync-configs.js'
import {logError, logInfo} from '../../utils/logger.js'

schedule.scheduleJob('0 12 * * *', async () => {
  try {
    logInfo('Запуск обновления Redis конфига')

    await syncConfigs()
  } catch (e) {
    logError('Ошибка обновления Redis конфига', e as Error)
  }
})
