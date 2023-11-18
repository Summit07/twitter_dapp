import Image from "next/image";
import MetaMask from "./components/Metamask";
import Connect from "./components/Connect";
import Profile from "./components/Profile";
import ReduxProviders from "./GlobalRedux/storeProvider";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  // const [address, setAddress] = useState("");

  // useEffect(() => {
  //   setIsMetamaskInstalled(!!window.ethereum);
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      <Connect />
      <MetaMask />
      {/* <button onClick={handleMetamaskLogin}>Address : {address}</button> */}
    </div>
  );
}
