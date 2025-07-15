# Solana Token Utility: Beginner-Friendly Guide for Web2 Developers

Welcome! This guide is designed for developers who are new to Web3 and want to create and use their own token on the Solana blockchain. We'll walk you through every step, explain the concepts, and show you how to use the provided scripts to create, manage, and use your token for payments.

---

## What is Web3? What is Solana?

**Web3** is the next evolution of the internet, where users own their data and assets using blockchains. Instead of relying on centralized servers, Web3 apps use decentralized networks.

**Solana** is a fast, low-cost blockchain that supports smart contracts and custom tokens. You can think of a Solana token like a custom currency or loyalty point that you control.

---

## 1. Creating Your Own Token (Token Folder)

### Prerequisites

- **Node.js** installed (lets you run JavaScript outside the browser)
- **Solana CLI** installed and configured (for wallet management)
- A Solana wallet (Phantom, Sollet, or CLI)

### Key Concepts

- **Wallet**: Like a bank account, but for crypto. It has a public address (like your account number) and a private key (like your password). Never share your private key!
- **Token**: A digital asset you create on Solana. It can represent anything: currency, points, access, etc.
- **Metadata**: Info about your token (name, symbol, image, etc.) stored on IPFS (a decentralized storage network).

### Step-by-Step Instructions

#### a. Add Your Secret Key

1. Export your Solana wallet's **private key** as a JSON string and save it as `Token/id.json`.
   - **Example:**
     ```json
     "vfdbBFDvsdvs..."
     ```
   - This file is used by the scripts to sign transactions as you.
   - **Warning:** Keep this file safe and never share it. Anyone with this file can control your wallet.

#### b. Prepare and Upload Token Metadata to IPFS

1. Edit `Token/token1.json` to describe your token. Example:
   ```json
   {
     "name": "MyToken",
     "symbol": "MTK",
     "decimals": 6,
     "description": "A demo token for learning Solana.",
     "image": "https://.../logo.png"
   }
   ```
2. Upload `token1.json` to IPFS using a service like [Pinata](https://pinata.cloud), [NFT.Storage](https://nft.storage), or your own IPFS node.
   - You'll get a link like `ipfs://Qm...`. This is your token's metadata URI.

#### c. Create the Token on Solana

1. Open a terminal and run:
   ```powershell
   cd Token
   node index.js
   ```
   - This script creates your token using your wallet and the metadata you prepared.
   - It will output your **token mint address** (the unique ID for your token).

#### d. Set the Token Metadata

1. Run the following to attach your IPFS metadata to your token:
   ```powershell
   node metadata.js
   ```
   - This script updates your token with the metadata URI from IPFS.

---

## 2. Using Your Token: Client Scripts (Client Folder)

Now that you have a token, you can use it to send and receive payments!

### a. Setting Up a Connection to Solana

1. Open `Client/connection.js`.
2. Make sure the script is connecting to the right Solana network:
   - **devnet** (for testing), **mainnet** (for real value), or **testnet**.
   - Look for a line like:
     ```js
     const endpoint = "https://api.devnet.solana.com";
     ```
   - Change it if needed.
3. Test the connection:
   ```powershell
   cd ../Client
   node connection.js
   ```
   - You should see a message confirming the connection.

### b. Sending and Receiving Payments with Your Token

#### Sending Payments

1. Open `Client/payment.js`.
2. Update the script with:
   - **Token mint address** (from when you created the token)
   - **Sender's wallet** (your wallet, using `id.json`)
   - **Receiver's wallet address** (the person you want to pay)
   - **Amount** to send (in your token's smallest unit, e.g., if decimals=6, 1 token = 1,000,000 units)
3. Run the script:
   ```powershell
   node payment.js
   ```
   - The script will send your custom token to the receiver.

#### Receiving Payments

- To receive payments, just give your Solana wallet address to the sender.
- The sender uses the `payment.js` script to send tokens to you.
- You can check your token balance using a Solana wallet or explorer (like https://solscan.io/).

---

## Frequently Asked Questions (FAQ)

**Q: What is a token mint address?**
A: It's the unique ID of your token on Solana. You'll get it after running `index.js`.

**Q: What is IPFS and why do I need it?**
A: IPFS is a decentralized storage network. Your token's info (name, image, etc.) is stored there so anyone can access it, and it can't be changed or censored.

**Q: What if I lose my id.json file?**
A: You lose access to your wallet and tokens. Back it up securely!

**Q: What are transaction fees?**
A: Every action on Solana costs a small amount of SOL (the native token). Make sure your wallet has some SOL for fees.

---

## Notes & Best Practices

- Never share your private key (`id.json`) with anyone.
- Always test on **devnet** before using real value on **mainnet**.
- Fund your wallet with some SOL for transaction fees (get free SOL for devnet from the [Solana Faucet](https://solfaucet.com/)).
- For more details, see the [Solana Token Program documentation](https://spl.solana.com/token).

---

**Congratulations!** You now know how to create, manage, and use your own token on Solana. Welcome to Web3!
