import {getUniqueId} from 'react-native-device-info';

export class __AuthenticationToken {
  static token;

  static getToken() {
    return __AuthenticationToken.token;
  }

  static setToken(currentToken) {
    this.token = currentToken;
  }
}

export class __DeviceId {
  static deviceId = getUniqueId()

  static getDeviceId(){
    return __DeviceId.deviceId
  }
}