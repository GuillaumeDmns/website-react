import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// Pages of the router (src/main.tsx). The server only serves files, so each one gets a copy of index.html where it
// looks for it (photos/index.html…); the app then renders the page.
const pages = ["photos", "videos", "mentions-legales"];

function pageEntries(): Plugin {
  return {
    name: "page-entries",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (index?.type !== "asset") {
        this.error("index.html missing from the bundle");
      }
      for (const page of pages) {
        this.emitFile({ type: "asset", fileName: `${page}/index.html`, source: index.source });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), pageEntries()],
  server: {
    port: 3000,
  },
});
