// transfer.ts
import { EVMAssetTransfer, Environment } from "sygma-sdk-custom-url";
import { Wallet, providers, ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const LUMOZ_TESTNET_CHAIN_ID = 105363;
const SEPOLIA_CHAIN_ID = 11155111;

const providerApiKey = process.env.PROVIDER_API_KEY;
const privateKey = process.env.PRIVATE_KEY;

if (!providerApiKey || !privateKey) {
    throw new Error("Missing environment variables");
}

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
    await assetTransfer.init(provider, "https://raw.githubusercontent.com/myronzhangweb3/sygma_test_project/refs/heads/main/config/shared-config-testnet.json");
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

    // transfer.ts
    const RESOURCE_ID =
        "0x0000000000000000000000000000000000000000000000000000000000000000";
    const transfer = assetTransfer.createFungibleTransfer(
        await wallet.getAddress(),
        // SEPOLIA_CHAIN_ID,
        LUMOZ_TESTNET_CHAIN_ID,
        await wallet.getAddress(),
        RESOURCE_ID,
        5, // instructions to send 50 tokens
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

export async function nativeTokenTransfer(): Promise<void> {
    const provider = new providers.JsonRpcProvider(providerApiKey);
    const wallet = new Wallet(privateKey as string, provider);

    const assetTransfer = await initAssetTransfer(provider);

    const RESOURCE_ID =
        "0x0000000000000000000000000000000000000000000000000000000000000000";
    const transfer = assetTransfer.createFungibleTransfer(
        await wallet.getAddress(),
        SEPOLIA_CHAIN_ID,
        // LUMOZ_TESTNET_CHAIN_ID,
        await wallet.getAddress(),
        RESOURCE_ID,
        8, // instructions to send 50 tokens
    );

    console.log("transfer:", JSON.stringify(transfer));
    const fee = await assetTransfer.getFee(transfer);

    const transferTx = await assetTransfer.buildTransferTransaction(
        transfer,
        fee,
    );

    // transfer value
    transferTx.value = transferTx.value?.add(8)

    const response = await wallet.sendTransaction(
        transferTx as providers.TransactionRequest,
    );
    console.log("Sent transfer with hash: " + response.hash);
}
