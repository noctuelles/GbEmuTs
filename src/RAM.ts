import { BusObserver } from "./Bus";
import { Uint16, Uint8 } from "./Types";

export interface IRAM<AddressRange, ValueRange> {
    read(address: AddressRange): ValueRange;
    write(address: AddressRange, value: ValueRange): void;
}

export default class WRAM implements IRAM<Uint16, Uint8>, BusObserver {
    public static readonly SIZE = 64 * 1024;

    private content: Buffer;

    constructor(size: number = WRAM.SIZE) {
        this.content = Buffer.alloc(size);
    }

    public read(address: Uint16) {
        return this.content.readUInt8(address);
    }

    public write(address: Uint16, value: Uint8) {
        this.content.writeUint8(value, address);
    }
}
