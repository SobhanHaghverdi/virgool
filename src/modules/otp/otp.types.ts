import type { Repository } from "typeorm";
import type OtpEntity from "./otp.entity";

type OtpRepository = Repository<OtpEntity>;

export type { OtpRepository };
