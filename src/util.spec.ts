import { maskEmailAddress } from "./util";

describe("Util", () => {
    test("Mask email address", () => {
        expect(maskEmailAddress("abc")).toBe("abc");
        expect(maskEmailAddress("abc@abc.com")).toBe("a*c@abc.com");
        expect(maskEmailAddress("thisisa@emailaddress.com")).toBe("t****sa@emailaddress.com");
    });
});
