'use strict';

import { all, put, call, takeLatest } from 'redux-saga/effects';
import ContactConstants from '../constants/ContactConstants';
import ContactService from '../services/ContactService';


// Get all contacts
function* getContactsSaga() {
  try {
    const contacts = yield call(ContactService.getAll);
    yield all([
      put({ 'type': ContactConstants.GET_CONTACTS_SUCCESS, contacts })
    ]);
  } catch (error) {
    yield put({ 'type': ContactConstants.GET_CONTACTS_ERROR, error });
  }
}

function* getContactsWatcher() {
  yield takeLatest(ContactConstants.GET_CONTACTS, getContactsSaga);
}

export default getContactsWatcher;
