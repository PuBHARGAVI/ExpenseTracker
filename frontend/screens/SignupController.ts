import {useInterpret, useSelector} from '@xstate/react';
import {
  events,
  selectAuthToken,
  selectSignupStatus,
  selectUserEmail,
  selectUserPassword,
  signupMachine,
} from '../machines/signup';

export function useSingupScreen() {
  const service = useInterpret(signupMachine);

  return {
    ADD_EMAIL: (email: string) => service.send(events.ADD_EMAIL(email)),
    ADD_PASSWORD: (password: string) =>
      service.send(events.ADD_PASSWORD(password)),
    SUBMIT: () => service.send(events.SUBMIT()),
    email: useSelector(service, selectUserEmail),
    password: useSelector(service, selectUserPassword),
    signupStatus: useSelector(service, selectSignupStatus),
    authToken: useSelector(service, selectAuthToken),
  };
}
