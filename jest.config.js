const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  forceExit: true,
  verbose: true,
  // testMatch: ["**/__tests__/**/*.unit.ts", "**/__tests__/**/*.integration.ts"],
};
