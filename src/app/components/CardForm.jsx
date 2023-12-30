"use client";
import { useState } from "react";
import { LuNfc } from "react-icons/lu";
import { motion } from "framer-motion";
import { UploadCreditCard } from "../services/uploadCreditCard.service";
import Image from "next/image";
import { CardTypeImages } from "../assets/CardTypeImages";

export const CardForm = () => {
  const { Chip, Visa, Mastercard, AmericanExp } = CardTypeImages;
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState("Unknown");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    Number: "",
    Date: "",
    Name: "",
    CVV: "",
  });

  const ClearForm = () => {
    const reset = {
      Number: "",
      Date: "",
      Name: "",
      CVV: "",
    };
    setData(reset);
    setCardType("Unknown");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Number") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue
        .slice(0, 16)
        .replace(/(\d{4})/g, "$1 ")
        .trim();

      setData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));

      detectCardType(numericValue.substring(0, 4));
    } else if (name === "Date") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.slice(0, 4);
      const month = formattedValue.slice(0, 2);
      const year = formattedValue.slice(2, 4);

      const currentYear = new Date().getFullYear() % 100;
      console.log("cy", currentYear);

      if (
        isNaN(month) ||
        isNaN(year) ||
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        year > currentYear + 5
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Fecha incorrecta",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      }
      const formattedDate = `${month} / ${year}`;
      setData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else if (name === "CVV") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.slice(0, 3);

      setData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      const formattedValue = value.replace(/\d{4}(?=\d)/g, "$& ");
      if (name == "CVV") {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
      setData((prevData) => ({
        ...prevData,
        [name]: name == "Number" ? formattedValue : value,
      }));

      if (name == "Number") {
        detectCardType(value.substring(0, 4));
      }
    }
  };

  const detectCardType = (cardNumber) => {
    const regexMastercard = /^5[1-5]/;
    const regexVisa = /^4/;
    const regexAmericanExpress = /^3[47]/;

    if (regexMastercard.test(cardNumber)) {
      setCardType("Mastercard");
    } else if (regexVisa.test(cardNumber)) {
      setCardType("Visa");
    } else if (regexAmericanExpress.test(cardNumber)) {
      setCardType("American Express");
    } else {
      setCardType("Unknown");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (/\d/.test(data.Name)) {
      errors.name = "Este campo solo acepta letras.";
    }
    if (/[a-zA-Z]/.test(data.Number)) {
      errors.number = "Este campo solo acepta numeros.";
    }
    if (cardType == "Unknown") {
      errors.card = "Tarjeta no identificada";
    }
    if (data.Number.length < 19) {
      errors.card2 = "Tarjeta incompleta";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      UploadCreditCard({
        Number: data.Number,
        Name: data.Name,
        CVV: data.CVV,
        Date: data.Date,
        Type: cardType,
      });
      ClearForm();
      setIsFlipped(false);
    }
  };

  const cardTypeColors = {
    Visa: "bg-blue-600",
    Mastercard: "bg-red-600",
    "American Express": "bg-gray-600",
  };
  const defaultColor = "bg-slate-900";

  const cardTypeColor = cardTypeColors[cardType] || defaultColor;

  return (
    <div className="md:w-[680px] h-auto bg-white flex flex-col items-center justify-center rounded-xl border border-black shadow-lg">
      <div className="h-[100px] w-full flex justify-center relative">
        <div className=" sm:w-[520px] w-[390px] sm:h-[310px] h-[230px] absolute rounded-lg shadow-lg bottom-0 flex flex-col items-center justify-between">
          <motion.div
            className="w-full h-full"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className={`w-full flex flex-col justify-evenly h-full p-4 rounded-lg ${cardTypeColor}`}
              style={{ perspective: "1000px" }}
            >
              <div className="flex flex-col gap-y-5 w-full">
                <div className="flex relative items-center gap-4">
                  <h2 className="text-white sm:text-[2rem] text-sm font-bold">
                    monobank
                  </h2>
                  <hr className=" sm:h-8 h-6 w-[1.5px] bg-slate-400" />
                  <p className=" text-slate-400 sm:text-[1.2rem] text-sm">
                    Universal Bank
                  </p>
                  <LuNfc className="text-slate-400  sm:text-[2.5rem] text-2xl absolute end-0 self-center" />
                </div>
                <div className="flex justify-between pe-5 sm:mt-3 mt-1">
                  <Image
                    alt="card"
                    src={Chip}
                    className=" sm:h-14 h-10 w-14 mb-1"
                  />
                  <span className=" text-slate-400 sm:text-[1.2rem] text-xs self-end">
                    world
                  </span>
                </div>
              </div>

              <div
                className="text-slate-400 sm:text-2xl text-sm w-full flex justify-center items-end"
                style={{ letterSpacing: "5px", wordSpacing: "15px" }}
              >
                {data.Number ? data.Number : "#### #### #### ####"}
              </div>
              <div className="w-full flex justify-between">
                <div className="flex flex-col w-[70%] pr-3 gap-y-2">
                  <div className="text-slate-400 w-full flex justify-end mt-2 items-center gap-x-2">
                    <span className="sm:text-[7px] text-[4px]  text-center">
                      VALID
                      <br />
                      THRU
                    </span>
                    <p className="sm:text-lg text-xs">
                      {data.Date ? data.Date : "00/00"}
                    </p>
                  </div>
                  <p
                    className="text-slate-400 sm:text-2xl text-sm uppercase"
                    style={{ letterSpacing: "1px" }}
                  >
                    {data.Name ? data.Name : "YOUR NAME"}
                  </p>
                </div>
                {cardType == "American Express" ? (
                  <Image
                    alt="card"
                    src={AmericanExp}
                    className="sm:h-16 h-10 self-center w-[5em]"
                  />
                ) : cardType == "Visa" ? (
                  <Image
                    alt="card"
                    src={Visa}
                    className=" sm:h-10 h-6 self-center w-[5em]"
                  />
                ) : cardType == "Mastercard" ? (
                  <Image
                    alt="card"
                    src={Mastercard}
                    className=" sm:h-16 h-10 self-center w-[5em]"
                  />
                ) : (
                  <div className="sm:h-16 h-10"></div>
                )}
              </div>
            </motion.div>
            <motion.div
              className={`backside rounded-lg flex flex-col items-center py-8 gap-y-8
             ${cardTypeColor}
              `}
              style={{ transform: "rotateY(180deg)" }}
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
            >
              <div className="w-full h-14 bg-slate-700"></div>
              <div className="w-[90%] h-14 bg-slate-100 flex justify-end items-center px-3">
                <p className=" text-xl">{data.CVV ? data.CVV : "123"}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="py-11 sm:w-[90%] w-[80%]">
        <form
          onSubmit={handleSubmit}
          className="px-10 flex flex-col sm:gap-y-11 gap-y-4"
        >
          <div className="sm:flex justify-between gap-x-10">
            <div className="sm:w-1/2 w-full flex flex-col gap-y-2">
              <label className="font-bold">Número de Tarjeta </label>
              <input
                className="rounded-lg border border-gray-300 h-10 px-2"
                onChange={handleChange}
                name="Number"
                maxLength={19}
                required
                value={data.Number}
              />
              {errors.number && (
                <span className=" text-[12px] text-red-600">
                  {errors.number}
                </span>
              )}
              {errors.card && (
                <span className=" text-[12px] text-red-600">{errors.card}</span>
              )}
              {errors.card2 && (
                <span className=" text-[12px] text-red-600">
                  {errors.card2}
                </span>
              )}
            </div>
            <div className="sm:w-1/2 w-full flex flex-col gap-y-2">
              <label className="font-bold">Fecha Vencimiento </label>
              <input
                className="rounded-lg border border-gray-300 h-10 px-2"
                onChange={handleChange}
                name="Date"
                required
                value={data.Date}
              />
              {errors.Date && (
                <span className="text-red-500 text-sm">{errors.Date}</span>
              )}
            </div>
          </div>
          <div className="sm:flex justify-between gap-x-10">
            <div className="sm:w-1/2 w-full flex flex-col gap-y-2">
              <label className="font-bold">Nombre Titular </label>
              <input
                className="rounded-lg border border-gray-300 h-10 px-2"
                onChange={handleChange}
                name="Name"
                maxLength={20}
                required
                value={data.Name}
              />
              {errors.name && (
                <span className=" text-[12px] text-red-600">{errors.name}</span>
              )}
            </div>
            <div className="sm:w-1/2 w-full flex flex-col gap-y-2">
              <label className="font-bold">CVV </label>
              <input
                className="rounded-lg border border-gray-300 h-10 w-40 px-2"
                onChange={handleChange}
                name="CVV"
                required
                value={data.CVV}
              />
            </div>
          </div>
          <div className="flex gap-x-4">
            <button
              type="submit"
              className=" bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-[6px] rounded-full text-sm"
            >
              agregar tarjeta
            </button>
            <span
              className=" bg-gray-200 hover:bg-gray-300 text-gray-400 px-4 py-[6px] rounded-full text-sm"
              onClick={ClearForm}
            >
              Cancelar
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
