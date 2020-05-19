import { takeEvery, call, put, select } from 'redux-saga/effects';
import { api, request, routes } from 'utils';
import { push } from 'connected-react-router';
import { makeSelectToken } from 'containers/App/selectors';
import { LOGOUT } from './constants';
import { logoutSuccessAction, logoutErrorAction } from './actions';

export function* logout() {
  const { accessToken } = yield select(makeSelectToken());
  const requestURL = api.auth.logout;
  const requestParameters = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    yield call(request, requestURL, requestParameters);
    yield put(logoutSuccessAction());
    yield put(push(routes.home));
  } catch (error) {
    yield put(logoutErrorAction(error));
  }
}

export default function* loginPageSaga() {
  yield takeEvery(LOGOUT, logout);
}
