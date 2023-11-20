"use client";

export function getRandomNumber(min: number, max: number): number {
  // Генерировать случайное число в диапазоне от 0 (включительно) до 1 (включительно)
  const random = Math.random();

  // Масштабируйте случайное число так, чтобы оно вписывалось в нужный диапазон
  const scaledRandom = random * (max - min);

  // Сдвиг масштабированного случайного числа в нужный диапазон
  const result = scaledRandom + min;

  return Math.floor(result);
}
