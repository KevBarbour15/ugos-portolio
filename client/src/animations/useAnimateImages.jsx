import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const useAnimateImages = (shouldAnimate, elementsRef) => {
  useEffect(() => {
    if (shouldAnimate && elementsRef.current) {
      gsap.from(elementsRef.current, {
        delay: 0.5,
        opacity: 0,
        stagger: 0.25,
        y: 0,
        ease: "sine.inOut",
      });
    }
  }, [shouldAnimate, elementsRef]);
};

export default useAnimateImages;
