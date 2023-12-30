"use client";
import { useEffect } from "react";
import { NavigationButtons } from "../components/NavigationButtons.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  deleteCardAsync,
} from "../lib/features/creditCardSlice/creditCardSlice.js";
import CardLayout from "../components/CardLayout.jsx";

const Cards = () => {
  const state = useSelector((state) => state.creditCardSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleDeleteCard = async (cardNumber) => {
    try {
      await dispatch(deleteCardAsync(cardNumber));
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  return (
    <div className="w-[100vw] min-h-screen flex flex-col items-center bg-slate-300">
      <section className="flex justify-center gap-5 py-10 w-full flex-wrap">
        {state?.status == "success" &&
          state?.cardsData?.map((item, index) => {
            return (
              <CardLayout
                key={index}
                Name={item.Name}
                Number={item.Number}
                Date={item.Date}
                Type={item.Type}
                Delete={() => handleDeleteCard(item.Number)}
              />
            );
          })}
      </section>
      <NavigationButtons />
    </div>
  );
};

export default Cards;
