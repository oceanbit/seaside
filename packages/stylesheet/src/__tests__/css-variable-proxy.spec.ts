import { createParrotProxy } from "../css-variable-proxy";

describe("Parrot Proxy", function () {
  test("Single layer deep", () => {
    const test = createParrotProxy();

    expect(test.hello.toString()).toBe("var(--hello)");
  });

  test("two layer deep", () => {
    const test = createParrotProxy();

    expect(test.hello.other.toString()).toBe("var(--hello_other)");
  });

  test("is typeof string", () => {
    const test = createParrotProxy();

    expect(test.hello.other).toBeInstanceOf(String);
  });
});
