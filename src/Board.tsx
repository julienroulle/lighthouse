/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { BoardProps } from 'boardgame.io/react';
import { TicTacToeState } from './Game';
import { DiceBoard } from "./DiceBoard";

import './board.css';

interface TicTacToeProps extends BoardProps<TicTacToeState> {}


const blueCells  = [30, 32, 33, 34, 44, 45, 47, 59, 60, 62, 73, 75, 76, 87, 88]
const purpleCells = [37, 38, 49, 50, 51, 53, 63, 64, 65, 77, 78, 79, 81, 92, 93, 94, 95]
const orangeCells = [89, 90, 100, 102, 103, 104, 114, 115, 116, 117, 118, 129, 130, 131, 142, 144, 146, 156, 157, 159, 160]
const greenCells  = [106, 107, 108, 109, 119, 120, 121, 122, 133, 134, 136, 137, 147, 148, 149, 151, 163, 164, 165]
const blackCells  = [61, 66, 143, 150]
const greyCells  = [31, 46, 48, 52, 58, 67, 64, 74, 80, 86, 101, 123, 128, 135, 158, 162]

export const Board = ({ G, ctx, moves, undo }: TicTacToeProps) => {
    const diceBoard = (
        <DiceBoard
          {...{
            diceValues: G.diceValues,
            color: 1,
          }}
        />
      );
    const checkIsActive = (row, clm) => {
        if (G.cells[row][clm] !== null) return false;
        return true;
      }

  const onClick = (row, clm) => {
    if (checkIsActive(row, clm)) {
      moves.clickCell(row, clm);
    }
  };

    let tbody: Array<JSX.Element> = [];
    for (let row = 0; row < 14; row++) {
        let cells: Array<JSX.Element> = [];
        for (let clm = 0; clm < 14; clm++) {
            const id = 14 * row + clm;
            let color = ''
            if (blueCells.includes(id)) {
                color = 'active blue'
            } else if (purpleCells.includes(id)) {
                color = 'active purple'
            } else if (orangeCells.includes(id)) {
                color = 'active orange'
            } else if (greenCells.includes(id)) {
                color = 'active green'
            } else if (blackCells.includes(id)) {
                color = 'black'
            } else if (greyCells.includes(id)) {
                color = 'active grey'
            }
        cells.push(
            <td
                key={id}
                className={checkIsActive(row, clm) ? `${color}` : ''}
                onClick={() => onClick(row, clm)}
                >
                {G.cells[row][clm]}
            </td>
        );
        }
        tbody.push(<tr key={row}>{cells}</tr>);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
            </div>
            <div style={{height: 200, width: 100, margin: 50}}>
                <button style={{height: 50, width: 100, marginBottom: 25}} onClick={() => undo()}>Undo</button>
                <button style={{height: 50, width: 100, marginBottom: 25}} onClick={() => moves.rollDice()}>Roll dice</button>
                {diceBoard}
            </div>
            {/* <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
            </div> */}
        </div>
    );
}

export default Board;