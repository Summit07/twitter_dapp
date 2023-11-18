"use client";
import Image from "next/image";

import { ethers } from "ethers";
// import Profile from "./components/Profile";
// import ReduxProviders from "./GlobalRedux/storeProvider";
import { useEffect, useState } from "react";

export default function MetaMask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true);
    }
    // setIsMetamaskInstalled(!!window.ethereum);
  }, []);

  async function handleMetamaskLogin() {
    try {
      // Check if Metamask is installed
      if (!isMetamaskInstalled) {
        throw new Error("Metamask is not installed");
      }

      // Request the user's Ethereum address
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await ethereum.request({
        method: "eth_requestAccounts",
      });
      // await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // let tempSigner = await tempProvider.getSigner();
      const addresss = await signer.getAddress();
      setAddress(addresss);

      // Authenticate the user on your backend server and retrieve a JWT token
      // const response = await fetch("/api/nonce", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(addresss),
      // });
      // // console.log(response);
      // if (!response.ok) {
      //   const error = await response.json();
      //   console.log(error, "EEEEEEEEEEEEEEEEEEEEEEEE", response);
      // } else {
      //   const resp = await response.json();
      //   const nonce = resp.message;
      //   console.log(nonce);

      //   const signedMessage = await signer.signMessage(nonce);
      //   const data = { signedMessage, nonce, address };
      //   const authResponse = await fetch("/api/login", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   let token = await authResponse.json();
      //   console.log(token);

      //   //const { token } = await response.json();

      //   // Store the JWT token in local storage
      //   localStorage.setItem(address, token.token);

      //   // Redirect the user to the protected route
      //   window.location.href = "/protected-route";
      // }
    } catch (error) {
      console.error(error);
      alert("Failed to login with Metamask");
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <Connect /> */}
      <button onClick={() => handleMetamaskLogin()}>Address : {address}</button>
    </div>
  );
}
