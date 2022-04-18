import { createParrotProxy } from "../proxy";

describe("Parrot Proxy", function () {
  test("Single layer deep", () => {
    const test = createParrotProxy();

    expect(test.hello.toString()).toBe("hello");
  });

  test("two layer deep", () => {
    const test = createParrotProxy();

    expect(test.hello.other.toString()).toBe("hello_other");
  });

  test("is typeof string", () => {
    const test = createParrotProxy();

    expect(test.hello.other).toBeInstanceOf(String);
  });
});
