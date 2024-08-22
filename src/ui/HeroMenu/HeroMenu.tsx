import React, { useState } from "react";
import { Hero } from "../../classes/Hero";

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
  // const [rate, setRate] = useState(hero.fireRate);
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSpellColor(event.target.value);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSpeed(Number(event.target.value));
  };

  const handleFireRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFireRate(Number(event.target.value));
  };

  return (
    <div>
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
          value={hero.speed}
          onInput={handleSpeedChange}
        />
        <span>{hero.speed}</span>
      </label>
      <br />
      <label>
        Fire Rate:
        <input
          type="range"
          min="1"
          max="10"
          value={Math.max(
            1,
            Math.min(10, Math.round(10 - hero.fireRate / 160))
          )}
          onChange={handleFireRateChange}
        />
        <span>{hero.fireRate}</span>
      </label>
    </div>
  );
};
