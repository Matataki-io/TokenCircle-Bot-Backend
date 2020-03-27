import { maskEmailAddress } from "./util";

describe("Util", () => {
    test("Mask email address", () => {
        expect(maskEmailAddress("abc")).toBe("abc");
        expect(maskEmailAddress("a@b.com")).toBe("*@b.com");
        expect(maskEmailAddress("ab@c.com")).toBe("a*@c.com");
        expect(maskEmailAddress("abc@abc.com")).toBe("a*c@abc.com");
        expect(maskEmailAddress("thisisa@emailaddress.com")).toBe("t****sa@emailaddress.com");
    });
});
