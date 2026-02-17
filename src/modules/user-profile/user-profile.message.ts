enum UserProfileMessage {
  NotFound = "پروفایل یافت نشد.",
  Upsert = "پروفایل با موفقیت ویرایش شد.",
  Duplicate = "پروفایل از قبل وجود دارد.",
  DuplicateXProfile = "لینک پروفایل شبکه اجتماعی x از قبل وجود دارد.",
  DuplicateLinkedinProfile = "لینک پروفایل شبکه اجتماعی لینکدین از قبل وجود دارد",
}

enum UserProfileSwaggerResponseMessage {
  NotFound = "User profile not found",
  Upserted = "User profile updated successfully",
}

enum UserProfileSwaggerOperationMessage {
  Upsert = "Create or update user profile",
}

export {
  UserProfileMessage,
  UserProfileSwaggerResponseMessage,
  UserProfileSwaggerOperationMessage,
};
