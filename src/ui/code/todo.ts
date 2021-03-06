
/* IMPORT */

import Utils from './utils';

/* TODO */

const Todo = {

  CHECKBOX: '☐',
  CHECKMARK: '✔',
  CANCELMARK: '✘',

  boxRe: /^[^\S\n]*((?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ \])[^\n@]*)/,
  doneRe: /^[^\S\n]*((?:[✔✓☑+]|\[[xX+]\])[^\n@]*)/,
  cancelRe: /^[^\S\n]*((?!--|––|——)(?:[✘xX]|\[-\])[^\n@]*)/,
  projectRe: /^(?![^\S\n]*(?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]\])[^\n]*)[^\S\n]*(.+:[^\S\n]*)(?:(?=@(?!.+ +[^@]))|$)/,

  getTokens () {

    return {
      start: [
        { sol: true, regex: Todo.boxRe, token: 'todo-box' },
        { sol: true, regex: Todo.doneRe, token: 'todo-done' },
        { sol: true, regex: Todo.cancelRe, token: 'todo-cancel' },
        { sol: true, regex: Todo.projectRe, token: 'todo-project' }
      ]
    };

  },

  toggleToken ( cm, token, removeToken, insertToken? ) {

    Utils.walkSelections ( cm, ( line, lineNr ) => {

      const tokenIndex = line.indexOf ( `${token} ` ),
            otherIndex = line.search ( `${Todo.CHECKBOX}|${Todo.CHECKMARK}|${Todo.CANCELMARK} ` );

      if ( tokenIndex >= 0 ) {

        const replacement = removeToken ? `${removeToken} ` : '';

        Utils.replace ( cm, lineNr, replacement, tokenIndex, tokenIndex + 2 );

      } else if ( otherIndex >= 0 ) {

        Utils.replace ( cm, lineNr, `${token} `, otherIndex, otherIndex + 2 );

      } else if ( insertToken ) {

        let spaceIndex = line.search ( /\S/ );

        if ( spaceIndex === -1 ) spaceIndex = line.length;

        Utils.replace ( cm, lineNr, `${insertToken} `, spaceIndex );

      }

    });

  },

  toggleCheckbox ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKBOX, '', Todo.CHECKBOX );

  },

  toggleCheckmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CHECKMARK, Todo.CHECKBOX, Todo.CHECKMARK );

  },

  toggleCancelmark ( cm ) {

    Todo.toggleToken ( cm, Todo.CANCELMARK, Todo.CHECKBOX, Todo.CANCELMARK );

  }

};

/* EXPORT */

export default Todo;
