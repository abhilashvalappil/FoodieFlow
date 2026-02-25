export default {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts$": ["ts-jest", {
            useESM: true,
            tsconfig: "tsconfig.test.json"
        }]
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    setupFilesAfterEnv: ["./src/tests/setup.ts"],
    extensionsToTreatAsEsm: [".ts"]
};