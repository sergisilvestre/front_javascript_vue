import { defineVitestConfig } from "vitest/config";

export default defineVitestConfig({
  test: {
    environment: "happy-dom",
    globals: true,
  },
});
