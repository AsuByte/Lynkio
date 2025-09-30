import { redirect, notFound } from "next/navigation";
import { supabase } from "@/app/services/supabase";

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

  if (error || !data?.long_url) {
    return notFound();
  }

  redirect(data.long_url);
};

export default pageRedirect;
