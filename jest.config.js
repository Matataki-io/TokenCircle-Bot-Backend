module.exports = {
  globals: {
    "ts-jest": {
      packageJson: "package.json",
    },
  },
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {
    "^src/(.+)": "<rootDir>/$1",
  },
  setupFilesAfterEnv: [
    "../test/test.setup.ts",
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node"
};
