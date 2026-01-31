import fs from "fs";
import { join } from "path";
import packageJson from "../package.json" with { type: "json" };

const constants = `//* This file has been generated automatically based on package.json file
enum App {
  VERSION = "${packageJson.version}",
}

export { App };
`;

fs.writeFileSync(
  join(process.cwd(), "src", "common", "enums", "app.enum.ts"),
  constants,
);
