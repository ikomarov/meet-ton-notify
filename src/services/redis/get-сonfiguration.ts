import {logError} from '../../utils/logger.js'
import clientRedis from './index.js'

/**
 * Получает конфигурацию из Redis по коду.
 *
 * @param {string} code Код конфигурации для извлечения.
 * @returns {Promise<Object|null>} Объект конфигурации или null, если не найдено.
 */
export async function getConfiguration(code: string) {
  try {
    const configKey = `config:${code}`
    const configData = await clientRedis.get(configKey)

    if (configData) {
      return JSON.parse(configData).value // Десериализация данных из строки JSON
    } else {
      return null // Возвращает null, если конфигурация не найдена
    }
  } catch (error) {
    logError('Ошибка при получении конфигурации из Redis:', error as Error)
    throw error // Переброс ошибки для дальнейшей обработки
  }
}