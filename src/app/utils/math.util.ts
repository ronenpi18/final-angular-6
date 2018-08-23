// returns random between num1 and num2
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}