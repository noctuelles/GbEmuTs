import { Uint8 } from "./Types";

const bufferRange = (start: number, end: number): [number, number] => [start, end + 1];

enum CartridgeMetadataType {
    CARTRIDGE_TYPE,
    NEW_LICENSEE_CODE,
    OLD_LICENSEE_CODE,
}

class CartridgeMetadataValue {
    private value: Uint8 | string;
    private mapped: string;

    private static readonly CARTRIDGE_TYPES: Record<number, string> = {
        0x00: "ROM ONLY",
        0x01: "MBC1",
        0x02: "MBC1+RAM",
        0x03: "MBC1+RAM+BATTERY",
        0x05: "MBC2",
        0x06: "MBC2+BATTERY",
        0x08: "ROM+RAM",
        0x09: "ROM+RAM+BATTERY",
        0x0b: "MMM01",
        0x0c: "MMM01+RAM",
        0x0d: "MMM01+RAM+BATTERY",
        0x0f: "MBC3+TIMER+BATTERY",
        0x10: "MBC3+TIMER+RAM+BATTERY",
        0x11: "MBC3",
        0x12: "MBC3+RAM",
        0x13: "MBC3+RAM+BATTERY",
        0x15: "MBC4",
        0x16: "MBC4+RAM",
        0x17: "MBC4+RAM+BATTERY",
        0x19: "MBC5",
        0x1a: "MBC5+RAM",
        0x1b: "MBC5+RAM+BATTERY",
        0x1c: "MBC5+RUMBLE",
        0x1d: "MBC5+RUMBLE+RAM",
        0x1e: "MBC5+RUMBLE+RAM+BATTERY",
        0x1f: "MBC6",
        0x20: "MBC7+SENSOR+RUMBLE+RAM+BATTERY",
        0x22: "MBC7+SENSOR+RUMBLE+RAM+BATTERY",
        0xfc: "POCKET CAMERA",
        0xfd: "BANDAI TAMA5",
        0xfe: "HuC3",
        0xff: "HuC1+RAM+BATTERY",
    };

    private static readonly NEW_LICENSEE_CODE: Record<string, string> = {
        "00": "None",
        "01": "Nintendo R&D1",
        "08": "Capcom",
        "13": "Electronic Arts",
        "18": "Hudson Soft",
        "19": "b-ai",
        "20": "kss",
        "22": "pow",
        "24": "PCM Complete",
        "25": "san-x",
        "28": "Kemco Japan",
        "29": "seta",
        "30": "Viacom",
        "31": "Nintendo",
        "32": "Bandai",
        "33": "Ocean/Acclaim",
        "34": "Konami",
        "35": "Hector",
        "37": "Taito",
        "38": "Hudson",
        "39": "Banpresto",
        "41": "Ubi Soft",
        "42": "Atlus",
        "44": "Malibu",
        "46": "angel",
        "47": "Bullet-Proof",
        "49": "irem",
        "50": "Absolute",
        "51": "Acclaim",
        "52": "Activision",
        "53": "American sammy",
        "54": "Konami",
        "55": "Hi tech entertainment",
        "56": "LJN",
        "57": "Matchbox",
        "58": "Mattel",
        "59": "Milton Bradley",
        "60": "Titus",
        "61": "Virgin",
        "64": "LucasArts",
        "67": "Ocean",
        "69": "Electronic Arts",
        "70": "Infogrames",
        "71": "Interplay",
        "72": "Broderbund",
        "73": "sculptured",
        "75": "sci",
        "78": "THQ",
        "79": "Accolade",
        "80": "misawa",
        "83": "lozc",
        "86": "Tokuma Shoten Intermedia",
        "87": "Tsukuda Original",
        "91": "Chunsoft",
        "92": "Video system",
        "93": "Ocean/Acclaim",
        "95": "Varie",
        "96": "Yonezawa/s’pal",
        "97": "Kaneko",
        "99": "Pack in soft",
        A4: "Konami (Yu-Gi-Oh!)",
    };

