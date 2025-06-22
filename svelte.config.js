import adapter from "@sveltejs/adapter-cloudflare"; // cloudflare adapter
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },

      platformProxy: {
        configPath: "wrangler.toml",
        environment: "production",
        experimentalJsonConfig: false,
        persist: true,
      },
    }),
  },
};

export default config;
