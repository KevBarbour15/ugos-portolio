import { useEffect } from "react";
import gsap from "gsap";

const useFadeIn = (shouldAnimate, ref, delay, duration) => {
  useEffect(() => {
    if (shouldAnimate) {
      gsap.from(ref.current, {
        delay: delay,
        duration: duration,
        opacity: 0,
        y: 25,
        ease: "ease.inOut",
        clearProps: "all",
      });
    }
  }, [shouldAnimate, ref, delay, duration]);
};

export default useFadeIn;
