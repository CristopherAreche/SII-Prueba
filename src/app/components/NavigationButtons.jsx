"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationButtons = () => {
  const pathname = usePathname();

  return (
    <div
      className={`flex ${
        pathname === "/" ? "justify-center" : "justify-evenly"
      } gap-8`}
    >
      <Link href={"/"}>
        <button
          className={` ${
            pathname === "/" ? "hidden" : "block"
          } bg-transparent text-green-600 hover:bg-green-600 border-2 border-green-600 hover:text-white px-4 py-2 rounded-md`}
        >
          Agregar Otra Tarjeta
        </button>
      </Link>
      <Link href={"/cards"}>
        <button
          className={`
         ${pathname === "/cards" ? "hidden" : "block"}
         bg-transparent text-slate-800 px-4 py-2 rounded-md hover:bg-slate-800 border-2 border-slate-900 hover:text-white`}
        >
          Lista de tarjetas
        </button>
      </Link>
    </div>
  );
};
