import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  alias: {
    "~": fileURLToPath(new URL(".", import.meta.url)),
    "@": fileURLToPath(new URL("./app", import.meta.url)),
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  ssr: false,
  components: true,
});
