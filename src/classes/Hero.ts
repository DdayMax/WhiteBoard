import { Spell } from "./Spell";

export class Hero {
  x: number;
  y: number;
  radius: number;
  speed: number;
  direction: number;
  color: string;
  fireDirection: number;
  fireRate: number;
  lastFireTime: number;
  spells: Spell[];
  spellColor: string;

  constructor(x: number, y: number, color: string, fireDirection: number) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speed = 5;
    this.direction = 1;
    this.color = color;
    this.fireDirection = fireDirection;
    this.fireRate = 1000;
    this.lastFireTime = Date.now();
    this.spells = [];
    this.spellColor = color;
  }

  update(canvasWidth: number, canvasHeight: number) {
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvasHeight) {
      this.direction *= -1;
    }

    this.y += ((this.speed * 2) / 5) * this.direction;

    if (this.y - this.radius < 0) {
      this.y = this.radius;
    } else if (this.y + this.radius > canvasHeight) {
      this.y = canvasHeight - this.radius;
    }
    this.spells.forEach((spell) => spell.update(canvasWidth));
    this.spells = this.spells.filter(
      (spell) => !spell.isOutOfBounds(canvasWidth)
    );
  }

  fire() {
    const now = Date.now();
    if (now - this.lastFireTime > this.fireRate) {
      this.lastFireTime = now;
      const spell = new Spell(
        this.x,
        this.y,
        this.spellColor,
        this.fireDirection
      );
      this.spells.push(spell);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    this.spells.forEach((spell) => spell.draw(ctx));
  }

  bounceOffCursor(cursorX: number, cursorY: number) {
    const dx = this.x - cursorX;
    const dy = this.y - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius) {
      if (cursorY < this.y) {
        this.direction = 1;
      } else {
        this.direction = -1;
      }
    }
  }

  checkCollisionWithHero(otherHero: Hero): boolean {
    const dx = this.x - otherHero.x;
    const dy = this.y - otherHero.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.radius + otherHero.radius;
  }

  isClicked(x: number, y: number): boolean {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }

  setSpellColor(color: string) {
    this.spellColor = color;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setFireRate(rate: number) {
    this.fireRate = rate;
  }
}
