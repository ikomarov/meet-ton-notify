import {TonClient, fromNano} from "@ton/ton";
import {Address, Dictionary} from "@ton/core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import {MeetTon} from "./contract/MeetTon/tact_MeetTon.js";

try {
    const contractAddress = Address.parse("EQBWF61W8MabVf5h-WruManzE3k9IO-Pv56ufLnnb9gis14F");
    const clientAddress = Address.parse("0QC-5GCDmBj6-db5JhkPf1YaU-lxBqVOxvAjwQSyUEQcSd9q")

    const client = new TonClient({
        endpoint: await getHttpEndpoint({ network: "testnet" })
    });

    const MeetTonContract = client.open(MeetTon.fromAddress(contractAddress))

    console.log(MeetTonContract)
    const balance = await MeetTonContract.getBalance();
    const payments = await MeetTonContract.getPayments();

    console.log(payments.get(0n))

    const item = payments.get(0n)
    console.log(new Date(Number(item?.date) * 1000))

    const length = await MeetTonContract.getLength();

    console.log(length)

    // const payment = await MeetTonContract.getPayment(0n);

    // console.log(payment)

    console.log(`Баланс: ${fromNano(balance)} TON`);
    // console.log(`Платеж: ${payments}`);
} catch (error) {
    console.error("Ошибка:", error);
}

