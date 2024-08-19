import React, { useRef, useEffect, useState, useCallback } from "react";
import { Hero } from "../../classes/Hero";
import { HeroMenu } from "../../ui/HeroMenu";
import useMousePosition from "../../hooks/useMousePositions";
import "./DuelGame.css";
import { Scores } from "../../ui/Scores";

export const DuelGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hero1] = useState(new Hero(50, 100, "#ff0000", 1));
  const [hero2] = useState(new Hero(750, 100, "#0000ff", -1));
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const { mousePosition, isMouseMoving } = useMousePosition(canvasRef);

  const updateAndRender = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.save();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (!isMouseMoving) {
      hero1.bounceOffCursor(mousePosition.current.x, mousePosition.current.y);
      hero2.bounceOffCursor(mousePosition.current.x, mousePosition.current.y);
    }

    hero1.update(canvasWidth, canvasHeight);
    hero2.update(canvasWidth, canvasHeight);

    hero1.spells.forEach((spell) => {
      if (spell.isCollidingWith(hero2)) {
        setScore1((prevScore1) => prevScore1 + 1);
        hero1.spells = hero1.spells.filter((s) => s !== spell);
      }
    });

    hero2.spells.forEach((spell) => {
      if (spell.isCollidingWith(hero1)) {
        setScore2((prevScore2) => prevScore2 + 1);
        hero2.spells = hero2.spells.filter((s) => s !== spell);
      }
    });

    hero1.draw(ctx);
    hero2.draw(ctx);

    hero1.fire();
    hero2.fire();
    ctx.restore();
  }, [hero1, hero2, mousePosition, isMouseMoving]);

  useEffect(() => {
    const interval = setInterval(updateAndRender, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [updateAndRender]);

  const handleMouseClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (hero1.isClicked(x, y)) {
      setSelectedHero(hero1);
    } else if (hero2.isClicked(x, y)) {
      setSelectedHero(hero2);
    } else {
      setSelectedHero(null);
    }
  };

  const handleChangeSpellColor = (color: string) => {
    if (selectedHero) {
      selectedHero.setSpellColor(color);
      setSelectedHero(selectedHero);
    }
  };

  const handleChangeSpeed = (speed: number) => {
    if (selectedHero) {
      selectedHero.setSpeed(speed);
      setSelectedHero(selectedHero);
    }
  };

  const handleChangeFireRate = (rate: number) => {
    if (selectedHero) {
      selectedHero.setFireRate(2000 - rate * 200);
      setSelectedHero(selectedHero);
    }
  };

  return (
    <div className="duel-game__wrapper">
      <div className="duel-game__menu">
        <Scores>
          <h3>Scores</h3>
          <p>Hero 1 (Red): {score1}</p>
          <p>Hero 2 (Blue): {score2}</p>
        </Scores>
        {selectedHero && (
          <HeroMenu
            hero={selectedHero}
            onChangeSpellColor={handleChangeSpellColor}
            onChangeSpeed={handleChangeSpeed}
            onChangeFireRate={handleChangeFireRate}
          />
        )}
      </div>
      <canvas
        className="duel-game__canvas"
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleMouseClick}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};
