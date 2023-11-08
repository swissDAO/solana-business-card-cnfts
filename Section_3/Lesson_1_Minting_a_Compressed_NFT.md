## 👾 Minting a Compressed NFT

Ok now that we have handled most of the Front-End work, it's time to make it interact with our Back-End where all the magic happens.

### Outline

Real quick, let's outline our steps here:
- Receive the data server-side
- Write our SVG image to a the temporary directory
- Convert that SVG image to a PNG using `sharp` and write that to our temporary directory
- Calculate the price of the file upload to Irys then fund Irys
- Upload the PNG image file to Irys and grab the returned URL
- Mint cNFT using Helius' `mintCompressedNft` API endpoint with all of our data and new image URL
- Return the assetId of our newly minted cNFT business card
****

### FAQ's

A few questions you might have:

**Why are we writing to a temporary directory?**

If you just want to run your app locally, you could easily use the file system to write to any directory of your choice. **However**, since we are all about getting off local host and shipping our builds to deployment where it can be used by the masses, the file system can not actually write files to someone's machine. A workaround would be to upload the images to a database then provide that link, but that's more work for us and one more thing to manage.

This is where the `/tmp` directory comes in to play.

[Vercel](https://vercel.com/guides/how-can-i-use-files-in-serverless-functions) and Next.JS make it somewhat simple to use files in a serverless environment by writing to the `/tmp` directory. One thing to note is that the response time from making all of this happen might make Vercel ["timeout"](https://vercel.com/guides/what-can-i-do-about-vercel-serverless-functions-timing-out). If this happens, try upgrading to the free-trial of Vercel's pro version, this will allow your program more time to respond.

**Why are we not using Bundlr?**

If you are familiar with minting NFTs then you have probably heard of Bundlr, this was the go to place to store NFT images. Well, Bundlr has now changed to [Irys](https://irys.xyz/what-is-irys), the premise is the same, but connecting and uploading images is a little different.

We'll walk through the basics of using it here in a second.

**Do I need to know anything about Merkle Trees to create my cNFT?**

No, this is why we are using Helius' `mintCompressedNft` API endpoint. They have create and manage the merkle trees to handle all the cNFTs minted from this API, thus is also why we assign the wallet address from your `.env` as the creator so we can then locate all of the created cNFTs from this app.


**If you have anymore questions feel free to ping me on Twitter ([@_matt_xyz](https://twitter.com/_matt_xyz)) or in the [swissDAO Telegram Channel](https://t.me/+8kAfO-simRkxY2Jh)**

****