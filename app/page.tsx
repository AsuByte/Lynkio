import Hero from "@/app/components/Hero";
import Form from "@/app/components/LinkForm";

export default function Home() {
  return (
    <main className="pt-4 pb-12 sm:pt-6 sm:pb-16">
      <Hero />
      <Form />
    </main>
  );
}
