const {
  createCorsOptions,
  DEFAULT_ALLOWED_ORIGINS,
} = require("../configs/security.config");

describe("security.config", () => {
  it("allows the production Fly origin by default", () => {
    const corsOptions = createCorsOptions({ CORS_ORIGIN: [] });

    corsOptions.origin("https://conoxchange.fly.dev", (error, allowed) => {
      expect(error).toBeNull();
      expect(allowed).toBe(true);
    });
  });

  it("allows configured custom origins", () => {
    const corsOptions = createCorsOptions({
      CORS_ORIGIN: ["https://example.com"],
    });

    corsOptions.origin("https://example.com", (error, allowed) => {
      expect(error).toBeNull();
      expect(allowed).toBe(true);
    });
  });

  it("rejects origins outside the whitelist", () => {
    const corsOptions = createCorsOptions({ CORS_ORIGIN: [] });

    corsOptions.origin("https://evil.example", (error, allowed) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Origin not allowed by CORS");
      expect(allowed).toBeUndefined();
    });
  });

  it("ships with the expected default allowed origins", () => {
    expect(DEFAULT_ALLOWED_ORIGINS).toEqual([
      "https://conoxchange.fly.dev",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]);
  });
});
