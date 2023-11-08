## 👨‍🎨 Final Touches

Congrats you are officially a Compressed NFT buildoooor!! Now let's add some final touches.

### 🔗 Notify when Complete

You may have noticed `<ToastContainer />` on our main page and 

```
const CustomToastWithLink = (url: string) => (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      View your business card on the blockchain
    </Link>
);
```

This is a more stylistic way to notify the user of things other than using `alert()`. You can check out all the things you can do with Toast [here](https://www.npmjs.com/package/react-toastify).

What we will be using it for is to display a clickable link for the user to check out their newly minted cNFT on Helius' X-Ray Explorer.

In order to do so, we need to adjust our `convertAndSubmit` function to account for a response from our `mint` API route. So below our `fetch` call let's add the following:

```
/app/page.tsx

async function convertAndSubmit(){
    
    ...rest of code...
    
    const response_status = res.status;
    const res_text = await JSON.parse(await res.text());
    console.log("res_text", res_text);
    
    const asset_id = res_text.assetId;
    console.log("asset_id", asset_id);
    
    const xray_url = `https://xray.helius.xyz/token/${asset_id}?network=mainnet`;
    
    if (response_status === 200) {
      console.log("business card minted");
      // get json data from response
      console.log("xray url", xray_url);
      toast.success(CustomToastWithLink(xray_url), {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else if (response_status === 500) {
      console.log("error minting business card");
      toast.error("Error minting business card", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
}
```

What we are doing is waiting for a response from our `mint` API and if it sends back a status of 200 we grab the assetId provided and display it within the `xray_url`. If it's an error we also pass that into the toast message to notify the user.

Now let's try to create a new cNFT and see if it works without having to check the console!

You should see this:

![Screenshot 2023-11-07 at 12.46.27 PM.png](https://hackmd.io/_uploads/Hkuo7jv7T.png)

Nice job! Now you may also notice a big error in your console saying something like: `Warning: React does not recognize the `toastProps` prop on a DOM element.`

This is because of the Toast package and not your code, but it is annoying so if you want to fix it follow these steps:

-Open up your `node_modules` directory and locate `react-toastify`
-Go to `/dist/types/index.ts`
-Find `toastProps` on line 11 and change it to all lowercase

Should now look like this:

```
export interface ToastContentProps<Data = {}> {
    closeToast?: () => void;
    toastprops: ToastProps;
    data?: Data;
}
```

Now when you run it there should be no errors in the console of your browser :-).