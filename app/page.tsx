"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "../components/logo";
import Svg from "../components/svg";
import Svg_Style2 from "@/components/svg_style2";
import Svg_Style3 from "@/components/svg_style3";
import Svg_Style4 from "@/components/svg_style4";
import Sample from "../components/sample";
import Sample_Style2 from "@/components/sample_style2";
import Sample_Style3 from "@/components/sample_style3";
import Sample_Style4 from "@/components/sample_style4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const RPC = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl("mainnet-beta"); //replace with your HTTP Provider from https://www.quicknode.com/endpoints
const SOLANA_CONNECTION = new Connection(RPC);

const Page: React.FC = () => {
  

  const CustomToastWithLink = (url: string) => (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      View your business card on the blockchain
    </Link>
  );

  async function convertAndSubmit() {
    
  }

  const renderForm = () => {
    return (
      <form className="bg-white sm:max-w-sm shadow-md rounded px-8 pt-6 pb-8 mb-4 items-center justify-center"
        style={{
          width: "60vw",
          justifyContent: "center",
          alignContent: "center",
          overflowX: "hidden",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
      </form>
    );
  };

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
    </div>
  );
};

export default Page;
