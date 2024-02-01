import {TonClient} from "@ton/ton";
import {Address} from "@ton/core";
import {getHttpEndpoint, Network} from "@orbs-network/ton-access";
import {MeetTon, Payment} from "../contract/MeetTon/tact_MeetTon.js";
import {CONTRACT_URL, NETWORK} from "../consts/env.js";
import {recurringFunction} from "../utils/recurring-function.js";
import {resolvePayments} from "./resolve-payments.js";

async function checkPayments() {
    try {
        const contractAddress = Address.parse(CONTRACT_URL as string);

        const client = new TonClient({
            endpoint: await getHttpEndpoint({network: NETWORK as Network})
        });

        const MeetTonContract = client.open(MeetTon.fromAddress(contractAddress))

        const lengthBig = await MeetTonContract.getLength();
        const length = Number(lengthBig)

        if (length === 0) {
            return;
        }

        const payments = await MeetTonContract.getPayments();

        for (let i = 0; i < length; i++){
            const elem = payments.keys()[i];
            const item = payments.get(elem) as Payment

            await resolvePayments(item)
        }

        // const balance = await MeetTonContract.getBalance();
        // console.log(`Баланс: ${fromNano(balance)} TON`);
    } catch (error) {
        console.error("Ошибка:", error);
    }

}

await recurringFunction(checkPayments)
