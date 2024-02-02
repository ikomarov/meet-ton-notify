import clientRedis from "./index.js";
import {logError} from "../../utils/logger.js";

export async function getLengthBig() {
    const redisKey = 'MeetTon:lengthBig';
    try {
        const lengthBig = await clientRedis.get(redisKey);
        return lengthBig ? BigInt(lengthBig) : null;
    } catch (err) {
        logError('Ошибка при получении lengthBig из Redis', err as Error)
        return null;
    }
}
