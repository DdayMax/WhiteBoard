import React, { useEffect } from "react";
import { Hero } from "../../classes/Hero";

interface HeroComponentProps {
  hero: Hero;
  mousePosition: { x: number; y: number };
}

const HeroComponent: React.FC<HeroComponentProps> = (
  { hero },
  mousePosition
) => {
  useEffect(() => {
    const { x, y } = mousePosition.current;

    hero.bounceOffCursor(x, y);
  }, [mousePosition, hero]);

  return (
    <canvas width={800} height={600} style={{ border: "1px solid black" }} />
  );
};

export default HeroComponent;
