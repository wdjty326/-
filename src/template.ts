import fs from "fs";
import path from "path";

// 메인 가이드 내용을 메모리에 저장
export const MainGuideContent = (() => fs.readFileSync(path.resolve(__dirname, "template", "mainguide")).toString())();

