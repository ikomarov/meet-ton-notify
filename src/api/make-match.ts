import models from '../models/index.js'

export async function makeMatch({userId, likedId}: {userId: number, likedId: number}) {
  const existingLikes = await models.Likes.find({
    $or: [
      {user_id: userId, liked_user_id: likedId},
      {user_id: likedId, liked_user_id: userId}
    ]
  })

  // @ts-ignore
  const isMutualLike = existingLikes.some(like => like.user_id === likedId && like.liked_user_id === userId)
  // @ts-ignore
  const hasLikeAlready = existingLikes.some(like => like.user_id === userId && like.liked_user_id === likedId)

  const bulkOps = []

  if (isMutualLike) {
    bulkOps.push({
      deleteMany: {
        filter: {
          $or: [
            {user_id: userId, liked_user_id: likedId},
            {user_id: likedId, liked_user_id: userId}
          ]
        }
      }
    })
  } else if (!hasLikeAlready) {
    bulkOps.push({
      insertOne: {
        document: {
          user_id: userId,
          liked_user_id: likedId
        }
      }
    })
  }

  await Promise.all([
    isMutualLike && models.Match.create({user1_id: userId, user2_id: likedId}),
    bulkOps.length && models.Likes.bulkWrite(bulkOps)
  ])

  return {isMutualLike}
}