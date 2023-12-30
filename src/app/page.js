import { CardForm } from "./components/CardForm";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 pt-[10em]  lg:pt-[10em]">
      <section className=" flex flex-col gap-4 ">
        <CardForm />
        <NavigationButtons />
      </section>
    </div>
  );
}
