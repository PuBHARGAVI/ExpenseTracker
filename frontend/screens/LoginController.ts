import {useInterpret, useSelector} from '@xstate/react';
import {
  events,
  loginMachine,
  selectAuthToken,
  selectLoginStatus,
  selectLogoutStatus,
  selectUserEmail,
  selectUserPassword,
} from '../machines/login';

export function useLoginScreen() {
  const service = useInterpret(loginMachine);

  return {
    ADD_EMAIL: (email: string) => service.send(events.ADD_EMAIL(email)),
    ADD_PASSWORD: (password: string) =>
      service.send(events.ADD_PASSWORD(password)),
    SUBMIT: () => {
      service.send(events.SUBMIT());
    },
    LOGOUT: () => {
      service.send(events.LOGOUT());
    },
    RESET_LOGOUT_STATUS: () => {
      service.send(events.RESET_LOGOUT_STATUS());
    },
    email: useSelector(service, selectUserEmail),
    password: useSelector(service, selectUserPassword),
    loginStatus: useSelector(service, selectLoginStatus),
    authToken: useSelector(service, selectAuthToken),
    logoutStatus: useSelector(service, selectLogoutStatus),
  };
}
