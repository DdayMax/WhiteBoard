import React, { useState } from "react";
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
  const [fireRate, setFireRate] = useState(
    Math.max(1, Math.min(10, Math.floor(10 - hero.fireRate / 200)))
  );

  const [speed, setSpeed] = useState(hero.speed);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSpellColor(event.target.value);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSpeed(Number(event.target.value));
    setSpeed(Number(event.target.value));
  };

  const handleFireRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFireRate(Number(event.target.value));
    setFireRate(
      Math.max(1, Math.min(10, Math.floor(10 - hero.fireRate / 200)))
    );
  };

  return (
    <div className="hero-menu">
      <h2>Hero Settings</h2>
      <label>
        Spell Color:
        <input
          type="color"
          value={hero.spellColor}
          onChange={handleColorChange}
        />
      </label>
      <br />
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
      <br />
      <label>
        Fire Rate:
        <input
          type="range"
          min="1"
          max="10"
          value={fireRate}
          onChange={handleFireRateChange}
        />
        <span>{fireRate}</span>
      </label>
    </div>
  );
};
