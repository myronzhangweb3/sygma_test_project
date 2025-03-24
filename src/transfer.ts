// transfer.ts
import { EVMAssetTransfer } from "sygma-sdk-custom-url";
import { Wallet, providers } from "ethers";


/**
 * Initializes the Sygma SDK asset transfer module.
 * @param provider The Ethereum provider to use.
 * @returns A Promise that resolves when the module is initialized.
 */
async function initAssetTransfer(
    provider: providers.JsonRpcProvider,
    configUrl: string
): Promise<EVMAssetTransfer> {
    const assetTransfer = new EVMAssetTransfer();
    await assetTransfer.init(provider, configUrl);
    return assetTransfer;
}

/**
 * Transfers ERC20 tokens between two Ethereum networks using the Sygma SDK.
 * @returns A Promise that resolves when the transfer is complete.
 */
export async function erc20Transfer(rpcUrl:string, privateKey:string, sygmaConfigUrl:string, targetChainId:number, resourceId:string, amount:number): Promise<string> {
    const provider = new providers.JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privateKey as string, provider);

    const assetTransfer = await initAssetTransfer(provider, sygmaConfigUrl);

    // transfer.ts
    const transfer = assetTransfer.createFungibleTransfer(
        await wallet.getAddress(),
        Number(targetChainId),
        await wallet.getAddress(),
        resourceId,
        amount,
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
    return response.hash;
}

export async function nativeTokenTransfer(rpcUrl:string, privateKey:string, sygmaConfigUrl:string, targetChainId:number, resourceId:string, amount:number): Promise<string> {
    const provider = new providers.JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privateKey as string, provider);

    const assetTransfer = await initAssetTransfer(provider, sygmaConfigUrl);

    const transfer = assetTransfer.createFungibleTransfer(
        await wallet.getAddress(),
        Number(targetChainId),
        await wallet.getAddress(),
        resourceId,
        amount,
    );

    console.log("transfer:", JSON.stringify(transfer));
    const fee = await assetTransfer.getFee(transfer);

    const transferTx = await assetTransfer.buildTransferTransaction(
        transfer,
        fee,
    );
    transferTx.value = transferTx.value?.add(amount)

    const response = await wallet.sendTransaction(
        transferTx as providers.TransactionRequest,
    );
    return response.hash;
}
