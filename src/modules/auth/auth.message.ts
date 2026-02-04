enum AuthMessage {
  SendOtp = "کد یکبار مصرف برای شما ارسال شد.",
  InvalidEmailOrPhoneNumberOrUserName = "شماره موبایل، ایمیل یا نام کاربری صحیح نمی باشد.",
}

enum AuthSwaggerResponseMessage {
  SendOtp = "Otp has sent successfully",
}

enum AuthSwaggerOperationMessage {
  Authentication = "User authentication",
}

export { AuthMessage, AuthSwaggerOperationMessage, AuthSwaggerResponseMessage };
