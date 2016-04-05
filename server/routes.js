'use strict';

import tech from './api/tech';

export default (app) => {
    app.use('/api/tech', tech);
};
