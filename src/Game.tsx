import { Game } from 'boardgame.io';

export interface TicTacToeState {
//   cells: (null | string)[][];
    players: {},
    diceValues: number[]
}

export function getInitialState(ctx, setupData) {
    const G = {
      players: {},
      diceValues: [],
      setupData: setupData
    };
  
    if (setupData !== undefined) {
      ctx.playOrderPos = setupData.playOrderPos
    }
  
    // Set up the game state for each player
    for (let j = 0; j < ctx.numPlayers; j++) {
      G.players[j] = {
        board: Array.from(Array(14), () => new Array(14).fill(null)),
        score: 0,
      };
    }
    G.diceValues = ctx.random!.Die(6, 2)
    // Our game state is ready to go– return it!
    return G;
  }
  
export const TicTacToe: Game<TicTacToeState> = {
    name: "tic-tac-toe",

    setup: getInitialState,

    moves: {
        rollDice(G, ctx) {
            // After a roll we remove how the last player finished.
            const diceValues = ctx.random!.Die(6, 2);

            G.diceValues = diceValues;
        },
        endTurn(G, ctx) {
            ctx.events!.endTurn()
        },
        clickCell(G, ctx, row, clm) {
            if (G.players[ctx.currentPlayer].board[row][clm] === null) {
                G.players[ctx.currentPlayer].board[row][clm] = 'X'; //ctx.currentPlayer;
            }
        }
        
    },

    turn: {},

    endIf: (G, ctx) => {
        // if (G.limit !== 0) {
        //  return { winner: ctx.currentPlayer };
        // }
    },

};
  
  export default TicTacToe;
  