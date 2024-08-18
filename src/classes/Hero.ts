import { Spell } from "./Spell";

export class Hero {
  x: number;
  y: number;
  radius: number;
  speed: number;
  direction: number; // Направление движения: 1 (вверх) или -1 (вниз)
  color: string; // Цвет героя
  fireDirection: number; // Направление стрельбы: 1 (вправо) или -1 (влево)
  fireRate: number; // Интервал стрельбы в миллисекундах
  lastFireTime: number; // Время последней стрельбы
  spells: Spell[]; // Массив заклинаний
  spellColor: string; // Цвет заклинания

  constructor(x: number, y: number, color: string, fireDirection: number) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speed = 2;
    this.direction = 1; // Двигаемся вверх
    this.color = color;
    this.fireDirection = fireDirection; // 1 для вправо, -1 для влево
    this.fireRate = 1000; // Интервал стрельбы в миллисекундах
    this.lastFireTime = Date.now();
    this.spells = [];
    this.spellColor = color; // Цвет заклинаний по умолчанию равен цвету героя
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.y += this.speed * this.direction;

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvasHeight) {
      this.direction *= -1; // Меняем направление движения при достижении границ
    }

    // Обновление и удаление заклинаний
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

    // Рисуем заклинания
    this.spells.forEach((spell) => spell.draw(ctx));
  }

  bounceOffCursor(cursorX: number, cursorY: number) {
    const dx = this.x - cursorX;
    const dy = this.y - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius) {
      // Увеличение радиуса для более чувствительного реагирования
      if (cursorY < this.y) {
        this.direction = 1; // Двигаемся вверх
      } else {
        this.direction = -1; // Двигаемся вниз
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

  setColor(color: string) {
    this.color = color;
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
