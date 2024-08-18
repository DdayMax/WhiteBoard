import { Hero } from "./Hero";

export class Spell {
  x: number;
  y: number;
  color: string;
  direction: number; // Направление: 1 (вправо) или -1 (влево)
  speed: number;

  constructor(x: number, y: number, color: string, direction: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.direction = direction;
    this.speed = 5; // Примерное значение скорости
  }

  update(canvasWidth: number) {
    this.x += this.speed * this.direction;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  isOutOfBounds(canvasWidth: number): boolean {
    return this.x < 0 || this.x > canvasWidth;
  }

  isCollidingWith(other: Hero): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20; // Радиус для проверки столкновения
  }
}
