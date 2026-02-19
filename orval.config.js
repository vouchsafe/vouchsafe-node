module.exports = {
  vouchsafe: {
    input: { target: "./swagger-temp.json", validation: false },
    output: {
      mode: "split",
      target: "src/openapi/endpoints.ts",
      schemas: "src/openapi/models",
      client: "fetch",
      baseUrl: "https://app.vouchsafe.id/api/v1",
      override: {
        enumGenerationType: "union",
        aliasCombinedTypes: true,
      },
      clean: true,
    },
  },
}
