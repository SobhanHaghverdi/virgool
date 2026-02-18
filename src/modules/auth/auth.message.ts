import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum AuthMessage {
  Login = "شما با موفقیت وارد شدید.",
  Unauthorized = "لفطا ابتدا وارد سایت شوید",
  InvalidOtp = "کد یکبار مصرف صحیح نمی باشد.",
  ExpiredOtp = "کد یکبار مصرف منقضی شده است.",
  SendOtp = "کد یکبار مصرف برای شما ارسال شد.",
  SendOtpLimit = "لطفا برای دریافت کد جدید دقایقی دیگر مجددا تلاش کنید",
  InvalidEmailOrPhoneNumberOrUserName = "شماره موبایل، ایمیل یا نام کاربری صحیح نمی باشد.",
}

type AuthMessageKey = "Authenticate" | "VerifyOtp";

const AuthSwaggerMessage: Record<AuthMessageKey, MessageStructure> = {
  Authenticate: {
    summary: "User authentication",
    responses: {
      success: "Otp has sent successfully",
      unauthorized: "Please wait before receiving new otp",
    },
  },
  VerifyOtp: {
    summary: "Otp verification",
    responses: {
      success: "You have logged in successfully",
      unauthorized: "Please login - expired or invalid",
    },
  },
};

export { AuthMessage, AuthSwaggerMessage };
