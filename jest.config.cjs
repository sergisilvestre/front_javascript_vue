module.exports = {
  testEnvironment: "node",

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "json"],

  testMatch: ["**/__tests__/**/*.test.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^~/(.*)$": "<rootDir>/app/$1",
    "^#imports$": "<rootDir>/__mocks__/imports.ts",
  },
};