    private static readonly OLD_LICENSEE_CODE: Record<number, string> = {
        0x00: "None",
        0x01: "Nintendo",
        0x08: "Capcom",
        0x09: "Hot-B",
        0x0a: "Jaleco",
        0x0b: "Coconuts Japan",
        0x0c: "Elite Systems",
        0x13: "EA (Electronic Arts)",
        0x18: "Hudsonsoft",
        0x19: "ITC Entertainment",
        0x1a: "Yanoman",
        0x1d: "Japan Clary",
        0x1f: "Virgin Interactive",
        0x24: "PCM Complete",
        0x25: "San-X",
        0x28: "Kotobuki Systems",
        0x29: "Seta",
        0x30: "Infogrames",
        0x31: "Nintendo",
        0x32: "Bandai",
        0x34: "Konami",
        0x35: "HectorSoft",
        0x38: "Capcom",
        0x39: "Banpresto",
        0x3c: ".Entertainment i",
        0x3e: "Gremlin",
        0x41: "Ubisoft",
        0x42: "Atlus",
        0x44: "Malibu",
        0x46: "Angel",
        0x47: "Spectrum Holoby",
        0x49: "Irem",
        0x4a: "Virgin Interactive",
        0x4d: "Malibu",
        0x4f: "U.S. Gold",
        0x50: "Absolute",
        0x51: "Acclaim",
        0x52: "Activision",
        0x53: "American Sammy",
        0x54: "GameTek",
        0x55: "Park Place",
        0x56: "LJN",
        0x57: "Matchbox",
        0x59: "Milton Bradley",
        0x5a: "Mindscape",
        0x5b: "Romstar",
        0x5c: "Naxat Soft",
        0x5d: "Tradewest",
        0x60: "Titus",
        0x61: "Virgin Interactive",
        0x67: "Ocean Interactive",
        0x69: "EA (Electronic Arts)",
        0x6e: "Elite Systems",
        0x6f: "Electro Brain",
        0x70: "Infogrames",
        0x71: "Interplay",
        0x72: "Broderbund",
        0x73: "Sculptered Soft",
        0x75: "The Sales Curve",
        0x78: "t.hq",
        0x79: "Accolade",
        0x7a: "Triffix Entertainment",
        0x7c: "Microprose",
        0x7f: "Kemco",
        0x80: "Misawa Entertainment",
        0x83: "Lozc",
        0x86: "Tokuma Shoten Intermedia",
        0x8b: "Bullet-Proof Software",
        0x8c: "Vic Tokai",
        0x8e: "Ape",
        0x8f: "I’Max",
        0x91: "Chunsoft Co.",
        0x92: "Video System",
        0x93: "Tsubaraya Productions Co.",
        0x95: "Varie Corporation",
        0x96: "Yonezawa/S’Pal",
        0x97: "Kaneko",
        0x99: "Arc",
        0x9a: "Nihon Bussan",
        0x9b: "Tecmo",
        0x9c: "Imagineer",
        0x9d: "Banpresto",
        0x9f: "Nova",
        0xa1: "Hori Electric",
        0xa2: "Bandai",
        0xa4: "Konami",
        0xa6: "Kawada",
        0xa7: "Takara",
        0xa9: "Technos Japan",
        0xaa: "Broderbund",
        0xac: "Toei Animation",
        0xad: "Toho",
        0xaf: "Namco",
        0xb0: "acclaim",
        0xb1: "ASCII or Nexsoft",
        0xb2: "Bandai",
        0xb4: "Square Enix",
        0xb6: "HAL Laboratory",
        0xb7: "SNK",
        0xb9: "Pony Canyon",
        0xba: "Culture Brain",
        0xbb: "Sunsoft",
        0xbd: "Sony Imagesoft",
        0xbf: "Sammy",
        0xc0: "Taito",
        0xc2: "Kemco",
        0xc3: "Squaresoft",
        0xc4: "Tokuma Shoten Intermedia",
        0xc5: "Data East",
        0xc6: "Tonkinhouse",
        0xc8: "Koei",
        0xc9: "UFL",
        0xca: "Ultra",
        0xcb: "Vap",
        0xcc: "Use Corporation",
        0xcd: "Meldac",
        0xce: ".Pony Canyon or",
        0xcf: "Angel",
        0xd0: "Taito",
        0xd1: "Sofel",
        0xd2: "Quest",
        0xd3: "Sigma Enterprises",
        0xd4: "ASK Kodansha Co.",
        0xd6: "Naxat Soft",
        0xd7: "Copya System",
        0xd9: "Banpresto",
        0xda: "Tomy",
        0xdb: "LJN",
        0xdd: "NCS",
        0xde: "Human",
        0xdf: "Altron",
        0xe0: "Jaleco",
        0xe1: "Towa Chiki",
        0xe2: "Yutaka",
        0xe3: "Varie",
        0xe5: "Epcoh",
        0xe7: "Athena",
        0xe8: "Asmik ACE Entertainment",
        0xe9: "Natsume",
        0xea: "King Records",
        0xeb: "Atlus",
        0xec: "Epic/Sony Records",
        0xee: "IGS",
        0xf0: "A Wave",
        0xf3: "Extreme Entertainment",
        0xff: "LJN",
    };

    private static readonly UNKNOWN = "UNKNOWN";

