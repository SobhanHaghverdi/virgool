enum AuthMessage {
  Registered = "حساب کاربری با موفقیت ایجاد شد.",
  InvalidEmailOrPhoneNumber = "شماره موبایل یا ایمیل صحیح نمی باشد.",
}

enum AuthSwaggerResponseMessage {
  Registered = "User registered successfully",
}

enum AuthSwaggerOperationMessage {
  Registration = "User registration",
}

export { AuthMessage, AuthSwaggerOperationMessage, AuthSwaggerResponseMessage };
