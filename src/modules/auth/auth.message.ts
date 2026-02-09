enum AuthMessage {
  Login = "شما با موفقیت وارد شدید.",
  Unauthorized = "لفطا ابتدا وارد سایت شوید",
  InvalidOtp = "کد یکبار مصرف صحیح نمی باشد.",
  ExpiredOtp = "کد یکبار مصرف منقضی شده است.",
  SendOtp = "کد یکبار مصرف برای شما ارسال شد.",
  SendOtpLimit = "لطفا برای دریافت کد جدید دقایقی دیگر مجددا تلاش کنید",
  InvalidEmailOrPhoneNumberOrUserName = "شماره موبایل، ایمیل یا نام کاربری صحیح نمی باشد.",
}

enum AuthSwaggerResponseMessage {
  SendOtp = "Otp has sent successfully",
  Login = "You have logged in successfully",
}

enum AuthSwaggerOperationMessage {
  OtpVerification = "Otp verification",
  Authentication = "User authentication",
}

export { AuthMessage, AuthSwaggerOperationMessage, AuthSwaggerResponseMessage };
