import fs from "fs";
import { OpcodeJSON } from "./Opcodes";
import Register16 from "./Register16";
import Instruction from "./Instruction";
import commandLineArgs, { OptionDefinition } from "command-line-args";
import Cartridge from "./Cartridge";

// import sdl from "@kmamal/sdl";
// import { createCanvas } from "canvas";

// // export function sum(a:number, b: number) {
// //     return a + b;
// // }
// const window = sdl.video.createWindow({ title: "Canvas" });
// const { width, height } = window;
// const canvas = createCanvas(width, height);
// const ctx = canvas.getContext("2d");

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, width, height);
// ctx.font = "40px Impact";

// ctx.fillStyle = "white";
// ctx.fillText("Awesome!", 10, 40);

// const buffer = canvas.toBuffer("raw");
// window.render(width, height, width * 4, "bgra32", buffer);

export const opcodes: {
    unprefixed: Record<string, Instruction>;
    cbprefixed: Record<string, Instruction>;
} = JSON.parse(fs.readFileSync("./opcodes.json", { encoding: "utf-8" }));

const parsedOpcodes: {
    unprefixed: Instruction[];
    cbprefixed: Instruction[];
} = { unprefixed: [], cbprefixed: [] };

for (const opKey of Object.keys(opcodes)) {
    for (const [key, value] of Object.entries(opcodes[opKey as keyof typeof opcodes])) {
        parsedOpcodes[opKey as keyof typeof opcodes][parseInt(key, 16)] = value;
    }
}
const uniqueMnemonics = new Set<string>(parsedOpcodes.unprefixed.map(opcode => opcode.mnemonic));

const optionsDefinitions: OptionDefinition[] = [
    { name: "rom", alias: "r", type: String, multiple: false },
];

const options = commandLineArgs(optionsDefinitions);

const romContent = fs.readFileSync(options.rom, null);
const cartridge = new Cartridge(romContent);
