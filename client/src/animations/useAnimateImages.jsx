import { useEffect } from "react";
import gsap from "gsap";

const useAnimateImages = (shouldAnimate, elementsRef) => {
  useEffect(() => {
    if (shouldAnimate && elementsRef.current) {
      gsap.from(elementsRef.current, {
        delay: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 25,
        ease: "sine.inOut",
        // Make sure elements are treated individually
        transformOrigin: 'center bottom',
      });
    }
  }, [shouldAnimate, elementsRef]);
};

export default useAnimateImages;
