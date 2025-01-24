// index.ts
import { erc20Transfer } from "./transfer";

async function main(): Promise<void> {
    try {
        await erc20Transfer();
        console.log("Transfer complete");
    } catch (error) {
        console.error(error);
    }
}

main();
