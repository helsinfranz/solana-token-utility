const bs58 = require('bs58');
const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

const main = async () => {
    // Connection and payer
    const privateKey = JSON.parse(require('fs').readFileSync('./id.json')).key;
    const secretKey = bs58.default.decode(privateKey);
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
    const payer = web3.Keypair.fromSecretKey(secretKey);

    // Create Mint
    const mint = await splToken.createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        8 // decimals
    );

    console.log('Mint Address:', mint.toBase58());

    // Create Associated Token Account
    const tokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );

    // Mint tokens
    await splToken.mintTo(connection, payer, mint, tokenAccount.address, payer, 1000 * 10 ** 8);

    console.log('Minted 1000 tokens to:', tokenAccount.address.toBase58());
};

main().catch(console.error);
