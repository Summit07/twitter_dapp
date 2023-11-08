"use client";
import React from "react";

import twitterAbi from "../contract/tweeter.json";
import profileAbi from "../contract/profile.json";
import { ethers } from "ethers";
import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setWallet,
  setData,
  setTweet,
  setprofileContract,
  settweetContract,
} from "../GlobalRedux/feature/wallet/walletSlice";
import { setUser } from "../GlobalRedux/feature/users/userSlice";
import { setProfile } from "../GlobalRedux/feature/profile/profileSlice";
import Profile from "./Profile";
import TweetFeed from "./TweetFeed";

const twitterContratAddress = "0xb181f9a0fe9dec81656307acb53bcf6c5d13ae65";
const profileContractAddress = "0x85b70c96c58a68c79722208b738b2bb258b24e0a";

const Connect = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { address, user, tweet, tweetContract, profileContract, status } =
    useSelector((state) => state.wallet);
  // const { user } = useSelector((state) => state.wallet);
  // const [tweet, setTweets] = useState(false);
  const [name, setName] = useState(false);
  const [bio, setBio] = useState(false);

  const [ball, setBall] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // setAccount(accounts[0]);
        setIsConnected(true);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const tempProvider = new ethers.BrowserProvider(window.ethereum);

      tempProvider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
      // setProvider(tempProvider);

      let tempSigner = await tempProvider.getSigner();
      let address = await tempSigner.getAddress();
      let balance = await tempProvider.getBalance(address);
      setBall(ethers.formatEther(balance));
      console.log(address);
      console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSS", ethers.formatEther(balance));
      setSigner(tempSigner);

      dispatch(setWallet(address));

      let profileInstance = new ethers.Contract(
        profileContractAddress,
        profileAbi,
        tempSigner
      );
      // setProfileContract(profileInstance);
      dispatch(setprofileContract(profileInstance));

      let tweeterInstance = new ethers.Contract(
        twitterContratAddress,
        twitterAbi,
        tempSigner
      );
      // setTweeterContract(tweeterInstance);
      dispatch(settweetContract(tweeterInstance));
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function getProfile() {
    const profile = await profileContract.getProfile(address);
    let getTweet = await tweetContract.getAllTweets(address);
    console.log(getTweet);
    // setTweets(getTweet[0]);
    dispatch(setTweet(getTweet));
    // console.log(tweet, getTweet);
    dispatch(setData(profile));
    // router.push("/tweetfeed");
  }

  async function handelsubmit(e) {
    e.preventDefault();
    // await tweetContract.methods.createTweet(name).send({ from: account });  //WEB3 calling
    await tweetContract.createTweet(name);
    // await profileContract.setProfile(name, bio); // Ether js calling
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          <span className="bg-green-500 p-2 px-4 rounded-xl m-2">
            "Connected! "
          </span>
        ) : (
          <button
            onClick={() => connect()}
            className="bg-cyan-400 p-2 rounded-xl px-4"
          >
            Connect to Wallet
          </button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? (
        <>
          <button
            onClick={() => execute()}
            className="bg-orange-500 p-2 px-4 rounded-xl m-2"
          >
            Execute
          </button>
          <button
            onClick={() => getProfile()}
            className="bg-teal-500 p-2 px-4 rounded-xl m-2"
          >
            Display name
          </button>
          <div className=" w-full p-4 text-black">
            Connected to :-
            {address ? user?.displayName : address} ==={address}=== {ball} ===
            Bio : - {user?.bio}
          </div>
          {!user?.displayName ? <Profile /> : ""}
          {user?.displayName && <TweetFeed />}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Connect;
