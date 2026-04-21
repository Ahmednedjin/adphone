import "dotenv/config";
import { runPhoneBot } from "./scraper";

console.log("[Runner] 🚀 البوت يعمل...");

runPhoneBot()
  .then((stats) => {
    console.log("[Runner] ✅ انتهى:", stats);
    process.exit(0);
  })
  .catch((err) => {
    console.error("[Runner] ❌ فشل:", err);
    process.exit(1);
  });
