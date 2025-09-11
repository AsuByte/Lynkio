import { luckiest } from "@/app/fonts/fontsGoogle";

const Hero = () => {
  return (
    <section className="py-8 flex flex-col items-center w-full">
      <h2
        className={`${luckiest.className} 
        text-2xl text-center text-[var(--color-primary)] 
        leading-snug max-w-md`}
      >
        Acorta, genera tus códigos QR y compártelos al instante
      </h2>
    </section>
  );
};

export default Hero;
