import producer from "./init.js";
import {KAFKA_TOPIC} from "../../consts/env.js";
import {logError, logInfo} from "../../utils/logger.js";

export async function sendKafkaMessage(message: string, params: object) {
    try {
        await producer.send({
            topic: KAFKA_TOPIC as string,
            messages: [
                {
                    value: message,
                    headers: {
                        'params': JSON.stringify(params)
                    }
                },
            ],
        });

        logInfo(`Отправлена команда ${message}`);
    } catch (e) {
        logError(`Ошибка команды ${message}`, e as Error);
    }
}

