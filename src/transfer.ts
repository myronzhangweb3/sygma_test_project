// transfer.ts
import { EVMAssetTransfer, Environment } from "sygma-sdk-core-test";
import { Wallet, providers, ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.PROVIDER_API_KEY;
const privateKey = process.env.PRIVATE_KEY;

if (!providerApiKey || !privateKey) {
    throw new Error("Missing environment variables");
}
// transfer.ts
const OPSIDE_TESTNET_CHAIN_ID = 51178;
const RESOURCE_ID =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

// transfer.ts
/**
 * Initializes the Sygma SDK asset transfer module.
 * @param provider The Ethereum provider to use.
 * @returns A Promise that resolves when the module is initialized.
 */
async function initAssetTransfer(
    provider: providers.JsonRpcProvider,
): Promise<EVMAssetTransfer> {
    const assetTransfer = new EVMAssetTransfer();
    await assetTransfer.init(provider, Environment.MAINNET);
    console.log(`assetTransfer.config.environment: ${assetTransfer.config.environment}`)
    return assetTransfer;
}

// transfer.ts
/**
 * Transfers ERC20 tokens between two Ethereum networks using the Sygma SDK.
 * @returns A Promise that resolves when the transfer is complete.
 */
export async function erc20Transfer(): Promise<void> {
    const provider = new providers.JsonRpcProvider(providerApiKey);
    const wallet = new Wallet(privateKey as string, provider);

    const assetTransfer = await initAssetTransfer(provider);

    const transfer = assetTransfer.createFungibleTransfer(
        await wallet.getAddress(),
        OPSIDE_TESTNET_CHAIN_ID,
        await wallet.getAddress(),
        RESOURCE_ID,
        50, // instructions to send 50 tokens
    );

    const fee = await assetTransfer.getFee(transfer);
    const approvals = await assetTransfer.buildApprovals(transfer, fee);
    for (const approval of approvals) {
        await wallet.sendTransaction(approval as providers.TransactionRequest);
    }

    const transferTx = await assetTransfer.buildTransferTransaction(
        transfer,
        fee,
    );

    const response = await wallet.sendTransaction(
        transferTx as providers.TransactionRequest,
    );
    console.log("Sent transfer with hash: " + response.hash);
}