import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { obtainCard } from "@/app/services/obtainCard.service";
import { removeCard } from "@/app/services/removeCard.service";

export const deleteCardAsync = createAsyncThunk(
  "creditCardsSlices/deleteCard",
  async (cardNumber) => {
    await removeCard(cardNumber);
    return cardNumber;
  }
);

export const fetchCards = createAsyncThunk(
  "creditCardsSlices/fetchCards",
  async () => {
    try {
      const cards = await obtainCard();


      if (cards) return cards;
    } catch (err) {
      console.alert("error fetching cards", err);
    }
  }
);

const initialState = {
  cardsData: null,
  status: "idle", // 'pending' // 'failed' // 'success'
};

const creditCardsSlice = createSlice({
  name: "creditCardsSlices",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsData = action.payload;
        state.status = "success";
      })
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteCardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCardAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.cardsData = state.cardsData.filter(
          (card) => card.Number !== action.payload
        );
      })
      .addCase(deleteCardAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default creditCardsSlice.reducer;
