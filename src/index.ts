import {TonClient, fromNano} from "ton";
import { Address } from "ton-core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import {MeetTon} from "./contract/MeetTon/tact_MeetTon.js";

(async () => {
    try {
        const address = Address.parse("EQCrCIKXPh0to_uGy0Y8RE_A-Ox5VS6SFwIoG0g0TsvLXk8y");

        const client = new TonClient({
            endpoint: await getHttpEndpoint({ network: "testnet" })
        });

        // @ts-ignore
        const contract = client.open(MeetTon.fromAddress(address))
        const balance = await client.getBalance(address);
        // @ts-ignore
        const payment = await contract.getPayment(address);


        //
        // if (history.length > 0 && history[0].inMessage.body) {
        //     const bodyBoc = Buffer.from(history[0].inMessage.body, "base64");
        //     const cells = Cell.fromBoc(bodyBoc); // Десериализация BOC в массив Cell
        //     const firstCell = cells[0]; // Работаем с первой ячейкой
        //
        //     // Создание Slice для чтения данных из Cell
        //     const slice = firstCell.beginParse();
        //
        //     // Пример чтения данных: предположим, что первые 32 бита - это целое число
        //     const someInt = slice.readUint(32);
        //     console.log(`Прочитанное целое число: ${someInt}`);
        // }

        console.log(`Баланс: ${fromNano(balance)} TON`);
        console.log(`Платеж: ${payment}`);
    } catch (error) {
        console.error("Ошибка:", error);
    }
})();
