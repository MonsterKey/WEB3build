const {TokenListProvider, TokenInfo} = require("@solana/spl-token-registry");
const { createMetadataV2 } = require('@oyster/common');

new TokenListProvider().resolve().then((tokens) => {
    const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
    console.log(tokenList);
    tokenList.push()
});
