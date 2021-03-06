
/* IMPORT */

import * as React from 'react';
import {render as reactRender} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from 'ui/app/index';

/* RENDER */

function render () {

  reactRender (
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById ( 'react-root' )
  );

}

/* EXPORT */

export default render;
