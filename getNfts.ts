import {getNFTsByOwner} from "./NFTget"
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const cluterURL = 'https://little-black-dust.solana-mainnet.quiknode.pro/b8e2c8d9da6845f92815de5f0d298259d979391b/';
const connection = new Connection(cluterURL, 'processed');

(async () => {
    let infts = await getNFTsByOwner(new PublicKey("voo8o1fBES9HjpZY3buMStNhDXxMZAfx2vUSnCP7aYn"), connection);

    for (let nft of infts) {
        console.log("mint: ", nft.mint.toString())
    }
})()