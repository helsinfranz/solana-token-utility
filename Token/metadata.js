const {
    createUmi,
} = require('@metaplex-foundation/umi-bundle-defaults');
const {
    createSignerFromKeypair,
} = require('@metaplex-foundation/umi');
const {
    mplTokenMetadata,
    createMetadataAccountV3,
} = require('@metaplex-foundation/mpl-token-metadata');
const {
    fromWeb3JsKeypair,
    fromWeb3JsPublicKey,
} = require('@metaplex-foundation/umi-web3js-adapters');
const {
    clusterApiUrl,
    Keypair,
    PublicKey,
} = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

// Load your wallet's secret key
const privateKey = JSON.parse(fs.readFileSync('./id.json')).key;
const secretKey = bs58.default.decode(privateKey);
const keypair = Keypair.fromSecretKey(secretKey);

// Create a Umi instance with default plugins
const umi = createUmi(clusterApiUrl('devnet')).use(mplTokenMetadata());

// Convert web3.js keypair to Umi signer
const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(keypair));
umi.identity = signer;
umi.payer = signer;

// Define your token's mint address
const mintPublicKey = new PublicKey('HuJJVawZyD7hLqcLrqp3kfXn422jeBkMwM8vWdBaA7m'); // TODO: Replace with your token mint address created while running index.js

// Create metadata
(async () => {
    await createMetadataAccountV3(umi, {
        mint: fromWeb3JsPublicKey(mintPublicKey),
        mintAuthority: signer,
        payer: signer,
        updateAuthority: signer.publicKey,
        data: {
            name: 'Vyxen', // TODO: Replace with your token name
            symbol: 'Vyx', // TODO: Replace with your token symbol
            uri: 'https://rose-permanent-cricket-557.mypinata.cloud/ipfs/bafkreiaijzl4pnuirs3up5mwlmvhix724o6zqn6wuf6vqogl2esxxqbnxe', // TODO: Replace with your token metadata URI
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        },
        isMutable: true,
        collectionDetails: null,
    }).sendAndConfirm(umi);
})();
