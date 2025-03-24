# Sygma Cross-Chain Bridge Test Project

This project is designed to test the Sygma cross-chain bridge functionality, supporting transfers of both native tokens and ERC20 tokens across different blockchains.

## Installation

Make sure you have Node.js and Yarn installed, then run the following commands:

```bash
# Clone the repository
git clone <repository-url>
cd sygma_test_project

# Install dependencies
yarn install
```

## Configuration

Before running the project, ensure you have properly configured the `.env` file:

```
SYGMA_CONFIG_URL=<sygma-config-file-URL>
RPC_URL=<blockchain-RPC-node-URL>
PRIVATE_KEY=<your-private-key>
```

## Usage

### Execute cross-chain transfers

The project supports two types of transfers:

1. Native token transfers
2. ERC20 token transfers

#### Native Token Transfer Example

```bash
TX_TYPE=1 SOURCE_CHAIN_ID=<source-chain-id> TARGET_CHAIN_ID=<target-chain-id> RESOURCE_ID=<resource-id> TX_AMOUNT=<transfer-amount> npx ts-node ./src/main.ts
```

#### ERC20 Token Transfer Example

```bash
TX_TYPE=2 SOURCE_CHAIN_ID=<source-chain-id> TARGET_CHAIN_ID=<target-chain-id> RESOURCE_ID=<resource-id> TX_AMOUNT=<transfer-amount> npx ts-node ./src/main.ts
```

### Using Predefined Scripts

The project includes a predefined script for native token transfers:

```bash
yarn native
```

This command executes a transfer with the following parameters:
- Transaction type: Native token transfer (TX_TYPE=1)
- Source chain ID: 1 (SOURCE_CHAIN_ID=1)
- Target chain ID: 2 (TARGET_CHAIN_ID=2)
- Transfer amount: 2 (TX_AMOUNT=2)

## Parameter Description

- `TX_TYPE`: Transaction type (1: native token transfer, 2: ERC20 token transfer)
- `SOURCE_CHAIN_ID`: Source blockchain ID
- `TARGET_CHAIN_ID`: Target blockchain ID
- `RESOURCE_ID`: Resource ID
- `TX_AMOUNT`: Transfer amount



