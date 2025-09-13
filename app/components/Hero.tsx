"use client";

import { luckiest } from "@/app/fonts/fontsGoogle";
import { useI18n } from "@/app/hooks/useI18n"; 

const Hero = () => {
  const { translate } = useI18n();

  return (
    <section className="py-6 flex flex-col items-center w-full text-center px-4">
      <h2
        className={`${luckiest.className} 
        text-2xl text-center text-[var(--color-primary)] 
        leading-snug max-w-md`}
      >
        {translate("Hero.subtext")}
      </h2>
    </section>
  );
};

export default Hero;
