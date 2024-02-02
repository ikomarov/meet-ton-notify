import {TonClient} from "@ton/ton";
import {Address} from "@ton/core";
import {getHttpEndpoint, Network} from "@orbs-network/ton-access";
import {MeetTon, Payment} from "../contract/MeetTon/tact_MeetTon.js";
import {CONTRACT_KEY, NETWORK} from "../consts/env.js";
import {recurringFunction} from "../utils/recurring-function.js";
import {resolvePayments} from "./resolve-payments.js";
import {getLengthBig} from "../services/redis/get-length-big.js";
import {saveLengthBig} from "../services/redis/save-length-big.js";
import {logError} from "../utils/logger.js";

async function checkPayments() {
    try {
        const contractAddress = Address.parse(CONTRACT_KEY as string);

        const client = new TonClient({
            endpoint: await getHttpEndpoint({network: NETWORK as Network})
        });

        const MeetTonContract = client.open(MeetTon.fromAddress(contractAddress))
        const [storedLength, lengthBig] = await Promise.all([
            getLengthBig(),
            MeetTonContract.getLength()
        ])

        const length = Number(lengthBig)

        if (length === 0 || storedLength === lengthBig) {
            return;
        }

        await saveLengthBig(lengthBig)

        const payments = await MeetTonContract.getPayments();

        for (let i = 0; i < length; i++){
            const elem = payments.keys()[i];
            const item = payments.get(elem) as Payment

            await resolvePayments(item)
        }

    } catch (error) {
        logError('Ошибка checkPayments', error as Error)
    }
}

recurringFunction(checkPayments)
