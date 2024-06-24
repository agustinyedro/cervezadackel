class Validaciones {
  static username(username) {
    if (typeof username !== "string") {
      throw new Error("Username must be a string");
    }
    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }
  }

  static password(password) {
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }
}

module.exports = Validaciones;
