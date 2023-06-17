import { Uint16, Uint8 } from "./Types";

export default class Register16 {
    constructor(private value: Uint16 = 0) {}

    public readLow(): Uint8 {
        return this.value & 0xFF
    }

    public readHigh(): Uint8 {
        return this.value & (0xFF << 8)
    }

    public writeLow(value: Uint8): Uint16 {
        return this.value = this.readHigh() | value
    }

    public writeHigh(value: Uint8): Uint16 {
        return this.value = this.readLow() | value << 8
    }

    public read(): Uint16 {
        return this.value
    }

    public write(value: Uint16): Uint16 {
        return this.value = value
    }
}