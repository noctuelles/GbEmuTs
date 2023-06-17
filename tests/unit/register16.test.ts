import {describe, expect, test} from '@jest/globals';
import Register16 from '../../src/Register16';

describe('Register16', () => {
    test('readLow()', () => {
        expect(new Register16(0xFF).readLow()).toBe(0xFF)
        expect(new Register16(0x12).readLow()).toBe(0x12)
    });
    test('readHigh()', () => {
        expect(new Register16(0xFF).readHigh()).toBe(0x00)
        expect(new Register16(0xFF00).readHigh()).toBe(0xFF00)
        expect(new Register16(0xFF12).readHigh()).toBe(0xFF00)
        expect(new Register16(0xFC12).readHigh()).toBe(0xFC00)
    });
    test('writeLow()', () => {
        expect(new Register16().writeLow(0xFF)).toBe(0xFF)
        expect(new Register16().writeLow(0xFC)).toBe(0xFC)

        expect(new Register16(0xFF00).writeLow(0xFC)).toBe(0xFFFC)
        expect(new Register16(0xFFAA).writeLow(0xFC)).toBe(0xFFFC)

        expect(new Register16(0xABCD).writeLow(0xCF)).toBe(0xABCF)

        for (let a = 0x00; a <= 0xFF; a++) {
            expect(new Register16(0xDCFF).writeLow(a)).toBe(0xDC00 + a)
        }
    });
    test('writeHigh()', () => {
        expect(new Register16().writeHigh(0xFF)).toBe(0xFF00)
        expect(new Register16(0x00FF).writeHigh(0xAB)).toBe(0xABFF)
    });
});