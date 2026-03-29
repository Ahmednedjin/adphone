import { build } from "vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildServer() {
  try {
    await build({
      root: join(__dirname, ".."),
      build: {
        ssr: true,
        outDir: "dist",
        rollupOptions: {
          input: join(__dirname, "index.ts"),
          output: {
            format: "cjs",
            entryFileNames: "index.cjs",
          },
        },
      },
    });

    console.log("Server built successfully");
  } catch (error) {
    console.error("Server build failed:", error);
    process.exit(1);
  }
}

buildServer();
