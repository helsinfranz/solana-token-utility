# Solana Token Creation & Client Usage Guide

This guide will walk you through the process of creating a custom token on Solana, deploying its metadata to IPFS, and using the provided client scripts to set up a connection and handle payments with your new token.

---

## 1. Token Creation (Token Folder)

### Prerequisites

- Node.js installed
- Your Solana wallet secret key (as a JSON string)

### Steps

#### a. Add Your Secret Key

1. Place your Solana wallet's secret key in `Token/id.json`.
   - This file should contain your private key as a JSON string (exported from Phantom, Sollet, or Solana CLI).
   - **Example:**
     ```json
     "vsdgfdfdGSsdv..."
     ```
   - **Warning:** Keep this file secure. Do not share it.

#### b. Deploy Token Metadata to IPFS

1. Prepare your token metadata in `Token/token1.json`.
   - This file should follow the Solana token metadata standard (name, symbol, URI, etc.).
2. Upload `token1.json` to IPFS (using a service like Pinata, NFT.Storage, or your own IPFS node).
   - Save the resulting IPFS URI (e.g., `ipfs://Qm...`).

#### c. Create the Token

1. Run the `Token/index.js` script to create your token on Solana:
   ```powershell
   cd Token
   node index.js
   ```
   - This script will use your secret key and the metadata to create the token.

#### d. Set Token Metadata

1. After creating the token, run the `Token/metadata.js` script to set the token's metadata URI:
   ```powershell
   node metadata.js
   ```
   - This will update your token with the IPFS metadata URI.

---

## 2. Client Usage (Client Folder)

### a. Setting Up the Connection

1. Open `Client/connection.js`.
2. Ensure the connection is set to the correct Solana cluster (mainnet, devnet, or testnet).
   - You may need to update the endpoint URL in the script.
3. Run the script to test the connection:
   ```powershell
   cd ../Client
   node connection.js
   ```

### b. Making and Receiving Payments with Your Token

#### Sending Payments

1. Open `Client/payment.js`.
2. Update the script with:
   - The token mint address (from the token you created)
   - The sender's and receiver's wallet addresses
   - The amount to send
3. Run the script to send tokens:
   ```powershell
   node payment.js
   ```

#### Receiving Payments

- To receive payments, simply provide your Solana wallet address to the sender.
- The sender can use the `payment.js` script to transfer tokens to your address.

---

## Notes

- Always keep your `id.json` (private key) secure.
- Make sure to fund your wallet with enough SOL to pay for transaction fees.
- For more details on Solana token standards and metadata, refer to the [Solana Token Program documentation](https://spl.solana.com/token).

---

**Enjoy building on Solana!**
