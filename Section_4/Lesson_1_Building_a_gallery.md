## 🖼️ Building a Gallery

Congrats! You are a cNFT wizard 🧙‍♂️!!! A lot of people have heard of compressed NFTs, but not many know how to make them. You my friend, are a head of the curve!

Now let's show them off by building a gallery!

To do this we will be using the Helius API call `getAssetsByCreator`, this is why in the `mint.tsx` we assigned the creator address to the wallet saved in our `.env`. 

The reasoning behind this is because we are using Helius' simple `mintCompressedNft` call where Helius manages the merkle tree and ANYONE can add to it, not all of the cNFTs on that merkle tree belong to us. So if we were to just display all of the cNFTs on that tree we would see something like [this](https://xray.helius.xyz/account/5TYT7EAzT9XszzAo4ki6wKhzk3Zu4RJobt5ioV76yKrn?network=mainnet). Those are all of the cNFTs currently attached to this merkle tree.


### Building the component

So let's get started with the gallery. The first thing we want to do is create a new file in our component directory and call it `gallery.tsx`.

Inside this component let's start by adding the following:

```
/components/gallery.tsx

import { useState, useEffect } from "react";

const Gallery = () => {
    const [biz_cards, setBizCards] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return(
        <div>
            <h1>Gallery</h1>
        </div>
    )
}

export default Gallery;
```

Our objective for this component is pretty simple:
- Call on `getAssetsByCreator`
- Store the returned data in our `bizCards` array
- Map through and display each `bizCard`

I'll give you the Helius' API call here, but I want to challenge you to complete the rest of your code on your own. As always, if you get stuck you can refer to the solution at the end of this segment :-).

```
/components/gallery.tsx

const check_for_biz_cards = async (address: string) => {
    const url = process.env.NEXT_PUBLIC_RPC_URL;

    const response = await fetch(url!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "helius-test",
        method: "getAssetsByCreator",
        params: {
          creatorAddress: address, // Required
          onlyVerified: false, // Optional
          page: 1, // Starts at 1
          limit: 1000, // Max 1000
        },
      }),
    });
    const { result } = await response.json();
    console.log("Assets by Creator: ", result.items);

    setBizCards(result.items);
    setLoading(false);
};

useEffect(() => {
    check_for_biz_cards(process.env.NEXT_PUBLIC_WALLET_ADDRESS!);
}, []);
```

One thing that tripped me up here when building this was the `onlyVerified` optional param. Here we need to flag this as `false` because Helius' merkle tree for this `helius-test` is not verified. If you were querying your cNFTs from your own merkle tree, this may not be necessary.

Once you think you have the data and display correctly added (or so you think ;-) ), let's go back to our `page.tsx` and import the Gallery.

What we are going to do is build a button for it along with a `useState` boolean that tells our app to either display or not display the gallery.

```
/app/page.tsx

import Gallery from "@/components/gallery";

const Page: React.FC = () => {
    const [showGallery, setShowGallery] = useState<boolean>(false);
    
    ...rest of code...
    
    return(
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowGallery(!showGallery)}
            >
                {showGallery ? "Hide Gallery" : "Show Gallery"}
            </button>
            {showGallery && <Gallery />}
            
            ...rest of code...
        </div
    )
}

export default Page;

```

Now, one thing to note here is if we keep the code like this and display the gallery then there is A LOT happening on our screen. So let's wrap the rest of the display with `{!showGallery && ()}` which tells our code to only display the rest of the code if `showGallery === false`. 

Make sense? 

If you run `npm run dev` you should now see this on your main page:

![Screenshot 2023-11-07 at 12.25.36 PM.png](https://hackmd.io/_uploads/SJAn05v7T.png)

And when you click the "Show Gallery" button you should see all of your minted business cards displayed similar to:

![Screenshot 2023-11-07 at 12.29.47 PM.png](https://hackmd.io/_uploads/ryin1swXT.png)


Nice job friend!! If you are having issues, check the solution code here.