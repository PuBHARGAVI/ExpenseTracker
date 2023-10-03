export class __AuthenticationToken {
  static token;

  static getToken() {
    return __AuthenticationToken.token;
  }

  static setToken(currentToken) {
    this.token = currentToken;
  }
}