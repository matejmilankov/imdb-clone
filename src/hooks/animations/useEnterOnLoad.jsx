import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export function useEnterOnLoad({ isLoading, data, inView = true }) {
    const contentRef = useRef(null);

    useGSAP(() => {
        if (!isLoading && data.length > 0 && inView) {
            gsap.from(contentRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
            });
        }
    }, {
        dependencies: [isLoading, data, inView],
        scope: contentRef,
        revertOnUpdate: true
    });

    return contentRef;
}