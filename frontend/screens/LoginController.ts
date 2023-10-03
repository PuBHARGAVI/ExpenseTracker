import {useInterpret, useSelector} from '@xstate/react';
import {
  events,
  loginMachine,
  selectAuthToken,
  selectLoginStatus,
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
    email: useSelector(service, selectUserEmail),
    password: useSelector(service, selectUserPassword),
    loginStatus: useSelector(service, selectLoginStatus),
    authToken: useSelector(service, selectAuthToken),
  };
}
