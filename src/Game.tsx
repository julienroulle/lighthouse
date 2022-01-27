/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import { Game } from 'boardgame.io';

export interface TicTacToeState {
  cells: (null | string)[][];
}
  
export const TicTacToe: Game<TicTacToeState> = {
    name: "tic-tac-toe",

    setup: () => ({
        cells: Array.from(Array(14), () => new Array(14).fill(null)),
        limit: 10
    }),

    moves: {
        clickCell(G, ctx, row, clm) {
        if (G.cells[row][clm] === null) {
            G.cells[row][clm] = 'X'; //ctx.currentPlayer;
        }
        }
    },

    turn: { moveLimit: 1 },

    endIf: (G, ctx) => {
        // if (G.limit !== 0) {
        //  return { winner: ctx.currentPlayer };
        // }
    },

};
  
  export default TicTacToe;
  