import {logError} from "../../utils/logger.js";
import {Kafka, Partitioners} from 'kafkajs';
import {KAFKA_BROKER, KAFKA_GROUP} from "../../consts/env.js";

// Создаем экземпляр Kafka с конфигурацией
const kafka = new Kafka({
    clientId: KAFKA_GROUP as string,
    brokers: [KAFKA_BROKER as string]
});

const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

(async () => {
    try {
        await producer.connect();
    } catch (error) {
        logError('Ошибка при отправке сообщения:', error as Error);
    }
})()

export default producer
