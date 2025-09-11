import { redirect } from "next/navigation";
import { supabase } from "../services/supabase";

interface Params {
  params: Promise<{ id: string }>;
}

const pageRedirect = async ({ params }: Params) => {
  const { id } = await params;

  const { data, error } = await supabase
    .from("links")
    .select("long_url")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <p>Enlace no encontrado.</p>;
  }

  redirect(data.long_url);
};

export default pageRedirect;
