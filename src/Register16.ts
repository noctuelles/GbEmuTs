import { Uint16, Uint8 } from "./Types";

export default class Register16 {
    constructor(public value: Uint16 = 0 | 0) {}

    public get low(): Uint8 {
        return this.value & 0xff;
    }

    public get high(): Uint8 {
        return this.value & (0xff << 8);
    }

    public set low(value: Uint8) {
        this.value = this.high | value;
    }

    public set high(value: Uint8) {
        this.value = this.low | (value << 8);
    }

    public toString() {
        return "0x" + this.value.toString(16).padStart(4, "0");
    }
}
