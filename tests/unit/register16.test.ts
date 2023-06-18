import { describe, expect, test } from "@jest/globals";
import Register16 from "../../src/Register16";

describe("Register16", () => {
  test("get low", () => {
    expect(new Register16(0xff).low).toBe(0xff);
    expect(new Register16(0x12).low).toBe(0x12);
  });
  test("get high", () => {
    expect(new Register16(0xff).high).toBe(0x00);
    expect(new Register16(0xff00).high).toBe(0xff00);
    expect(new Register16(0xff12).high).toBe(0xff00);
    expect(new Register16(0xfc12).high).toBe(0xfc00);
  });
  test("set low simple", () => {
    const reg = new Register16();

    reg.low = 0xff;
    expect(reg.low).toBe(0xff);
    reg.low = 0xfc;
    expect(reg.low).toBe(0xfc);

    reg.value = 0xff00;
    reg.low = 0xfc;
    expect(reg.value).toBe(0xfffc);

    reg.value = 0x00ff;
    reg.low = 0xfc;
    expect(reg.value).toBe(0x00fc);
  });
});
