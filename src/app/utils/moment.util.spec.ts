import { fillWithZeros } from './moment.util';

describe('MomentUtil', () => {

    describe('fillWithZeros', () => {

        it('should return same number if no fill needed', () => {
            const result = fillWithZeros(35, 2);
            expect(result).toBe('35');
        });

        it('should fill to two characters', () => {
            const result = fillWithZeros(7, 2);
            expect(result).toBe('07');
        });

        it('should also work with big numbers', () => {
            const result = fillWithZeros(75, 8);
            expect(result).toBe('00000075');
        });

        it('should not cut number', () => {
            const result = fillWithZeros(75, 1);
            expect(result).toBe('75');
        });
    });
});
