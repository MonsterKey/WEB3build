import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';
import { programs } from '@metaplex/js';


const {
  metadata: { Metadata },
} = programs;

export interface INFT {
  pubkey?: PublicKey;
  mint: PublicKey;
  onchainMetadata: unknown;
  externalMetadata: unknown;
  countdown: String;
  selected: Boolean;
  state?: String;
  pda?: any;
}

async function getTokensByOwner(owner: PublicKey, conn: Connection) {
  const tokens = await conn.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });

  // initial filter - only tokens with 0 decimals & of which 1 is present in the wallet
  return tokens.value
    .filter((t) => {
	  const mint = t.account.data.parsed.info.mint;
	  const amount = t.account.data.parsed.info.tokenAmount;
	  return amount.decimals === 0 && amount.uiAmount === 1 /*&& state !== "frozen"*/
	  			// && (maskHash[b58key] === 1 || lettersHash[b58key2] === 1);
    })
    .map((t) => {
      return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint, state: t.account.data.parsed.info.state };
    });
}

async function getNFTMetadata(
  token: any,
  conn: Connection
): Promise<INFT | undefined> {
  // console.log('Pulling metadata for:', mint);
  try {
    const metadataPDA = await Metadata.getPDA(token.mint);
    const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;
    const externalMetadata = (await axios.get(onchainMetadata.data.uri)).data;
	const creators = onchainMetadata?.data?.creators;
	
	if (!creators || creators.length < 1) return undefined;
	
	// only display letters & masks
	const creator0 = creators[0].address;
	if (!(creator0 === 'CtdvADmmSpHKDDrETMNAAVr5wzAw4b1bMXRVdpSRAXef'
		|| creator0 === '4oV5npijuhmNLJmrWXjXAXSRCV1mvFJYme9vGd3wfHCr'
		|| creator0 === "8Nqitx1y4rPRRLnscL8LN36kLWXTNoqoAH2UNZrSmBX4"))
		return undefined;
	
    return {
      pubkey: token.pubkey ? new PublicKey(token.pubkey) : undefined,
      mint: new PublicKey(token.mint),
      onchainMetadata,
      externalMetadata,
	  state: token.state,
	  selected: false,
	  pda: undefined,
	  countdown: "",
    };
  } catch (e) {
    console.log(`failed to pull metadata for token ${token.mint}`);
  }
}

export async function getNFTMetadataForMany(
  tokens: any[],
  conn: Connection
): Promise<INFT[]> {
  const promises: Promise<INFT | undefined>[] = [];
  tokens.forEach((t) => promises.push(getNFTMetadata(t, conn)));
  const nfts = (await Promise.all(promises)).filter((n) => !!n);
  //console.log(`found ${nfts.length} metadatas`);

  return nfts as INFT[];
}

export async function getNFTsByOwner(
  owner: PublicKey,
  conn: Connection
): Promise<INFT[]> {
  const tokens = await getTokensByOwner(owner, conn);
  console.log(`found ${tokens.length} tokens`);

  return await getNFTMetadataForMany(tokens, conn);
}
