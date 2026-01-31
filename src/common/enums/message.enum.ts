enum BadRequestMessage {
  InvalidAuthType = "اطلاعات احراز هویت معتبر نمی باشد",
}

enum AuthMessage {
  NotFoundUser = "حساب کاربری یافت نشد",
  ExpiredOtp = "کد یکبار مصرف منقضی شده است",
  InvalidOtp = "کد یکبار مصرف معتبر نمی باشد",
  AlreadyExistsUser = "حساب کاربری با این مشخصات قبلا ثبت شده است",
}

export { BadRequestMessage, AuthMessage };
