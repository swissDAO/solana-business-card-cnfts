## 💻 Grabbing the Essentials

There are a few things we will set up first before we start hacking away.

### Item #1
**Fork the repo.** This will contain all of the starter code that we need to begin building. **Make sure you uncheck**  `Copy the main branch only` because we will be begin building from the `starter` branch.

![Screenshot 2023-11-06 at 10.48.32 AM.png](https://hackmd.io/_uploads/Sk0OLE87a.png)

Once you have the repo forked, you can clone it down to your local machine. Make sure you switch to the `starter` branch by running the command:
```
git checkout -b starter
```

Your current file structure should look like this:

![Screenshot 2023-11-06 at 10.53.59 AM.png](https://hackmd.io/_uploads/S14awNLXp.png)

From here you will need to open up your `example.env` and add a few items. If you do not have a Solana Browser Wallet or Helius API key, then follow the next 2 items. If you do then skip over it and add the values.

### Item #2 
**Solana Browser Wallet.** My go to for this is Phantom Wallet, but you can use whatever you prefer. We will be exporting the private key (base58 version needed), so I suggest creating/using a **burner** wallet so you don't accidently upload anything sensitive to GitHub and get drained 😓.

[Phantom Wallet](https://phantom.app/)

### Item #3
**Helius API Key/RPC.** As mentioned before, we will be using a simplified version of minting our cNFTs and to do so we'll be using Helius so head on over, connect your wallet and get the goods.

No need to sign up for any plan, the free **Hacker Plan** will be enough for this build.

[Helius Portal](https://www.helius.dev/)

**Once you have all 3 items above it's time to start hacking!**