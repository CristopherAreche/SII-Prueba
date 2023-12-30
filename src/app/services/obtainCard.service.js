import { supabase } from "@/api/supabase";

export async function obtainCard() {
  try {
    let { data, error } = await supabase.from("cards").select("*");
    if (error) console.alert("error", error);

    if (data) return data;
  } catch (err) {
    console.alert(err.message);
  }
}
