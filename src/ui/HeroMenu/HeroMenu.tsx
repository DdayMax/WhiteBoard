import React, { useState, useEffect } from "react";
import { Hero } from "../../classes/Hero";
import "./HeroMenu.css";

interface HeroMenuProps {
  hero: Hero;
  onChangeSpellColor: (color: string) => void;
  onChangeSpeed: (speed: number) => void;
  onChangeFireRate: (rate: number) => void;
}

export const HeroMenu: React.FC<HeroMenuProps> = ({
  hero,
  onChangeSpellColor,
  onChangeSpeed,
  onChangeFireRate,
}) => {
  const [spellColor, setSpellColor] = useState(hero.spellColor);
  const [speed, setSpeed] = useState(hero.speed);
  const [fireRate, setFireRate] = useState(
    Math.max(1, Math.min(10, Math.round(10 - hero.fireRate / 160)))
  );

  useEffect(() => {
    setSpellColor(hero.spellColor);
    setSpeed(hero.speed);
    setFireRate(
      Math.max(1, Math.min(10, Math.round(10 - hero.fireRate / 160)))
    );
  }, [hero]);
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSpellColor(color);
    onChangeSpellColor(color);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(event.target.value);
    setSpeed(newSpeed);
    onChangeSpeed(newSpeed);
  };

  const handleFireRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFireRate = Number(event.target.value);
    setFireRate(newFireRate);
    onChangeFireRate(2000 - newFireRate * 160);
  };

  return (
    <div className="hero-menu">
      <h2>Hero Settings</h2>
      <label>
        Spell Color:
        <input type="color" value={spellColor} onChange={handleColorChange} />
      </label>
      <label>
        Speed:
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onInput={handleSpeedChange}
        />
        <span>{speed}</span>
      </label>
      <label>
        Fire Rate:
        <input
          type="range"
          min="1"
          max="10"
          value={fireRate}
          onInput={handleFireRateChange}
        />
        <span>{2000 - fireRate * 160}</span>
      </label>
    </div>
  );
};
