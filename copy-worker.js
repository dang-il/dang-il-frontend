const fs = require("fs");
const path = require("path");

const srcPath = path.resolve(__dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const publicDir = path.resolve(__dirname, "public");
const destPath = path.join(publicDir, "pdf.worker.min.mjs");

try {
  if (!fs.existsSync(srcPath)) {
    console.error("❌ 소스 파일이 존재하지 않습니다:", srcPath);
    process.exit(1);
  }

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.copyFileSync(srcPath, destPath);
  console.log("✅ pdf.worker.min.mjs 파일이 public 폴더로 복사되었습니다.");
} catch (error) {
  console.error("❌ 파일 복사 중 오류 발생:", error);
  process.exit(1);
}
