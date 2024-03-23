import {CONVERT, FIRST_FIND, PREMIUM_MONTHLY, SUPERLIKE_FOR_USER} from '../consts/products.js'
import {sendKafkaMessage} from "../services/kafka/send-kafka-message.js";
import {CONVERT_LIKES_TO_MATCHES, MAKE_FIRST, MAKE_MONTHLY_PREMIUM, MAKE_SUPERLIKE} from "../consts/messages.js"

export const PAYMENT_HANDLE = {
    [PREMIUM_MONTHLY]: async (params: object) => await sendKafkaMessage(MAKE_MONTHLY_PREMIUM, params),
    [SUPERLIKE_FOR_USER]: async (params: object) => await sendKafkaMessage(MAKE_SUPERLIKE, params),
    [FIRST_FIND]: async (params: object) => await sendKafkaMessage(MAKE_FIRST, params),
    [CONVERT]: async (params: object) => await sendKafkaMessage(CONVERT_LIKES_TO_MATCHES, params),
}
