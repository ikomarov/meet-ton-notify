import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type Income = {
    $$type: 'Income';
    goal: string;
    id: bigint;
    for: bigint | null;
}

export function storeIncome(src: Income) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(589627220, 32);
        b_0.storeStringRefTail(src.goal);
        b_0.storeUint(src.id, 32);
        if (src.for !== null && src.for !== undefined) { b_0.storeBit(true).storeUint(src.for, 32); } else { b_0.storeBit(false); }
    };
}

export function loadIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 589627220) { throw Error('Invalid prefix'); }
    let _goal = sc_0.loadStringRefTail();
    let _id = sc_0.loadUintBig(32);
    let _for = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    return { $$type: 'Income' as const, goal: _goal, id: _id, for: _for };
}

function loadTupleIncome(source: TupleReader) {
    let _goal = source.readString();
    let _id = source.readBigNumber();
    let _for = source.readBigNumberOpt();
    return { $$type: 'Income' as const, goal: _goal, id: _id, for: _for };
}

function storeTupleIncome(source: Income) {
    let builder = new TupleBuilder();
    builder.writeString(source.goal);
    builder.writeNumber(source.id);
    builder.writeNumber(source.for);
    return builder.build();
}

function dictValueParserIncome(): DictionaryValue<Income> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncome(src)).endCell());
        },
        parse: (src) => {
            return loadIncome(src.loadRef().beginParse());
        }
    }
}

export type Payment = {
    $$type: 'Payment';
    sender: Address;
    goal: string;
    value: bigint;
    date: bigint;
    id: bigint;
    for: bigint | null;
}

export function storePayment(src: Payment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.sender);
        b_0.storeStringRefTail(src.goal);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.date, 32);
        b_0.storeUint(src.id, 32);
        if (src.for !== null && src.for !== undefined) { b_0.storeBit(true).storeUint(src.for, 32); } else { b_0.storeBit(false); }
    };
}

export function loadPayment(slice: Slice) {
    let sc_0 = slice;
    let _sender = sc_0.loadAddress();
    let _goal = sc_0.loadStringRefTail();
    let _value = sc_0.loadCoins();
    let _date = sc_0.loadUintBig(32);
    let _id = sc_0.loadUintBig(32);
    let _for = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    return { $$type: 'Payment' as const, sender: _sender, goal: _goal, value: _value, date: _date, id: _id, for: _for };
}

function loadTuplePayment(source: TupleReader) {
    let _sender = source.readAddress();
    let _goal = source.readString();
    let _value = source.readBigNumber();
    let _date = source.readBigNumber();
    let _id = source.readBigNumber();
    let _for = source.readBigNumberOpt();
    return { $$type: 'Payment' as const, sender: _sender, goal: _goal, value: _value, date: _date, id: _id, for: _for };
}

function storeTuplePayment(source: Payment) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeString(source.goal);
    builder.writeNumber(source.value);
    builder.writeNumber(source.date);
    builder.writeNumber(source.id);
    builder.writeNumber(source.for);
    return builder.build();
}

function dictValueParserPayment(): DictionaryValue<Payment> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayment(src)).endCell());
        },
        parse: (src) => {
            return loadPayment(src.loadRef().beginParse());
        }
    }
}

export type Clear = {
    $$type: 'Clear';
    itemNumb: bigint;
}

export function storeClear(src: Clear) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1783047476, 32);
        b_0.storeInt(src.itemNumb, 257);
    };
}

export function loadClear(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1783047476) { throw Error('Invalid prefix'); }
    let _itemNumb = sc_0.loadIntBig(257);
    return { $$type: 'Clear' as const, itemNumb: _itemNumb };
}

function loadTupleClear(source: TupleReader) {
    let _itemNumb = source.readBigNumber();
    return { $$type: 'Clear' as const, itemNumb: _itemNumb };
}

function storeTupleClear(source: Clear) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.itemNumb);
    return builder.build();
}

function dictValueParserClear(): DictionaryValue<Clear> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClear(src)).endCell());
        },
        parse: (src) => {
            return loadClear(src.loadRef().beginParse());
        }
    }
}

 type MeetTon_init_args = {
    $$type: 'MeetTon_init_args';
}

