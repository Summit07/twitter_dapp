const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },

    // setWallet(state, action) {
    //   state.data = action.payload;
    // },
    // setWallet(state, action) {
    //   state.data = action.payload;
    // },
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

export const { setProfile, setStatus } = profileSlice.actions;
export default profileSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

// export const getProfile = createAsyncThunk("profile/fetch", async () => {});
// async function getProfile() {
//   const profile = await profileContract.methods.getProfile(account).call();
//   let getTweet = await tweetContract.methods.getAllTweets(account).call();
//   // getProfile();
//   // console.log(getTweet);
//   setTweet(getTweet[0]);
//   // setData(profile);
//   dispatch(setData(profile));
//   // dispatch(setProfile(profile));
// }

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
