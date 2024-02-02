import {PAYMENT_TIMEOUT} from "../consts/env.js";

export async function recurringFunction(callback: () => void) {
    await callback()
    // Повторно вызываем функцию через 5 секунд после завершения текущего вызова
    setTimeout(() => recurringFunction(callback), Number(PAYMENT_TIMEOUT) * 1000 );
}