function initMeetTon_init_args(src: MeetTon_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MeetTon_init() {
    const __code = Cell.fromBase64('te6ccgECIwEABQEAART/APSkE/S88sgLAQIBYgIDAuTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEvQAgQEBzwDJ7VQeBAIBIA0OAu7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQIyT/VLqO1TDTHwGCECMk/1S68uCB1AHQAdMf0gABktMfkm0B4lUgbBP4QW8kE18D+EIQJPgjFRA0QDNVQIEBAQbIVVDbPMkiEDQBIG6VMFn0WjCUQTP0FeIBpH/gIAUGAIJQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBM8WyVADzAH6AssfEssfIW6zln8BygDLH5RwMsoA4gT8ghALppdRuo9DMNMfAYIQC6aXUbry4IH6AAExVSDbPPgnbxD4QW8kE18DoYIImJaAoRS2CIIA1VchwgDy9PhCf1iAQhAjbW1t2zxYf+AgghBqRyU0uo6lMNMfAYIQakclNLry4IGBAQHXAAExVSDbPDGBbV0DuhLy9G1wf+AgCgsKBwJyghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wCAkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CwKW+QGC8L6yk1qCCJsVTTL5nEN3qpYKoRU2bMLGAnVeNrl/UFzsuo8j2zz4Qn/4J28Q+EFvJBNfA6GCCJiWgKGAQhAjbW1t2zx/2zHgCgsAFoFtEfhCUkDHBfL0AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAwAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAPEAIBIBcYAgN64BESAhG6E72zzbPGwxgeFgI/p7W2eKoFtnjYYkDdJGDbMkDd5aEA3kzeDcRA3SRg270eEwIPpwu2ebZ42GMeFQE6gQEBIwJZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuIUAGz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AH6ANMf0x/SAAGS0x+SbQHiVVAABPgoAAIhAgEgGRoCAUghIgIRttgbZ5tnjYYwHhsCASAcHQAI+CdvEAIRsIw2zzbPGwxgHh8AlbL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAGM7UTQ1AH4Y9IAAY4r+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BIEBAdcAVSBsE+Aw+CjXCwqDCbry4InbPCAAAiAACm1w+EJZABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWZCOFNKb2JBU3pQcHphTXZKODY3ZDM4SHhRRmpXdGExcnJtdnJtSDRFbmhGgg');
    const __system = Cell.fromBase64('te6cckECJQEABQsAAQHAAQEFoRsFAgEU/wD0pBP0vPLICwMCAWIZBAIBIBAFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtZkI4U0pvYkFTelBwemFNdko4NjdkMzhIeFFGald0YTFycm12cm1INEVuaEaCAAEbCvu1E0NIAAYAIBIA4KAgEgDAsAlbL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAIRsIw2zzbPGwxgIw0AAiACEbbYG2ebZ42GMCMPAAj4J28QAgEgExECEboTvbPNs8bDGCMSAAIhAgN64BYUAg+nC7Z5tnjYYyMVAAT4KAI/p7W2eKoFtnjYYkDdJGDbMkDd5aEA3kzeDcRA3SRg270jFwE6gQEBIwJZ9A1voZIwbd8gbpIwbY6H0Ns8bBZvBuIYAGz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AH6ANMf0x/SAAGS0x+SbQHiVVAC5NAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUS2zzy4ILI+EMBzH8BygBVIFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYS9ACBAQHPAMntVCMaAu7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQIyT/VLqO1TDTHwGCECMk/1S68uCB1AHQAdMf0gABktMfkm0B4lUgbBP4QW8kE18D+EIQJPgjFRA0QDNVQIEBAQbIVVDbPMkiEDQBIG6VMFn0WjCUQTP0FeIBpH/gICIbBPyCEAuml1G6j0Mw0x8BghALppdRuvLggfoAATFVINs8+CdvEPhBbyQTXwOhggiYloChFLYIggDVVyHCAPL0+EJ/WIBCECNtbW3bPFh/4CCCEGpHJTS6jqUw0x8BghBqRyU0uvLggYEBAdcAATFVINs8MYFtXQO6EvL0bXB/4CAhHyEcAnKCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAeHQKW+QGC8L6yk1qCCJsVTTL5nEN3qpYKoRU2bMLGAnVeNrl/UFzsuo8j2zz4Qn/4J28Q+EFvJBNfA6GCCJiWgKGAQhAjbW1t2zx/2zHgIR8BOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8HwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAgAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMABaBbRH4QlJAxwXy9ACCUGUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUATPFslQA8wB+gLLHxLLHyFus5Z/AcoAyx+UcDLKAOIBjO1E0NQB+GPSAAGOK/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAFUgbBPgMPgo1wsKgwm68uCJ2zwkAAptcPhCWeJaE8o=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMeetTon_init_args({ $$type: 'MeetTon_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MeetTon_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    27921: { message: `Only owner is allowed to withdraw` },
    27997: { message: `You have more unresolved transactions` },
    54615: { message: `Insufficient balance` },
}

const MeetTon_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Income","header":589627220,"fields":[{"name":"goal","type":{"kind":"simple","type":"string","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"for","type":{"kind":"simple","type":"uint","optional":true,"format":32}}]},
    {"name":"Payment","header":null,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"goal","type":{"kind":"simple","type":"string","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"date","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"for","type":{"kind":"simple","type":"uint","optional":true,"format":32}}]},
    {"name":"Clear","header":1783047476,"fields":[{"name":"itemNumb","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const MeetTon_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"myAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"payment","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Payment","optional":true}},
    {"name":"payments","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Payment","valueFormat":"ref"}},
    {"name":"length","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const MeetTon_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Income"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Clear"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MeetTon implements Contract {
    
    static async init() {
        return await MeetTon_init();
    }
    
    static async fromInit() {
        const init = await MeetTon_init();
        const address = contractAddress(0, init);
        return new MeetTon(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MeetTon(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MeetTon_types,
        getters: MeetTon_getters,
        receivers: MeetTon_receivers,
        errors: MeetTon_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Income | 'withdraw safe' | Withdraw | Clear | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Income') {
            body = beginCell().store(storeIncome(message)).endCell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Clear') {
            body = beginCell().store(storeClear(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMyAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('myAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPayment(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('payment', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTuplePayment(result_p) : null;
        return result;
    }
    
    async getPayments(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('payments', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserPayment(), source.readCellOpt());
        return result;
    }
    
    async getLength(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('length', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}