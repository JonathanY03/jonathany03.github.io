"use client";
import "@/app/globals.css";
import React, {useEffect, useRef, useState} from "react";

const ROWS: number = 6;
const COLS: number = 7;
let MOVE: number = 0; 

const AI_PLAYER: Player = 2;
const HUMAN_PLAYER: Player = 1;
const MAX_DEPTH = 4;

type Player = 0 | 1 | 2;
type GameMode = "FRIEND" | "AI";

const createBoard = (): Player[][] => {
    return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));
}

function checkWin(
    board: Player[][],
    row: number,
    col: number,
    player: Player
): boolean {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    for (const [dr, dc] of directions) {
        let count = 1;
        count += countDir(board, row, col, dr, dc, player);
        count += countDir(board, row, col, -dr, -dc, player);
        if (count >= 4) return true;
    }
    return false;
}

function countDir(
    board: Player[][],
    row: number,
    col: number,
    dr: number,
    dc: number,
    player: Player
): number {
    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === player
    ) {
        count++;
        r += dr;
        c += dc;
    }
    return count;
}

function getAvailableRow(board: Player[][], col: number): number {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) return row;
    }
    return -1;
}

function getBestMove(board: Player[][], player: Player): number {
    for (let col = 0; col < COLS; col++) {  // win
        const row = getAvailableRow(board, col);
        if (row === -1) continue;

        const tempBoard = board.map(r => [...r]);
        tempBoard[row][col] = player;

        if (checkWin(tempBoard, row, col, player)) {
            return col;
        }
    }

    const opponent = player === AI_PLAYER ? HUMAN_PLAYER : AI_PLAYER;
    for (let col = 0; col < COLS; col++) {  // block
        const row = getAvailableRow(board, col);
        if (row === -1) continue;

        const tempBoard = board.map(r => [...r]);
        tempBoard[row][col] = opponent;

        if (checkWin(tempBoard, row, col, opponent)) {
            return col;
        }
    }

    let bestScore = -Infinity;
    let bestCol = -1;

    for (let col = 0; col < COLS; col++) {  // search
        const row = getAvailableRow(board, col);
        if (row === -1) continue;

        const tempBoard = board.map(r => [...r]);
        tempBoard[row][col] = player;

        const score = minimax(tempBoard, MAX_DEPTH - 1, -Infinity, Infinity, false);
        if (score > bestScore) {
            bestScore = score;
            bestCol = col;
        }
    }

    return bestCol;
}

function minimax(
    board: Player[][],
    depth: number,
    alpha: number,
    beta: number,
    maximizing: boolean
): number {
    if (depth === 0) return evaluateBoard(board);

    if (maximizing) {
        let maxEval = -Infinity;
        for (let col = 0; col < COLS; col++) {
            const row = getAvailableRow(board, col);
            if (row === -1) continue;

            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = AI_PLAYER;
            let evalScore = checkWin(newBoard, row, col, AI_PLAYER) ? 100000 : minimax(newBoard, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break; 
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let col = 0; col < COLS; col++) {
            const row = getAvailableRow(board, col);
            if (row === -1) continue;

            const newBoard = board.map(r => [...r]);
            newBoard[row][col] = HUMAN_PLAYER;
            let evalScore = checkWin(newBoard, row, col, HUMAN_PLAYER) ? -100000 : minimax(newBoard, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break; 
        }
        return minEval;
    }
}

function evaluateBoard(board: Player[][]): number {
    // TODO: Improve evaluation function

    let score = 0;

    score += centerBias(board, AI_PLAYER) * 6;
    score += countPatterns(board, AI_PLAYER, 3) * 100;
    score += countPatterns(board, AI_PLAYER, 2) * 10;
    score -= countPatterns(board, HUMAN_PLAYER, 3) * 120;
    score -= countPatterns(board, HUMAN_PLAYER, 2) * 15;

    return score;
}

function countPatterns(
    board: Player[][],
    player: Player,
    length: number
): number {
    let count = 0;
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            for (const [dr, dc] of directions) {
                let matches = 0;
                let valid = true;

                for (let i = 0; i < length; i++) {
                    const rr = r + dr * i;
                    const cc = c + dc * i;

                    if (
                        rr < 0 ||
                        rr >= ROWS ||
                        cc < 0 ||
                        cc >= COLS
                    ) {
                        valid = false;
                        break;
                    }

                    if (board[rr][cc] === player) {
                        matches++;
                    } else if (board[rr][cc] === 0) {
                        if (rr + 1 < ROWS && board[rr + 1][cc] === 0) {
                            valid = false;
                            break;
                        }
                    } else {
                        valid = false;
                        break;
                    }
                }
                if (valid && matches === length) count++;
            }
        }
    }
    return count;
}

