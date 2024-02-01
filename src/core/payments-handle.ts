import {CONVERT, FIRST_FIND, PREMIUM_MONTHLY, SUPERLIKE_FOR_USER} from '../consts/products.js'
import models from '../models/index.js'
import {logError} from '../utils/logger.js'
import {updateCachedUserProfile} from '../services/redis/update-cashed-user-profile.js'
import {createSuperlikeMatch} from '../api/create-superlike-match.js'
import {makeMatch} from '../api/make-match.js'

export interface payUpdates {
    user_id: number;
    userFor: number;
}

export const PAYMENT_HANDLE = {
    [PREMIUM_MONTHLY]: async ({user_id} : payUpdates) => {
        const currentDate = new Date()
        const premiumEndDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))

        await updateCachedUserProfile(user_id, {
            has_premium: true,
            premium_created_up_to: premiumEndDate
        })
    },
    [SUPERLIKE_FOR_USER]: async ({user_id, userFor}: payUpdates) => await createSuperlikeMatch(user_id, userFor),
    [FIRST_FIND]: async ({user_id}: payUpdates) => {
        await updateCachedUserProfile(user_id, {
            best_profile: true
        })
    },
    [CONVERT]: async ({user_id}: payUpdates) => {
        try {
            const likes = await models.Likes.find({liked_user_id: user_id}).exec()

            for (const like of likes) {
                const likedId = like.user_id // Или другое соответствующее поле
                await makeMatch({userId: user_id, likedId})
            }
        } catch (error) {
            logError('Ошибка при обработке лайков:', error as Error)
        }
    },
}
