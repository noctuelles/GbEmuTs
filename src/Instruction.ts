import Operand from "./Operand";
import { Uint8 } from "./Types";

export default interface Instruction {
    opcode: Uint8;
    immediate: boolean;
    operands: Operand[];
    cycles: number[];
    bytes: number;
    mnemonic: string;
    comment?: string;

    execute?: () => void;
}
