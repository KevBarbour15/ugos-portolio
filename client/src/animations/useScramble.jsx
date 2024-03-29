import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useScramble = (shouldAnimate, ref, delay, duration, text) => {
  useGSAP(() => {
    if (shouldAnimate) {
      gsap.from(ref.current, {
        delay: delay,
        duration: duration,
        opacity: 0,
        scrambleText: { text: text },
        ease: "sine.inOut",
        clearProps: "all",
      });
    }
  }, [shouldAnimate, ref, delay, duration]);
};

export default useScramble;
