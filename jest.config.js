const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  detectOpenHandles: true,
  verbose: true,
  rootDir: ".",
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  setupFilesAfterEnv: ["./test/test-server.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
