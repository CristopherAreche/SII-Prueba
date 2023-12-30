import { supabase } from "@/api/supabase";

// cons esta funcion puedes liminar un registro mediante el numero de la tarjeta
export const removeCard = async (Number) => {
  const { error } = await supabase.from("cards").delete().eq("Number", Number);
};