function centerBias(board: Player[][], player: Player): number {
    const centerCol = Math.floor(COLS / 2);
    let count = 0;

    for (let r = 0; r < ROWS; r++) {
        if (board[r][centerCol] === player) count++;
    }

    return count;
}

const Page = () => {
    const [board, setBoard] = useState<Player[][]>(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
    const [winner, setWinner] = useState<Player | null>(null);
    const [mode, setMode] = useState<GameMode | null>("FRIEND");

    const makeAIMove = (boardState: Player[][]) => {
        const col = getBestMove(boardState, AI_PLAYER);
        if (col === -1) return;

        const row = getAvailableRow(boardState, col);
        if (row === -1) return;

        const newBoard = boardState.map(r => [...r]);
        newBoard[row][col] = AI_PLAYER;

        if (checkWin(newBoard, row, col, AI_PLAYER)) {
            setBoard(newBoard);
            setWinner(AI_PLAYER);
        } else {
            setBoard(newBoard);
            setCurrentPlayer(HUMAN_PLAYER);
        }
        MOVE++;
        if (MOVE >= ROWS * COLS) setWinner(0);
    };

    const dropPiece = (col: number) => {
        if (winner !== null) return;

        if (mode === "AI" && currentPlayer === AI_PLAYER) return;

        const row = getAvailableRow(board, col);
        if (row === -1) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = currentPlayer;

        if (checkWin(newBoard, row, col, currentPlayer)) {
            setBoard(newBoard);
            setWinner(currentPlayer);
            return;
        }

        setBoard(newBoard);
        MOVE++;
        if (MOVE >= ROWS * COLS) setWinner(0);

        if (mode === "AI" && currentPlayer === HUMAN_PLAYER) {
            setCurrentPlayer(AI_PLAYER);
            setTimeout(() => makeAIMove(newBoard), 300);
        } else {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
    };

    const reset = () => {
        setBoard(createBoard());
        setCurrentPlayer(1);
        setWinner(null);
        MOVE = 0;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="shadow-md rounded-lg bg-white w-[80%] p-8 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-3xl font-bold">Connect 4</h1>

                <div className="bg-black p-3 rounded-xl shadow-xl">
                    <div className="grid grid-cols-7 gap-2">
                    {board.map((row, r) =>
                        row.map((cell, c) => (
                            <button
                                key={`${r}-${c}`}
                                onClick={() => dropPiece(c)}
                                className={`
                                    w-14 h-14 rounded-full
                                    flex items-center justify-center
                                    transition
                                    ${cell === 0 && "bg-white hover:outline-blue-500 hover:outline hover:outline-4"}
                                    ${cell === 1 && "bg-red-500"}
                                    ${cell === 2 && "bg-yellow-400"}
                                `}
                            />
                        ))
                    )}
                    </div>
                </div>
                {winner !== null ? (
                    winner === 0 ? (
                        <p className="text-gray-500">Draw</p>
                    ) : winner === 1 ? (
                        <p className="text-red-400">Red wins</p>
                    ) : (
                        <p className="text-yellow-300">Yellow wins</p>
                    )
                ) : (
                    <p>
                        Turn: 
                        <span className={currentPlayer === 1 ? "text-red-400" : "text-yellow-300"}>
                            {currentPlayer === 1 ? " Red" : " Yellow"}
                        </span>
                    </p>
                )}

                <button
                    onClick={reset}
                    className="hover:underline"
                >
                    reset
                </button>

                <span>
                    <button onClick={() => {reset(); setMode("FRIEND");}} className={`hover:underline ${mode === "FRIEND" ? "underline" : ""}`}>
                        Play vs Friend
                    </button>
                    {" | "}
                    <button onClick={() => {reset(); setMode("AI");}} className={`hover:underline ${mode === "AI" ? "underline" : ""}`}>
                        Play vs AI
                    </button>
                </span>

                
            </div>
        </div>
    );
}

export default Page;
