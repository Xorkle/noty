
/* IMPORT */

import * as React from 'react';
import {ipcRenderer as ipc} from 'electron';

/* TITLEBAR */

const Titlebar = ({ title, titles, onChange }) => (
  <div id="titlebar">
    <div id="close" onClick={() => ipc.send ( 'window-close' )}>
			<svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
				<polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
			</svg>
    </div>
    <div id="title">
      <span>{title}</span>
      <select value={title} onChange={onChange}>
        {titles.map ( title => (
          <option value={title} key={title}>{title}</option>
        ))}
      </select>
    </div>
  </div>
);

/* EXPORT */

export default Titlebar;
