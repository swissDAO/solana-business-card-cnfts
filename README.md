# Project Title
Solana Business Card Compressed NFT

## Description
Create a dynamic Business Card NFT that can be used to share contact information and social media links.  The image for the cNFT will be generated from an in-browser SVG that is then converted to a PNG on the backend and uploaded to Irys using Vercel's `/temp` directory, therefore no database is needed to store the image. The NFT will be compressed to reduce the size of the NFT and reduce the cost of minting the NFT.  The NFT will be minted using Helius' easy `mintCompressedNft` API endpoint. The cNFT can be airdropped to any Solana wallet address or .SOL domain.

## Getting Started
To begin the tutorial clone the `starter` branch using the following command:
```
git clone -b starter https://github.com/swissDAO/solana-business-card-cnfts.git
```

To jump ahead to the final version you can clone from the `final` branch using the following command:
```
git clone -b final https://github.com/swissDAO/solana-business-card-cnfts.git
```

