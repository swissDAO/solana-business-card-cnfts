### Convert and Submit

Now that we have the majority of our Front-End working, it's time to send our SVG to the server and actually make it a compressed NFT. To do so we are going to first serialize our SVG into a string and include it in the body of our API request along with the info we are including.

Locate your `convertAndSubmit` function on your `page.tsx` and let's edit it to like this:

```
/app/page.tsx

async function convertAndSubmit() {
    const image = document.getElementById(selectedSvg);
    const svg = new XMLSerializer().serializeToString(image!);
    
    const airdropTo = JSON.parse(data).airdropTo;
    const airdrop_publickey = await checkForSolanaDomain(airdropTo);
    console.log("airdrop_publickey", airdrop_publickey);
    
    console.log("minting business card");
    const res = await fetch("/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      const res = await fetch("/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info: data,
        image: svg,
      }),
    });
  }
 ```
 
 What we are doing is pretty straightforward:
 - Grabbing the selectedSvg container
 - Converting it into a string
 - Checking for a Solana Domain name
 - Sending the info and image off to our `/api/mint` endpoint

Now when you implement this code, you will receive an error because `checkForSolanaDomain` does not exist as a function. So let's fix that.

Above your `convertAndSubmit` function let's create `checkForSolanaDomain`:

```
/app/page.tsx

async function checkForSolanaDomain(address: string) {
    // if the airdropTo address has the last 4 characters of .sol then getPublicKeyFromSolDomain else return the airdropTo address
    if (address.slice(-4) === ".sol") {
      const solana_domain = address;
      const solana_domain_owner =
        await getPublicKeyFromSolDomain(solana_domain);
      return solana_domain_owner;
    } else {
      return address;
    }
}
```

Here we are doing a quick check to see if the `airdropTo` contains `.sol` at the end, if it doesn't we simply return the address. If it does, we send it off to another function `getPublicKeyFromSolDomain()`. 

Solana domains are created using [Bonfida's naming service](https://docs.bonfida.org/collection/naming-service/an-introduction-to-the-solana-name-service), these allow people to transact with a name like Matt.sol instead of a long PublicKey address. So to give our app some flexibility we are including this as a feature to make airdropping the business cards easier. 

In order for this to work we will add another import and write the function about `checkForSolanaDomain()`.

```
/app/page.tsx

import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";

async function getPublicKeyFromSolDomain(domain: string): Promise<string> {
    const { pubkey } = await getDomainKeySync(domain);
    const owner = (
      await NameRegistryState.retrieve(SOLANA_CONNECTION, pubkey)
    ).registry.owner.toBase58();
    console.log(`The owner of SNS Domain: ${domain} is: `, owner);
    return owner;
}
```

Basically if our app recognizes a SNS domain with `checkForSolanaDomain` we then cross-reference it with Bonfida's Name Registry to obtain the PublicKey associated with it and return it to our `convertAndSubmit` function.

Once you have those 2 new functions and new import line included in your code, you should currently have no errors. If you do, then cross reference your code with the solution from this section [here](https://github.com/swissDAO/solana-business-card-cnfts/tree/form/svg).