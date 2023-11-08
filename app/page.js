import Image from "next/image";
import MetaMask from "./components/Metamask";
import Connect from "./components/Connect";
import Profile from "./components/Profile";
import ReduxProviders from "./GlobalRedux/storeProvider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      <Connect />
    </div>
  );
}
