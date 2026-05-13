const {
  parseAllowedOrigins,
  parseBoolean,
  validateEnvironment,
} = require("../configs/env.config");

describe("env.config", () => {
  it("throws when required variables are missing", () => {
    expect(() => validateEnvironment({})).toThrow(
      /Missing required environment variables/
    );
  });

  it("parses booleans and origin lists", () => {
    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean(undefined)).toBe(false);
    expect(
      parseAllowedOrigins("http://localhost:3000, https://app.example.com")
    ).toEqual(["http://localhost:3000", "https://app.example.com"]);
  });
});
