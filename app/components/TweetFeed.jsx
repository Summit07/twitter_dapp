"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const TweetFeed = () => {
  const router = useRouter();
  const { address, user, tweet, tweetContract, profileContract, status } =
    useSelector((state) => state.wallet);

  const [username, setName] = useState(false);

  async function handelsubmit(e) {
    e.preventDefault();
    // await tweetContract.methods.createTweet(name).send({ from: account });  //WEB3 calling
    await tweetContract.createTweet(username);
    router.refresh();
    setName("");
    // router.push("/tweetfeed");

    // await profileContract.setProfile(username, bio); // Ether js calling
  }
  async function handelLike(tweet, id) {
    console.log(tweet, id);
    // await tweetContract.methods.createTweet(name).send({ from: account });  //WEB3 calling
    await tweetContract.likeTweet(tweet, id);
  }
  async function handelDisLike(tweet, id) {
    console.log(tweet, id);
    // await tweetContract.methods.createTweet(name).send({ from: account });  //WEB3 calling
    await tweetContract.unlikeTweet(tweet, id);
  }

  return (
    <>
      <div>
        <form
          onSubmit={handelsubmit}
          className="flex flex-col justify-center items-center"
        >
          <label>Tweet Post</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="username"
            className="w-full"
            required
          />
          {/* <label>Bio</label>
          <input
            type="text"
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            required
          /> */}
          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">Tweet</button>
        </form>
      </div>
      {tweet.map((tweet) => {
        return (
          <>
            <div className="flex justify-between items-center flex-row m-6">
              <div className=" text-black">{tweet?.content}</div>
              {/* <div className=" text-black">{tweet?.likes?.toString()}</div> */}
              <button
                className="bg-teal-500 p-2 px-4 rounded-xl m-2"
                onClick={() => handelLike(tweet.author, tweet.id)}
              >
                Like
              </button>
              {tweet?.likes?.toString()}
              <button
                className="bg-pink-500 p-2 px-4 rounded-xl m-2"
                onClick={() => handelDisLike(tweet.author, tweet.id)}
              >
                Unlike
              </button>
              <div className=" text-black ">{tweet?.timestamp?.toString()}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TweetFeed;
