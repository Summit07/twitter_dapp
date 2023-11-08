"use client";
import React from "react";
import Web3 from "web3";
import twitterAbi from "../contract/tweeter.json";
import profileAbi from "../contract/profile.json";
import { ethers } from "ethers";
import { useEffect, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWallet,
  setData,
  setprofileContract,
  settweetContract,
} from "../GlobalRedux/feature/wallet/walletSlice";
import { setUser } from "../GlobalRedux/feature/users/userSlice";
import { setProfile } from "../GlobalRedux/feature/profile/profileSlice";

const twitterContratAddress = "0xb181f9a0fe9dec81656307acb53bcf6c5d13ae65";
const profileContractAddress = "0x85b70c96c58a68c79722208b738b2bb258b24e0a";

const Connect = () => {
  const dispatch = useDispatch();
  const { address, user, tweetContract, profileContract, status } = useSelector(
    (state) => state.wallet
  );
  // const { user } = useSelector((state) => state.wallet);
  const [tweet, setTweet] = useState(false);
  const [name, setName] = useState(false);
  const [bio, setBio] = useState(false);
  const [account, setAccount] = useState(false);
  const [ball, setBall] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  // const [profileContracts, setProfileContract] = useState(null);
  // const [tweeterContract, setTweeterContract] = useState(null);

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
        setAccount(accounts[0]);
        setIsConnected(true);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const provider = new Web3(
        //   Web3.givenProvider || "https://sepolia.infura.io/v3/"
        // );
        // setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (!isConnected) {
      connect();
    } else {
      if (typeof window.ethereum !== "undefined") {
        // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        // const tempWeb3 = new Web3(window.ethereum);
        // const acc = await tempWeb3.eth.getAccounts();
        // dispatch(setWallet(acc[0]));
        // const profileInstance = new tempWeb3.eth.Contract(
        //   profileAbi,
        //   profileContractAddress
        // );
        // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
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
        console.log(
          "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
          ethers.formatEther(balance)
        );
        setSigner(tempSigner);

        dispatch(setWallet(address));

        let profileInstance = new ethers.Contract(
          profileContractAddress,
          profileAbi,
          tempSigner
        );
        // setProfileContract(profileInstance);

        dispatch(setprofileContract(profileInstance));
        // const tweeterInstance = new tempWeb3.eth.Contract(
        //   twitterAbi,
        //   twitterContratAddress
        // );

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
  }

  async function getProfile() {
    const profile = await profileContract.getProfile(address);

    let getTweet = await tweetContract.getAllTweets(address);
    setTweet(getTweet[0]);
    dispatch(setData(profile));
  }

  async function handelsubmit(e) {
    e.preventDefault();
    // await tweetContract.methods.createTweet(name).send({ from: account });
    await profileContract.methods.setProfile(name, bio).send({ from: address });
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
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
            Connected to :- {address} ---{account} ===== {ball}
          </div>
          <div className=" w-full p-4 text-black">{user?.displayName}</div>
          <div className=" w-full p-4 text-black">{user?.bio}</div>
          <div className=" w-full p-4 text-black">{tweet?.content}</div>
          <div className=" w-full p-4 text-black bg-red-400">
            {tweet?.likes?.toString()}
          </div>
          <div className=" w-full p-4 text-black bg-yellow-400">
            {tweet?.timestamp?.toString()}
          </div>
          <form onSubmit={handelsubmit}>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
            />
            <label>Bio</label>
            <input
              type="text"
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              required
            />
            <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
              Submit
            </button>
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Connect;
