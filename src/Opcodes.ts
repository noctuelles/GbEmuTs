export type MnemonicType = "LD";
export type GroupType =
    | "x8/lsm"
    | "x16/lsm"
    | "x8/alu"
    | "x16/alu"
    | "x8/rsb"
    | "control/br"
    | "control/misc";

export type FlagType = "Z" | "H" | "N" | "C" | "-";

export type Opcode = {
    mnemonic: MnemonicType;
    length: number;
    cycles: number[];
    flags: FlagType[];
    addr: string;
    group: GroupType;
};

export type OpcodeJSON = {
    unprefixed: Record<string | number, Opcode>;
    cbprefixed: Record<string | number, Opcode>;
};

interface IOpcode {
    execute(): void;
}

abstract class LoadOpCode implements IOpcode {
    public execute() {}
}
