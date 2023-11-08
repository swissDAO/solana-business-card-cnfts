### SVG Samples

If you scroll back to the top of our code you will see we import several sample SVGs from our `components` directory.

```
/app/page.tsx

import Sample from "../components/sample";
import Sample_Style2 from "@/components/sample_style2";
import Sample_Style3 from "@/components/sample_style3";
import Sample_Style4 from "@/components/sample_style4";
```

If you open up these SVGs you will see that the `Sample` expects a certain set of imports:

```
/components/sample.tsx

const Sample = ({
  firstName,
  lastName,
  jobTitle,
  phone,
  email,
  website,
}: {
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
}) => (
    ...
);

export default Sample;

```

What we want to do here is render the imported `Sample` into our code with the expected inputs in order to display the Sample SVG properly.

So let's head back to our `page.tsx` and below our `renderForm()` in the `return` let's include the following:

```
/app/page.tsx

...rest of code...

return(
    ...rest of code...
    
    <div className="flex flex-col gap-4 justify-center align-center md:flex-col sm:flex-col xs:flex-col w-fit self-center">
      <div
        className="flex flex-col gap-4 justify-center align-center cursor-pointer"
        style={{ border: selectedSvg === "svg-container" ? "1px solid yellow" : ""}}
        onClick={() => {setSelectedSvg("svg-container")}}
      >
        <span className="text-white font-bold pl-5">
          Style 1
        </span>
        <Sample
          firstName={data ? JSON.parse(data).firstName : ""}
          lastName={data ? JSON.parse(data).lastName : ""}
          jobTitle={data ? JSON.parse(data).jobTitle : ""}
          phone={data ? JSON.parse(data).phone : ""}
          email={data ? JSON.parse(data).email : ""}
          website={data ? JSON.parse(data).website : ""}
        />
      </div>
    </div>
    
    ...rest of code...
)};

export default Page;

```

One thing to note here is we are running a ternary operator that is telling the code "if there is data parse the JSON and for 'x' and display it or else display nothing". This is what helps our sample dynamically update when info is entered into the form.

Now when you run `npm run dev` and fill out the form, you should see your Sample update!

![Screenshot 2023-11-06 at 1.02.38 PM.png](https://hackmd.io/_uploads/ry61LUUXp.png)

You'll notice that when you click it, the yellow border appears. This happens because of the `onClick()` is setting this SVG to our `selectedSvg` state.

Go ahead and follow the same format for `Sample_Style2`, `Sample_Style3`, and `Sample_Style4`. If you are unsure how to do so, no worries give it a shot and compare your code with the solution at the end of this section.

For the `onClick()` make sure you structure it to `setSelectedSvg("svg-container-style2");` and so forth so we process the right SVG on the server side.

Once you get the other samples included, save your code (at this point if you don't have auto-save turned on I sugesst you toggle it on, it makes life much easier!), and run `npm run dev`.

You should now be seeing all 4 samples on page.

![Screenshot 2023-11-06 at 1.12.32 PM.png](https://hackmd.io/_uploads/B1lrOIUQ6.png)
![Screenshot 2023-11-06 at 1.13.05 PM.png](https://hackmd.io/_uploads/BJpIdI8X6.png)

Nice job! Now let's implement one more thing before we work on the `convertAndSubmit()` function. At the top of our code you will see we also import `Svg`, `Svg_style2`, and so forth. Now you are probably wondering what the difference between these and the Samples are and the answer is: styling. In order to make the sizing and border better for display in our app, I seperated the Samples and actual SVGs submitted the the server. Other than that all the info is the same. So in your `return()` let's include the following:

```
/app/page.tsx

...rest of code...

return(
    ...rest of code...
    
    {renderForm()}
    <Svg
      firstName={data ? JSON.parse(data).firstName : ""}
      lastName={data ? JSON.parse(data).lastName : ""}
      jobTitle={data ? JSON.parse(data).jobTitle : ""}
      phone={data ? JSON.parse(data).phone : ""}
      email={data ? JSON.parse(data).email : ""}
      website={data ? JSON.parse(data).website : ""}
    />
     
    ...rest of code...
)
}

export default Page;
```
Follow the same structure for SVG_Style2-4, but don't forget the difference in 3 & 4 ;-).

Now when you save and run the code you will see nothing changed, and that's because of this line in the parent `div` of the `svg`:

```
style={{ width: "660px", height: "660px", display: "none" }}
```

Here we are telling the browser not to display it. But you might be wondering, "So how does the app know what to send to the server for minting?" Wise question. Each SVG is still "rendered", per say, in the app it's just not being displayed. And remember how I said to structure the `onClick()` to `setSelectedSvg`? Well if you look at the code of each `svg` they all have id's that look like:

```
id="svg-container"
```

So even though the actual svg is not displayed, it's still present and we will structure our `convertAndSubmit()` function to grab the selected one with all of the data.

Cool stuff. Let's proceed.