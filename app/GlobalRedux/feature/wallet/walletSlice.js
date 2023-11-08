const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// import Web3 from "web3";
// import twitterAbi from "../../../contract/tweeter.json";
// import profileAbi from "../../../contract/profile.json";
// import { ethers } from "ethers";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: [],
    user: [],
    tweet: [],
    tweetContract: [],
    profileContract: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setWallet(state, action) {
      state.address = action.payload;
    },
    setData(state, action) {
      state.user = action.payload;
    },
    setTweet(state, action) {
      state.tweet = action.payload;
    },
    settweetContract(state, action) {
      state.tweetContract = action.payload;
    },
    setprofileContract(state, action) {
      state.profileContract = action.payload;
    },
    // setWallet(state, action) {
    //   state.data = action.payload;
    // },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchProducts.pending, (state, action) => {
  //       state.status = STATUSES.LOADING;
  //     })
  //     .addCase(fetchProducts.fulfilled, (state, action) => {
  //       state.data = action.payload;
  //       state.status = STATUSES.IDLE;
  //     })
  //     .addCase(fetchProducts.rejected, (state, action) => {
  //       state.status = STATUSES.ERROR;
  //     });
  // },
});

export const {
  setWallet,
  setStatus,
  setData,
  setTweet,
  settweetContract,
  setprofileContract,
} = walletSlice.actions;
export default walletSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }

// export const walletExecute = createAsyncThunk("wallet/fetch", async () => {
//   if (typeof window.ethereum !== "undefined") {
//     // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//     const tempWeb3 = new Web3(window.ethereum);
//     const acc = await tempWeb3.eth.getAccounts();
//     dispatch(setWallet(acc[0]));
//     // console.log("Account", acc[0]);
//     // setWallet(acc[0]);
//     const profileInstance = new tempWeb3.eth.Contract(
//       profileAbi,
//       profileContractAddress
//     );
//     // setProfileContract(profileInstance);
//     dispatch(setprofileContract(profileInstance));

//     const tweeterInstance = new tempWeb3.eth.Contract(
//       twitterAbi,
//       twitterContratAddress
//     );
//     // setTweeterContract(tweeterInstance);
//     dispatch(settweetContract(tweeterInstance));
//   } else {
//     console.log("Please install MetaMask");
//   }
// });
