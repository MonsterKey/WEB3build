const solanaWeb3 = require('@solana/web3.js');
let keypair:any;
let rpcUrl:any;
let connection:any;
let splaccount:any;

let programId = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const establishConnection = async () => {
    rpcUrl = "https://api.devnet.solana.com";
    connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');
    console.log('Connection to cluster established:', rpcUrl);
}
const connectWallet = async () => {
    let secretKey = Uint8Array.from([]
    );
    keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
    console.log('keypair created');
}
const createPDAAccount = async () => {
    splaccount = solanaWeb3.Keypair.generate();
    const transaction = new solanaWeb3.Transaction();
    const instruction = solanaWeb3.SystemProgram.createAccount({
        fromPubkey: keypair.publicKey,
        newAccountPubkey: splaccount.publicKey,
        space: 165,
        lamports: 2039280,
        programId,
    });
    transaction.add(instruction);
    var signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair, splaccount]);
    console.log(signature);
}
const balance = async () => {
    let balance = await connection.getBalance(keypair.publicKey);
    console.log(keypair.publicKey.toString());
    console.log(`balance: ${balance}`);
}
establishConnection();
connectWallet();
balance();
createPDAAccount();