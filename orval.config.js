const ORIGIN = "https://app.vouchsafe.id"

module.exports = {
  vouchsafe: {
    input: { target: "./swagger-temp.json", validation: false },
    output: {
      mode: "split",
      target: "src/openapi/endpoints.ts",
      schemas: "src/openapi/models",
      client: "fetch",
      baseUrl: `${ORIGIN}/api/v1`,
      override: {
        enumGenerationType: "union",
        aliasCombinedTypes: true,
      },
      clean: true,
    },
  },
  vouchsafeV2: {
    input: { target: "./swagger-v2-temp.json", validation: false },
    output: {
      mode: "split",
      target: "src/openapi-v2/endpoints.ts",
      schemas: "src/openapi-v2/models",
      client: "fetch",
      baseUrl: `${ORIGIN}/api/v2`,
      override: {
        enumGenerationType: "union",
        aliasCombinedTypes: true,
      },
      clean: true,
    },
  },
}
