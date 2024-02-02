import models from '../models/index.js'
import {logError} from '../utils/logger.js'
import {PAYMENT_HANDLE} from './payments-handle.js'
import {Payment} from "../contract/MeetTon/tact_MeetTon.js";
import {getDateFromContract} from "../utils/get-date-from-contract.js";
import {fromNano} from "@ton/ton";
import {getConfiguration} from "../services/redis/get-сonfiguration.js";
import {configurations} from "../consts/core-config.js";

export async function resolvePayments(pay: Payment) {
  try {
    const date = getDateFromContract(pay)
    const paymentId = `${String(pay.id)}${pay.goal}:${date.toString()}`
    const user_id = Number(pay.id)
    const type = pay.goal
    const configuration = configurations.find((elem) => elem.productId === type)

    // @ts-ignore
    const handle = PAYMENT_HANDLE[type]

    if (!handle) return

    const [existingPayment, typeCost] = await Promise.all([
      models.Payments.findOne({paymentId}),
      getConfiguration(configuration?.code as string),
    ])

    if (existingPayment) {
      // Если платеж уже существует
      return;
    }

    const payment = {
      paymentId, // сохраняем уникальный идентификатор платежа
      user_id,
      amount: {
        value: fromNano(pay.value),
        currency: 'TON',
      },
      status: 'succeeded',
      paymentMethod: 'TON',
      type
    }

    if (typeCost && Number(typeCost) !== Number(fromNano(pay.value))) return

    console.log("New payment" + date.toString())

    await Promise.all([
      handle({user_id, userFor: Number(pay.for)}),
      models.Payments.create(payment)
    ])
  } catch (error) {
    logError('Internal Server Error - Error payment notification', error as Error)
  }
}