    constructor(value: Uint8 | string, type: CartridgeMetadataType) {
        const mappedType: Record<CartridgeMetadataType, string> = {
            [CartridgeMetadataType.CARTRIDGE_TYPE]:
                CartridgeMetadataValue.CARTRIDGE_TYPES[value as Uint8],
            [CartridgeMetadataType.OLD_LICENSEE_CODE]:
                CartridgeMetadataValue.OLD_LICENSEE_CODE[value as Uint8],
            [CartridgeMetadataType.NEW_LICENSEE_CODE]:
                CartridgeMetadataValue.NEW_LICENSEE_CODE[value as string],
        };

        this.value = value;
        this.mapped = mappedType[type] ?? `UNKOWN (${value})`;
    }

    public toString() {
        return this.mapped;
    }

    public valueOf() {
        return this.value;
    }
}

export default class Cartridge {
    private _metadata: CartridgeMetadata;

    constructor(private readonly romContent: Buffer) {
        this._metadata = new CartridgeMetadata(romContent);
    }

    public get metadata(): CartridgeMetadata {
        return this._metadata;
    }
}

class CartridgeMetadata {
    private static readonly LOCATIONS = {
        ENTRY_POINT: bufferRange(0x0100, 0x0103),
        NINTENDO_LOGO: bufferRange(0x0104, 0x0133),
        TITLE: bufferRange(0x0134, 0x0143),
        MANUFACTURER_CODE: bufferRange(0x013f, 0x0142),
        CGB_FLAG: 0x0143,
        NEW_LICENSEE_CODE: bufferRange(0x0144, 0x0145),
        ROM_SIZE: 0x148,
        RAM_SIZE: 0x149,
        CARTRIDGE_TYPE: 0x0147,
        DESTINATION_CODE: 0x014a,
        OLD_LICENSEE_CODE: 0x014b,
        MASK_ROM_VERSION_NUMBER: 0x014c,
        HEADER_CHECKSUM: 0x014d,
        GLOBAL_CHECKSUM: bufferRange(0x014e, 0x014f),
    };

    private static readonly SEE_NEW_LICENSEE_CODE = 0x33;

    constructor(private readonly cartridgeContent: Buffer) {
        if (this.cartridgeContent.length < 0x150) {
            throw new Error("Invalid cartridge size");
        }
    }

    private returnByteAtLocation(location: number) {
        return this.cartridgeContent.readUint8(location);
    }

    private subarrayAt(range: [number, number]) {
        return this.cartridgeContent.subarray(...range);
    }

    public get entryPoint() {
        return this.subarrayAt(CartridgeMetadata.LOCATIONS.ENTRY_POINT);
    }

    public get title() {
        return this.subarrayAt(CartridgeMetadata.LOCATIONS.TITLE).toString("ascii");
    }

    public get cartridgeType() {
        return this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.CARTRIDGE_TYPE);
    }

    public get licenseeCode() {
        const oldLicenseeCode = this.returnByteAtLocation(
            CartridgeMetadata.LOCATIONS.OLD_LICENSEE_CODE,
        );

        if (oldLicenseeCode === CartridgeMetadata.SEE_NEW_LICENSEE_CODE) {
            const newLicenseeCode = this.subarrayAt(
                CartridgeMetadata.LOCATIONS.NEW_LICENSEE_CODE,
            ).toString("ascii");

            return new CartridgeMetadataValue(
                newLicenseeCode,
                CartridgeMetadataType.NEW_LICENSEE_CODE,
            );
        }

        return new CartridgeMetadataValue(oldLicenseeCode, CartridgeMetadataType.OLD_LICENSEE_CODE);
    }

    public get ramSize() {
        return this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.RAM_SIZE);
    }

    public get romSize() {
        return 32 * 1000 * (1 << this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.ROM_SIZE));
    }

    public get headerChecksum() {
        return this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.HEADER_CHECKSUM);
    }

    public get maskRomVersionNumber() {
        return this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.MASK_ROM_VERSION_NUMBER);
    }

    public get globalHeaderChecksum() {
        return this.cartridgeContent.readUInt16BE(CartridgeMetadata.LOCATIONS.GLOBAL_CHECKSUM[0]);
    }

    public get destinationCode() {
        return this.returnByteAtLocation(CartridgeMetadata.LOCATIONS.DESTINATION_CODE);
    }

    public toString() {
        const toTitleCase = (str: string) => {
            const result = str.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        };

        const values = [
            "=== Cartridge Metadata ===\n",
            ...Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this)))
                .filter(([_key, descriptor]) => typeof descriptor.get === "function")
                .map(([key]) => `${toTitleCase(key)} : ${this[key as keyof CartridgeMetadata]}`),
        ];

        return values.join("\n");
    }
}
