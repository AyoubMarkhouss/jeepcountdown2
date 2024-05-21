import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function AnimatedTimer() {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const interval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const countdownDate = new Date("May 25, 2024 00:18:00").getTime();
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        if (interval.current) clearInterval(interval.current);
      } else {
        setTimerDays(String(days).padStart(2, "0"));
        setTimerHours(String(hours).padStart(2, "0"));
        setTimerMinutes(String(minutes).padStart(2, "0"));
        setTimerSeconds(String(seconds).padStart(2, "0"));
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="p-4 bg-black">
      <div className="flex flex-col justify-center items-center pb-12">
        <h1 className="font-bold pb-4 text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Are you ready to make a choice ?
        </h1>
      </div>
      <div className="w-full max-w-5xl mx-auto flex items-center ">
        <CountdownItem num={timerDays} text="Jours" />
        <CountdownItem num={timerHours} text="Heurs" />
        <CountdownItem num={timerMinutes} text="Minutes" />
        <CountdownItem num={timerSeconds} text="Secondes" />
      </div>
    </div>
  );
}

const CountdownItem = ({ num, text }: { num: string; text: string }) => {
  return (
    <div className="font-mono w-1/4 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center border-r-[1px] border-slate-200">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-medium"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm lg:text-base font-light text-slate-500">
        {text}
      </span>
    </div>
  );
};
