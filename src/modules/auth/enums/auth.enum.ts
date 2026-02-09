enum AuthMethod {
  Email = "email",
  UserName = "userName",
  PhoneNumber = "phoneNumber",
}

enum JwtExpiration {
  AccessToken = "30D",
}

export { AuthMethod, JwtExpiration };
