import { SetMetadata } from "@nestjs/common";
const SKIP_AUTH_KEY = "SKIP_AUTH";

const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
export { SkipAuth, SKIP_AUTH_KEY };
