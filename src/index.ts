// index.ts
import {erc20Transfer, nativeTokenTransfer} from "./transfer";

async function main(): Promise<void> {
    try {
        // await erc20Transfer();
        await nativeTokenTransfer();
        console.log("Transfer complete");
    } catch (error) {
        console.error(error);
    }
}

main();
