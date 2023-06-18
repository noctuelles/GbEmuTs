import Bus from "./Bus";
import RAM from "./RAM";
import SharpLR35902 from "./SharpLR35902";

export default class Gameboy {
    private bus: Bus = new Bus();
    private cpu = new SharpLR35902();
    private ram = new RAM();

    constructor() {
        this.bus.addObserver(this.cpu);
        this.bus.addObserver(this.ram);
    }
}
