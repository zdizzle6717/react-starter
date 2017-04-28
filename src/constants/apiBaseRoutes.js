'use strict';

import {apiPort} from '../../envVariables';

let apiRoutes =  {
	'dev': `http://localhost:${apiPort}/api/`
};

export {
	apiRoutes
};
