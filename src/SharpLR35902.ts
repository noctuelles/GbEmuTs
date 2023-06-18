import { BusObserver } from "./Bus";
import Register16 from "./Register16";
import { Uint8 } from "./Types";

/*
  -- Flags --
  Z: Zero Flag
  N: Subtract Flag
  H: Half Carry Flag
  C: Carry Flag
*/
enum Flags {
    Z = 1 << 7,
    N = 1 << 6,
    H = 1 << 5,
    C = 1 << 4,
}

export interface SharpLR35902BaseRegisters {
    AF: Register16;
    BC: Register16;
    DE: Register16;
    HL: Register16;
}

interface SharpLR35902Registers extends SharpLR35902BaseRegisters {
    SP: Register16;
    PC: Register16;
}

type Opcode {
  mnemonic: string;
  length: number;
  cycles: number;

  execute: () => void;
}

export default class SharpLR35902 implements BusObserver {
    private registers: SharpLR35902Registers = {
        AF: new Register16(),
        BC: new Register16(),
        DE: new Register16(),
        HL: new Register16(),
        SP: new Register16(),
        PC: new Register16(),
    };

    private lookup: Opcode[] =[
      { mnemonic: "NOP", length: 1, cycles: 4, execute: this.NOP },
      { mnemonic: "LD BC, d16", length: 3, cycles: 12, execute: this.LD_BC}
    ]

    private cycles = 0;
    private currentOpcode = 0x00;

    private LD_BC() {
        this.registers.BC.high = this.registers.BC.low;
    }

    private NOP() {}

    public clock(): void {
        if (this.cycles === 0) {
            this.registers.PC.value++;
        }

        this.cycles--;
    }

    constructor() {}
}
