import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

// Configure Solana connection and token details
const connection = new Connection("https://api.devnet.solana.com");
const TOKEN_MINT_ADDRESS = new PublicKey(
  "HuJJVawZyD7hLqcLrqp3kfXn422jeBkMwM8vWdBaA7m"
); // Replace with your devnet token mint
const TREASURY_WALLET = new PublicKey(
  "GseR68t65PQciqhUBTmEnPAv2DxiSvjatDwsSJrwU8mG"
); // Replace with your devnet treasury
const AMOUNT_TO_TRANSFER = 100000000; // 1 token with 8 decimals

export async function payEntryFee(walletAddress) {
  try {
    const userWallet = new PublicKey(walletAddress);

    // Get the associated token accounts for both wallets
    const userATA = await getAssociatedTokenAddress(
      TOKEN_MINT_ADDRESS,
      userWallet
    );

    const treasuryATA = await getAssociatedTokenAddress(
      TOKEN_MINT_ADDRESS,
      TREASURY_WALLET
    );

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      userATA,
      treasuryATA,
      userWallet,
      AMOUNT_TO_TRANSFER
    );

    // Create transaction and add the transfer instruction
    const transaction = new Transaction().add(transferInstruction);

    transaction.feePayer = userWallet;

    const latest = await connection.getLatestBlockhash("finalized");
    transaction.recentBlockhash = latest.blockhash;
    transaction.lastValidBlockHeight = latest.lastValidBlockHeight;

    if (!transaction || !solanaWallet.signTransaction) {
      throw new Error("Failed to create transaction or wallet cannot sign");
    }

    // Sign the transaction
    const signedTransaction = await solanaWallet.signTransaction(
      transaction
    );

    // Send and confirm the transaction
    const signature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: transaction.recentBlockhash,
      lastValidBlockHeight: transaction.lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error("Transaction failed to confirm");
    }

    return true;
  } catch (error) {
    console.error("Error creating payment transaction:", error);
    throw error;
  }
}