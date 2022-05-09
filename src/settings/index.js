/* Token Settings */
const tokenSecret = "TOKEN SECRET TEXT";
const tokenExpired = "7d";
const headerTokenName = "Authorization";

/* Token Messages */
const invalidToken = "Geçersiz token";
const invalidIpAdress = "Geçersiz ip adresi";
const accessDenied = "Erişim reddedildi";

/* General Messages */
const sendInvalid = "Gönderdiğiniz bilgiler geçersiz";

/* Auth Messages */
const wrongLogin = "Kullanıc adı, e-posta veya şifre hatalı";
const notFoundUser = "Kullanıcı bulunamadı";
const registeredEmail = "E-posta zaten kayıtlı";
const registeredUsername = "Kullanıcı adı zaten kayıtlı";
const registeredBoth = "Kullanıcı adı ve e-posta zaten kayıtlı";

/* Dto */
const notAuthDto = {
    "username":"",
    "profilePhoto":"",
    "fullName":"",
    "date":""
}

export {
    tokenSecret,
    tokenExpired,
    headerTokenName,
    accessDenied,
    invalidToken,
    invalidIpAdress,
    sendInvalid,
    wrongLogin,
    notFoundUser,
    registeredUsername,
    registeredEmail,
    registeredBoth,
    notAuthDto
}
