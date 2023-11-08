"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setprofileContract } from "../GlobalRedux/feature/wallet/walletSlice";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profileContract, tweetContract } = useSelector(
    (state) => state.wallet
  );

  const [username, setName] = useState(false);
  const [bio, setBio] = useState(false);
  async function handelsubmit(e) {
    e.preventDefault();
    // await tweetContract.methods.createTweet(name).send({ from: account });  //WEB3 calling
    await tweetContract.createTweet(username);

    router.push("/tweetfeed");

    // await profileContract.setProfile(username, bio); // Ether js calling
  }

  return (
    <>
      <div>
        <form
          onSubmit={handelsubmit}
          className="flex flex-col justify-center items-center"
        >
          <label>Tweet</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="username"
            className="w-full"
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
      </div>
    </>
  );
};

export default Profile;
