import clientRedis from "./index.js";
import {logError} from "../../utils/logger.js";

export async function saveLengthBig(lengthBig: bigint) {
    const redisKey = 'MeetTon:lengthBig';
    try {
        await clientRedis.set(redisKey, lengthBig.toString());
    } catch (err) {
        logError('Ошибка при сохранении lengthBig в Redis', err as Error)
    }
}
