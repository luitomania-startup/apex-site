import { RootState } from "./../index";
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import {
    deleteOffer,
    getAllOfferList,
    getOfferById,
    uploadOffer,
} from "../../../routes/Offers/server";
import FormData from "form-data";

interface OfferType {
  title: string;
  date: string;
  lastDate: string;
  description: string;
  attachmentFlag: boolean;
  attachmentfileName: string;
}

interface IOfferState {
  offers: OfferType[];
  loading: string;
  offerFound: OfferType | {};
  offersCount: number;
}

export const fetchOffers = createAsyncThunk("offer/fetchOffers", async () => {
  const res = await getAllOfferList();
  return res.data;
});

export const fetchOffer = createAsyncThunk(
  "offer/fetchOffer",
  async (id: string) => {
    const res = await getOfferById(id);
    return res.data;
  }
);

export const deleteOfferThunk = createAsyncThunk(
  "offer/deleteOfferThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteOffer(id);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);
export const submitOfferThunk = createAsyncThunk(
  "offer/submitOfferThunk",
  async (newData: FormData
  , {rejectWithValue}) => {
    try {
      const res = await uploadOffer(newData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("");
    }
  }
);

const initialState = {
  offers: [],
  loading: "idle",
  offerFound: {},
  offersCount: 0,
} as IOfferState;

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    clearOfferFound: (state, action) => {
      state.offerFound = {};
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IOfferState>) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload.offers;
        state.offersCount = action.payload.offers.length;
        state.loading = "succeeded";
      })
      .addCase(fetchOffers.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        //console.log(action.payload);
        state.offerFound = action.payload;
        // alert(JSON.stringify(state.offerFound));
      })
      .addCase(fetchOffer.pending, (state, action) => {
        state.loading = "pending";
        // //console.log(state.offerFound);
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteOfferThunk.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.offers = action.payload.offers;
      })
      .addCase(deleteOfferThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })

      .addCase(submitOfferThunk.fulfilled, (state, action) => {
        state.offers = action.payload.offers;
        state.offersCount = action.payload.offers.length;
      })
      .addCase(submitOfferThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearOfferFound } = offerSlice.actions;

export const selectOffers = (state: RootState) => state.offer.offers;
export const selectLoading = (state: RootState) => state.offer.loading;
export const selectOffer = (state: RootState) => state.offer.offerFound;
export const selectOfferCount = (state: RootState) => state.offer.offersCount;

//default export

export default offerSlice.reducer;
