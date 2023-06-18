import { Uint16 } from "./Types";

export interface BusObserver {
    read(address: Uint16): Uint16;
    write(address: Uint16, value: Uint16): void;
}

export default class Bus {
    private observers: BusObserver[] = [];

    constructor() {}

    public addObserver(observer: BusObserver) {
        this.observers.push(observer);
    }

    public removeObserver(observer: BusObserver) {
        this.observers = this.observers.filter(o => o !== observer);
    }
}
