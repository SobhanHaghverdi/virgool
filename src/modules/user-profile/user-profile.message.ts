import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum UserProfileMessage {
  NotFound = "پروفایل یافت نشد.",
  Upsert = "پروفایل با موفقیت ویرایش شد.",
  Duplicate = "پروفایل از قبل وجود دارد.",
  DuplicateXProfile = "لینک پروفایل شبکه اجتماعی x از قبل وجود دارد.",
  DuplicateLinkedinProfile = "لینک پروفایل شبکه اجتماعی لینکدین از قبل وجود دارد",
}

type UserProfileMessageKey = "UpsertProfile" | "GetProfile";

const UserProfileSwaggerMessage: Record<
  UserProfileMessageKey,
  MessageStructure
> = {
  UpsertProfile: {
    summary: "Create or update user profile",
    responses: {
      notFound: "Profile not found",
      success: "User profile updated successfully",
      conflict: "Duplicate profile, x or linkedin ",
    },
  },
  GetProfile: {
    summary: "Get profile info by user id",
    responses: { success: "User profile details" },
  },
};

export { UserProfileMessage, UserProfileSwaggerMessage };
