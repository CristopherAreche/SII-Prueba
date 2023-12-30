import { supabase } from "@/api/supabase";
import Swal from 'sweetalert2';

export const UploadCreditCard = async (data) => {
  try {
    const res = await supabase.from("cards").insert(data).select();
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Tarjeta Registrada',
        text: 'La Tarjeta se ha Registrado Correctamente',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un Error con el Registro de la Tarjeta',
    });
    return false;
  }
};