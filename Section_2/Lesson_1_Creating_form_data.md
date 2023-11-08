## ⌨️ Let's Get Started!

Once you have changed all of the values in your `example.env` make sure you rename the file to just `.env`.

Now you have everything you need to get started so let's open up our terminal and from the root of your repo let's run:

```
npm install
```
Once that is complete go ahead and run the following command to make sure all of the dependencies installed correctly.
```
npm run dev
```
Navigate to `http://localhost:3000/` and you should see the following:
![Screenshot 2023-11-06 at 11.28.18 AM.png](https://hackmd.io/_uploads/B1X0JSUQT.png)

Cool, now let's implement our form next.

### Form Data

Let's switch back to our code and navigate to `/app/page.tsx`. To handle the collection of the data we will be sending to the back-end, we will be using React's `useForm`, a simple way to create and batch form data.

Because we are building business cards, we are going to collect the standard info that is listed on a business card:
- First/Last Name
- Job Title
- Company
- Email
- Phone Number
- Website

And because we will be offering variations that include less "private info" we will also include:

- Twitter Handle
- Telegram Handle

All of the info above will be displayed on the image of the cNFT and stored as attributes as well.

Lastly, we will want to include both the:

- Air Drop to Address
- Creator Address

The Air Drop to address will tell Helius where to send the cNFT while the Creator Address will provide a reference to your wallet and also store it as an attribute.

Ok, now that we have the fields we know we want, let's begin to implement them. 

First thing we need to do is install the `react-hook-form` package. In your terminal run:

```
npm install react-hook-form
```

At the top of our code let's now add the import:
```
import { useForm } from "react-hook-form";
```

And now where we define the `Page` let's include the following:
```
/app/page.tsx

const Page: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<string>("");
  const [selectedSvg, setSelectedSvg] = useState<string>("svg-container");
  
  ...rest of code...
  
};

export default Page;
```
I've also included a `selectedSvg` state that will be used later, but for now this will help prevent any errors.

Now, if you wanted to generate a "scorecard" instead of a "business card" you might utilize `useState` instead of `useForm` to capture the "score" and "level" of the game while auto-filling the `airDropTo` state with the connected wallet of the game. Again the possibilities are endless, so have fun with it!

Next, let's create the form. Our app comes bootstrapped with Tailwind to make the styling simple and fast, but feel free to use a custom CSS if you prefer.

Locate the `renderForm` function and let's finish building it out. 

```
/app/page.tsx

const renderForm = () => {
    return (
      <form
        className="bg-white sm:max-w-sm shadow-md rounded px-8 pt-6 pb-8 mb-4 items-center justify-center"
        style={{
          width: "60vw",
          justifyContent: "center",
          alignContent: "center",
          overflowX: "hidden",
          alignItems: "center",
          margin: "0 auto",
        }}
        onChange={handleSubmit((data) => setData(JSON.stringify(data)))}
      >
        <div className="mb-2 sm:max-w-sm sm:mx-auto">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("firstName")}
            placeholder="First name"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("lastName")}
            placeholder="Last name"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("jobTitle")}
            placeholder="Job title"
          />
          {selectedSvg === "svg-container" ||
          selectedSvg === "svg-container-style2" ? (
            <>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
                {...register("email")}
                placeholder="Email"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
                {...register("phone")}
                placeholder="Phone"
              />
            </>
          ) : (
            <>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
                {...register("twitter")}
                placeholder="Twitter"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
                {...register("telegram")}
                placeholder="Telegram"
              />
            </>
          )}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("website")}
            placeholder="Website"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("airdropTo")}
            placeholder="Airdrop To"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight sm:max-w-sm sm:mx-auto"
            {...register("creatorAddress")}
            placeholder="Creator Address"
          />
        </div>
      </form>
    );
  };
```

As you can see, we are using `onChange` to update the state of our data.

You might have also noticed this piece as well:
```
{
    selectedSvg === "svg-container" ||
    selectedSvg === "svg-container-style2" ? (
        ...
    ):(
        ...
    )
}
```

This is a ternary operator that is telling our form what to display depending on which SVG template is selected. In this specific case we are telling our form to either display the `Phone Number` & `Email` fields or the `Twitter` & `Telegram` fields depending on which SVG template is selected.

Now let's actually display our form. Head down to the bottom of the `page.tsx` where we have our `return()` and let's render the form below our logo.

```
/app/page.tsx

...

const Page: React.FC = () => {

...rest of code...

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        overflowX: "hidden",
        backgroundColor: "black",
      }}
    >
      <ToastContainer />
      <Logo />
      <div className="flex flex-col gap-4 justify-center">
        {renderForm()}
      </div>
    </div>
  );
};

```

Once we have `{renderForm()}` called in our `return()` let's run our code again and check it out in the browser. **Make sure to save your code first.**

```
npm run dev
```

In your browser, your page should look like this:

![Screenshot 2023-11-07 at 10.39.10 AM.png](https://hackmd.io/_uploads/H1gRHKv7p.png)

Awesome job so far! Now let's display our SVGs so we can see a sample of what we are creating!