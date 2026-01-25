enum BadRequestMessage {
  InvalidAuthType = "اطلاعات احراز هویت معتبر نمی باشد",
}

enum AuthMessage {
  NotFoundUser = "حساب کاربری یافت نشد",
  AlreadyExistsUser = "حساب کاربری با این مشخصات قبلا ثبت شده است",
}

export { BadRequestMessage, AuthMessage };
