'use strict';

// NOTE: Returns a formatted date. 'timezone' and 'format' arguments are optional
// NOTE: Be aware of the timezone set for the current database

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDate = function formatDate(input) {
	var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Etc/GMT';
	var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'MMMM D, YYYY';

	if (!input) {
		console.log('formatJSONDate.js: Date is undefined');
	}
	var output = _momentTimezone2.default.tz(input, timezone).format(format);
	return output;
};exports.default = formatDate;