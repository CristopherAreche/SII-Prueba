"use client";
import { LuNfc } from "react-icons/lu";
import Swal from "sweetalert2";
import { CardTypeImages } from "../assets/CardTypeImages";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CardLayout = ({ Name, Number, Date, Type, Delete }) => {
  const { Visa, Mastercard, AmericanExp, Chip } = CardTypeImages;
  const pathname = usePathname();
  const hiddenNumber = hideDigits(Number);

  function hideDigits(number) {
    const hiddenDigits = number.slice(2, -4).replace(/[0-9]/g, "#");
    const firstDigits = number.slice(0, 2);
    const lastDigits = number.slice(-4);

    return firstDigits + hiddenDigits + lastDigits;
  }
  const confirmDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro de Eliminar esta Tarjeta?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Delete(Number);
        Swal.fire(
          "Eliminada",
          "La tarjeta ha sido eliminada correctamente.",
          "success"
        );
      }
    });
  };

  const cardTypeColors = {
    Visa: "bg-blue-600",
    Mastercard: "bg-red-600",
    "American Express": "bg-gray-600",
  };
  const defaultColor = "bg-slate-900";

  const cardTypeColor = cardTypeColors[Type] || defaultColor;

  return (
    <div
      className={`relative sm:w-[520px] w-[390px] sm:h-[310px] h-[230px] rounded-lg flex flex-col justify-between p-8
     ${cardTypeColor}`}
    >
      {pathname === "/" ? (
        ""
      ) : (
        <button
          className="absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
          onClick={confirmDelete}
        >
          X
        </button>
      )}

      <div className="flex relative items-center gap-4 ">
        <h2 className="text-white sm:text-[2rem] text-sm font-bold">
          monobank
        </h2>
        <hr className=" sm:h-8 h-6 w-[1.5px] bg-slate-400" />
        <p className=" text-slate-400 sm:text-[1.2rem] text-sm">
          Universal Bank
        </p>
        <LuNfc className="text-slate-400  sm:text-[2.5rem] text-2xl absolute end-0 self-center" />
      </div>
      <div className="flex justify-between pe-5 sm:mt-3 mt-1 ">
        <Image alt="card" src={Chip} className=" sm:h-14 h-10 mb-1 w-20" />
        <span className=" text-slate-400 sm:text-[1.2rem] text-xs self-end">
          world
        </span>
      </div>
      <div
        className="text-slate-400 sm:text-2xl text-sm w-full flex justify-center items-end "
        style={{ letterSpacing: "5px", wordSpacing: "15px" }}
      >
        {hiddenNumber}
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
              {Date.slice(0, 2)} / {Date.slice(2)}
            </p>
          </div>
          <p
            className="text-slate-400 sm:text-2xl text-sm uppercase"
            style={{ letterSpacing: "1px" }}
          >
            {Name}
          </p>
        </div>
        {Type == "Mastercard" ? (
          <Image
            alt="card"
            src={Mastercard}
            className=" sm:h-16 h-10 self-center w-1/2"
          />
        ) : Type == "Visa" ? (
          <Image
            alt="card"
            src={Visa}
            className=" sm:h-10 h-6 self-center w-1/2"
          />
        ) : (
          <Image
            alt="card"
            src={AmericanExp}
            className="sm:h-16 h-10 self-center w-1/3"
          />
        )}
      </div>
    </div>
  );
};

export default CardLayout;
