import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

const transitionStyles = {
  "fade-in": {
    opacity: 0,
    transition: "opacity 1s, transform 1s cubic-bezier(.57,.21,0.69,1.25)",
    transform: "translateY(50px)",
  },
  "slide-in": {
    opacity: 0.5,
    transition: "opacity 1s, transform 1s ease-in-out",
    transform: "translateY(50px)",
  },
  "scale-in": {
    opacity: 0,
    transition: "opacity 1s, transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: "scale(0.9)",
  },
  "rotate-in": {
    opacity: 0,
    transition: "opacity 1s, transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: "rotate(-10deg)",
  },
  "slide-from-right": {
    opacity: 0,
    transition: "opacity 1s, transform 1s ease-in-out",
    transform: "translateX(100px)",
  },
  "slide-from-left": {
    opacity: 0,
    transition: "opacity 1s, transform 1s ease-in-out",
    transform: "translateX(-100px)",
  },
  "zoom-in": {
    opacity: 0,
    transition: "opacity 0.5s, transform 0.5s ease-out",
    transform: "scale(0.6)",
  },
  "reveal-from-top": {
    opacity: 0,
    transition: "opacity 1s, transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: "translateY(-100%)",
  },
  "expand-from-top": {
    opacity: 0,
    transition: "opacity 1s, transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: "scaleY(0)",
  },
};

function AnimatingWrapper({
  index = 0,
  children,
  transitionType = "fade-in",
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current; 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const style = {
    ...transitionStyles[transitionType],
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateX(0)"
      : {
          "fade-in": `translateY(${index * 50 + 50}px)`,
          "slide-in": `translateY(${index * 50 + 50}px)`,
          "scale-in": `scale(0.9)`,
          "rotate-in": `rotate(-10deg)`,
          "slide-from-right": `translateX(100px)`,
          "slide-from-left": `translateX(-100px)`,
          "zoom-in": `scale(0.6)`,
          "reveal-from-top": `translateY(${index * 50 + 50}px)`,
          "expand-from-top": `scaleY(${index * 50 + 50}px)`,
        }[transitionType],
  };

  const NewChild = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ref: elementRef,
      style: { ...child.props.style, ...style },
    });
  });

  return NewChild;
}

export default AnimatingWrapper;
