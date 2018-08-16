// returns the number as flled with zeros e.g. (7, 2) -> 07
export function fillWithZeros(number: number, charAmmount: number): string {
    const numString = number.toString();
    if (numString.length > charAmmount) return numString;
    const missingZeros = charAmmount - numString.length;
    return '0'.repeat(missingZeros) + numString;
}
