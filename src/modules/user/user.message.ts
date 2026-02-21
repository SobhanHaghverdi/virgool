import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum UserMessage {
  NotFound = "کاربر یافت نشد.",
  Updated = "کاربر با موفقیت ویرایش شد.",
  DuplicateEmail = "ایمیل از قبل وجود دارد.",
  DuplicatePhoneNumber = "شماره موبایل از قبل وجود دارد.",
  Duplicate = "کاربری با این مشخصات قبلا ثبت نام کرده است.",
  RequiredEmailOrPhoneNumber = "شماره موبایل یا ایمیل الزامی می باشد.",
}

type UserMessageKey = "Update";

const UserSwaggerMessage: Record<UserMessageKey, MessageStructure> = {
  Update: {
    summary: "Update user",
    responses: {
      notFound: "User not found",
      conflict: "Duplicate email",
      success: "User updated successfully",
    },
  },
};

export { UserMessage, UserSwaggerMessage };
