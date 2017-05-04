'use strict';

import { all, fork } from 'redux-saga/effects';
import getContactsWatcher from './contacts';
import getProvidersWatcher from './providers';

export default function* gatherWatcherSagas() {
  yield all([
		fork(getContactsWatcher),
		fork(getProvidersWatcher)
	]);
}
