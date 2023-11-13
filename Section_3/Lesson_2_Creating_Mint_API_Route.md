## 🎫 Let's get minting

The first thing we are going to do is set up our basic server functions and establish a connection to Irys inside our `mint.tsx` API endpoint. If you are unfamiliar on how API routes work with Next.JS you can review the details [here](https://nextjs.org/docs/pages/building-your-application/routing/api-routes).

```
/pages/api/mint.tsx

...rest of code...

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const fileName = uuidv4();
      const privateKeySecret = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
      const url = process.env.NEXT_PUBLIC_RPC_URL!;
      const image = req.body.image;
      const info = JSON.parse(req.body.info);
      const {
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        twitter,
        telegram,
        website,
        airdropTo,
        creatorAddress,
      } = info;

      const getIrys = async () => {
        const url = "https://node1.irys.xyz";
        const token = "solana";
        const privateKey = privateKeySecret;

        const irys = new Irys({
          url, // URL of the node you want to connect to
          token, // Token used for payment
          key: privateKey, //SOL private key in base58 format
          // config: { providerUrl: providerUrl }, // Optional provider URL, only required when using Devnet
        });
        return irys;
      };
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error" });
    }
  }
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  } else if (req.method === "POST") {
    return await post(req, res);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
```

Here we are setting up our our `POST` call, as you can see at the bottom, this API route will only be used as a `POST` method, any other type we will return "Method not allowed." 

To start it off we are assigning a random string to our `fileName` using `uuidv4()`, which we will then reference in our upload later. 

Next we go ahead and call in our `privateKey` from our `.env`, remember this must be in Base58 format for both Irys and Helius later. If you exported it into a Unit8Array just make sure you convert that to Base58 or you will receive an error while trying to use it.

After that we destruct our info from `req.body` to reference the data we are passing in.

Lastly we create a connection to Irys using `getIrys`, there are [different node's of Irys](https://docs.irys.xyz/overview/nodes) you can use if you prefer.

Now that we have the basis setup, let's convert and upload our SVG right below `getIrys()`:

```
/pages/api/mint.tsx

const uploadImage = async () => {
    const irys = await getIrys();
    
    // write the image to the vercel tmp directory
    fs.writeFileSync(`/tmp/${fileName}.svg`, image);
    console.log("wrote svg file");
    
    // convert the svg to png with sharp
    await sharp(`/tmp/${fileName}.svg`)
      .resize(500, 500)
      .png()
      .toFile(`/tmp/${fileName}.png`)
      // @ts-ignore
      .then((data) => console.log("data", data))
      // @ts-ignore
      .catch((err) => console.log(err));

    const fileToUpload = `/tmp/${fileName}.png`;
    const token = "solana";
    // Get size of file
    const { size } = await fs.promises.stat(fileToUpload);
    // Get cost to upload "size" bytes
    const price = await irys.getPrice(size);
    console.log(
      `Uploading ${size} bytes costs ${irys.utils.fromAtomic(
        price,
      )} ${token}`,
    );
    // Fund the node
    await irys.fund(price);

    // Upload metadata
    try {
      const response = await irys.uploadFile(fileToUpload);

      console.log(
        `File uploaded ==> https://gateway.irys.xyz/${response.id}`,
      );
      return `https://gateway.irys.xyz/${response.id}`;
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };
  const image_url = await uploadImage();
  

  ...rest of code...
```

I left comments in the code to help explain, but the synopsis is:
- Write the SVG to `/tmp` directory
- Tell `sharp` that we want to convert that file to `.png()`
- Tell `sharp` where to write the converted file
- Get the cost of upload from Irys based on file size
- Fund the Irys node, upload the file, grab the returned URL

🤯**Boom!** You now just converted and uploaded a SVG live from the browser without having to actually store it anywhere besides Irys (which uses areweave).

Now that we have our Image URL, we are ready to mint our compressed NFT.

Below our `const image_url` let's build our `mintCompressedNft` function:

```
/pages/api/mint.tsx

const mintCompressedNft = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "helius-test",
        method: "mintCompressedNft",
        params: {
          name: "Business Card",
          symbol: "swissDAO",
          owner: airdropTo,
          description: "A business card courtesy of swissDAO",
          attributes: [
            {
              trait_type: "Name",
              value: `${firstName} ${lastName}`,
            },
            {
              trait_type: "Job Title",
              value: jobTitle,
            },
            {
              trait_type: "Email",
              value: email || "",
            },
            {
              trait_type: "Phone",
              value: phone || "",
            },
            {
              trait_type: "Twitter",
              value: twitter || "",
            },
            {
              trait_type: "Telegram",
              value: telegram || "",
            },
            {
              trait_type: "Website",
              value: website,
            },
            {
              trait_type: "Creator Address",
              value: creatorAddress,
            },
          ],
          imageUrl: image_url,
          externalUrl: "https://www.swissDAO.space",
          sellerFeeBasisPoints: 6500,
          creators: [
            {
              address: process.env.NEXT_PUBLIC_WALLET_ADDRESS,
              share: 100,
            },
          ],
        },
      }),
    });
    const { result } = await response.json();
    console.log("result", result);
    console.log("Minted asset: ", result.assetId);

    return result;
};

const response = await mintCompressedNft();
return res.status(200).json({
    status: "success",
    assetId: response.assetId,
});

...rest of code...

```

Here we are sending compressed NFT data off to Helius to process, if you are familiar with minting NFTs then it looks pretty similar and that's on purpose. Again, Helius has made this SUPER easy for us which is awesome. 

The key things to note are:
- **owner** : this is where the cNFT is going to be minted/airdropped to
- **Email/Phone/Twitter/Telegram** : here we use the `||` to subsitute in a "" if these items are not chosen. This will prevent any errors occuring from them being blank.
- creators -> address : this is the address we will use later to display all of our minted cNFT's in the Gallery.
- **result.assetId** : we are specifically returning this item because that is what we will use on Helius' X-Ray to find our newly minted cNFT.

Again, these data points are pretty much standard with NFTs and you can read more about them [here](https://www.quicknode.com/guides/solana-development/nfts/solana-nft-metadata-deep-dive).

Awesome! Our Mint API route is complete. One last thing to do before we get to minting, head back to your `page.tsx` and let's add a button to trigger the `convertAndSubmit()` function.

Right below the `<div></div>` containing your Sample SVGs let's include this code

```
/app/page.tsx

{selectedSvg != "" && (
    <div className="flex justify-center">
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => convertAndSubmit()}
      >
        Create cNFT
      </button>
    </div>
)}

```

This instructs our app to only display the mint button when a SVG has been selected. If you want, you can take it a step further and only display after all data point has been filled out.

Now it's time to give it a test run!

🏎️💨 Open up your terminal again, start it up and take it for a spin!
```
npm run dev
```

After selecting a SVG template and filling out the data, press `Create cNFT` and watch your terminal go to work! If all is good, you should see the following comments in your terminal (size and prices may vary).

![Screenshot 2023-11-06 at 5.42.12 PM.png](https://hackmd.io/_uploads/S1EOvcIXp.png)

Nice job, you minted a cNFT!!! You can check out the Irys upload from that gateway link or even take that `assetId` and plug it into [Helius' X-Ray Explorer](https://xray.helius.xyz/) to view it.

If you are getting errors, make sure you have some SOL in the wallet that is tied to the private key and double check the solution code [here](https://github.com/swissDAO/solana-business-card-cnfts/tree/mintApi) for any errors.