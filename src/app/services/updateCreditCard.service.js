import { supabase } from "@/api/supabase";

export const UpdateCards = async () => {
  const { data, error } = await supabase
    .from("cards")
    .update({ other_column: data })
    .eq("some_column", "someValue")
    .select();
};
