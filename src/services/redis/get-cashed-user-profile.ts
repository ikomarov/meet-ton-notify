import {logError} from '../../utils/logger.js'
import clientRedis from './index.js'
import models from '../../models/index.js'

export const selectProfile = 'has_premium user_id photo age username bio goal phone_number superlike_count name country_code is_invisible is_active premium_created_up_to hide_age location find_gender gender profilePhotos moderate best_profile'

export async function getCachedUserProfile(userId: number) {
  const redisKey = `user:${userId}:profile`

  try {
    // Пытаемся получить профиль из Redis
    const cachedProfile = await clientRedis.get(redisKey)

    if (cachedProfile) {
      // Если профиль найден в Redis, возвращаем его
      return JSON.parse(cachedProfile)
    } else {
      // Если профиль отсутствует в Redis, загружаем из MongoDB
      const userProfile = await models.Profiles.findOne({user_id: userId}).select(selectProfile)

      if (userProfile) {
        // Сохраняем профиль в Redis с TTL 1 час (3600 секунд)
        // @ts-ignore
        await clientRedis.set(redisKey, JSON.stringify(userProfile), {'EX': 3600})

        return userProfile
      }
    }
  } catch (err) {
    logError('Ошибка в getCachedUserProfile', err as Error)
    return null // Возвращаем null в случае ошибки
  }
}
