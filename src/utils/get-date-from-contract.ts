import {Payment} from "../contract/MeetTon/tact_MeetTon.js";

export function getDateFromContract(item: Payment) {
    return new Date(Number(item?.date) * 1000)
}