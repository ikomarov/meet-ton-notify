import models from '../models/index.js'

export async function createSuperlikeMatch(userId: number, likedId: number) {
  const deleteLikes = models.Likes.deleteMany({
    $or: [
      {user_id: userId, liked_user_id: likedId},
      {user_id: likedId, liked_user_id: userId}
    ]
  })

  const createMatch = models.Match.create({
    user1_id: userId,
    user2_id: likedId,
    created_at: Date.now(),
    type: 'SUPER'
  })

  // Выполнение обоих промисов параллельно
  await Promise.all([deleteLikes, createMatch])
}
