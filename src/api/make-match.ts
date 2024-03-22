import models from '../models/index.js'

export async function makeMatch({userId, likedId}: {userId: number, likedId: number}) {
  await Promise.all([
    models.Match.create({user1_id: userId, user2_id: likedId}),
    models.Likes.deleteMany({
      $or: [
        {user_id: userId, liked_user_id: likedId},
        {user_id: likedId, liked_user_id: userId}
      ]
    })
  ])
}