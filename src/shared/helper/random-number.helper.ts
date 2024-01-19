export function generateRandomNumber(p?: number): string {
  if (typeof p !== 'number' || p <= 0 || p > 99999) {
    throw new Error('Invalid input for maximum value (p)');
  }

  const randomNumber = Math.floor(Math.random() * (p + 1));
  const formattedNumber = randomNumber.toString().padStart(5, '0');

  return formattedNumber;
}
