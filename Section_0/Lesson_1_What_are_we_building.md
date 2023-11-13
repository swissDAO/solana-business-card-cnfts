## 📝 What are we building?

Welcome builder, glad you could make it 😃. My name is [Matt](https://twitter.com/_matt_xyz) and I'm here to help you add some cool new tools to your Solana toolbox.

Today what we are building is an app that can generate a "digital business card" live in your browser, mint it as a compressed NFT (cNFT), and airdrop it to any Wallet or SNS (.sol) you want.

Check out the live demo here: [https://solana-biz-cards-ruddy.vercel.app/](https://solana-biz-cards-ruddy.vercel.app/)

We will be building a *simplified* version of a cNFT minter using Helius' API. This will allow us to mint/airdrop cNFTs without worrying about the technical side of things like creating a merkle tree and managing it. 

**But have no fear**, if you would like a tutorial that dives into the technical side of cNFTs and how to create the whole process from scratch. **Then you are in luck**, swissDAO also has a tutorial for that here -> ([SolanaPay/cNFT Build](https://github.com/swissDAO/solana-pay-cnfts)) where we not only teach you how to create your own collection, but also combine it with Solana Pay for practical use.

📌 Have any questions? Reach out to us. ➜ [swissDAO Telegram](https://t.me/+8kAfO-simRkxY2Jh) 


### What are our objectives?

- [ ] Generate a digital business card as a SVG in your browser
- [ ] Convert that SVG to a PNG and upload it to Irys (formerly Bundlr)
- [ ] Mint the PNG as a cNFT using Helius
- [ ] Display all of the business card cNFTs in a gallery
- [ ] Deploy our site Live to the world and allow people to mint business cards **without connecting their wallet**

Once all of this is said and done, you will have a solid grasp on cNFTs and how to **quickly** generate them.

### Other possible use-cases
- Minting a scorecard on-chain when a user completes a game
- Dynamic Proof of Attendance (POAP), so each cNFT can contain user details of the Original Attendee
- Personalized Receipts/Coupons

The possibilities are endless because you can customize not only the attributes, but the displayed image of the cNFT as well!

### Pre-Requisites

We will be using TypeScript and Next.JS to build our app and Vercel to deploy.

With that being said, if you don't know TypeScript, but are familiar with JavaScript it's ok. TypeScript is just a *suped* up version that helps catch/prevent errors before you run into them in the browser.

If you are unfamiliar with Next.JS, again no worries, just follow along. And I'll explain later during deployment on why I prefer to use Vercel for this build. ***Spoiler alert*** it has a `temp` directory, amongst other strengths.

Now, let's get started!