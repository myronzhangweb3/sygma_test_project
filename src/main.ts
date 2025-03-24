// index.ts
import { erc20Transfer, nativeTokenTransfer } from "./transfer";

import dotenv from "dotenv";

dotenv.config();

const txType = process.env.TX_TYPE || '';
if (!txType || txType === '') {
    throw new Error("Missing TX_TYPE(1:native transfer, 2:erc20 transfer)");
}

const sourceChainId = process.env.SOURCE_CHAIN_ID || '';
const targetChainId = process.env.TARGET_CHAIN_ID || '';
if (!sourceChainId || sourceChainId === '' || !targetChainId || targetChainId === '') {
    throw new Error("Missing SOURCE_CHAIN_ID or TARGET_CHAIN_ID");
}

const recourceId = process.env.RESOURCE_ID || '';
if (!recourceId || recourceId === '') {
    throw new Error("Missing RESOURCE_ID");
}

const rpcUrl = process.env.RPC_URL || '';
const privateKey = process.env.PRIVATE_KEY || '';

if (!rpcUrl || rpcUrl === '' || !privateKey || privateKey === '') {
    throw new Error("Missing providerApiKey or privateKey");
}

const sygmaConfigUrl = process.env.SYGMA_CONFIG_URL || '';
if (!sygmaConfigUrl || sygmaConfigUrl === '') {
    throw new Error("Missing SYGMA_CONFIG_URL");
}

const txAmount = process.env.TX_AMOUNT || '';
if (!txAmount || txAmount === '') {
    throw new Error("Missing TX_AMOUNT");
}

async function main(): Promise<void> {
    try {
        let txHash = '';
        switch(Number(txType)){
            case 1:
                txHash = await nativeTokenTransfer(rpcUrl, privateKey, sygmaConfigUrl, Number(sourceChainId), targetChainId, Number(recourceId));
                break;
            case 2:
                txHash = await erc20Transfer(rpcUrl, privateKey, sygmaConfigUrl, Number(sourceChainId), targetChainId, Number(recourceId));
                break;
        }
        console.log(`Transfer tx hash: ${txHash}`);
    } catch (error) {
        console.error(error);
    }
}

main();
