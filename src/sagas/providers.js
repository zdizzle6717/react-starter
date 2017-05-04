'use strict';

import { all, put, call, takeLatest } from 'redux-saga/effects';
import ProviderConstants from '../constants/ProviderConstants';
import ProviderService from '../services/ProviderService';


// Get all providers
function* getProvidersSaga() {
  try {
    const providers = yield call(ProviderService.getAll);
    yield all([
      put({ 'type': ProviderConstants.GET_PROVIDERS_SUCCESS, providers })
    ]);
  } catch (error) {
    yield put({ 'type': ProviderConstants.GET_PROVIDERS_ERROR, error });
  }
}

function* getProvidersWatcher() {
  yield takeLatest(ProviderConstants.GET_PROVIDERS, getProvidersSaga);
}

export default getProvidersWatcher;
