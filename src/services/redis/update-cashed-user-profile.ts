import {logError} from '../../utils/logger.js'
import {selectProfile} from './get-cashed-user-profile.js'
import clientRedis from './index.js'
import models from '../../models/index.js'

export async function updateCachedUserProfile(userId: number, updates: any) {
  const redisKey = `user:${userId}:profile`

  try {
    // Получаем обновленный профиль из MongoDB
    const updatedProfile = await models.Profiles.findOneAndUpdate(
      {user_id: userId},
      updates,
      {new: true} // Возвращает обновленный документ
    ).select(selectProfile)

    if (updatedProfile) {
      // Сериализуем обновленный профиль в строку JSON
      const serializedProfile = JSON.stringify(updatedProfile)

      // Обновляем профиль в Redis с TTL 1 час (3600 секунд)
      // @ts-ignore
      await clientRedis.set(redisKey, serializedProfile, {'EX': 3600})
    }
  } catch (err) {
    logError('Ошибка в updateCachedUserProfile', err as Error)
  }
}
