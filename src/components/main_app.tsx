"use client";

import { SquareState } from "@/states/square_state";
import { useEffect, useState } from "react";
import { Board } from "./board";
import { Navbar } from "./navbar";
import { resetBoardStates } from "@/utilities/reset_board_states";
import { dijkstra } from "@/algorithms/path_finding/dijkstra";
import { SquareType } from "@/types/square_type";
import { AlgorithmsPropsType } from "./props/algorithms_props";
import { AlgorithmDescription } from "./algorithm_description";
import { Legend } from "./legend";
import { bfs } from "@/algorithms/path_finding/bfs";
import { dfs } from "@/algorithms/path_finding/dfs";
import { aStar } from "@/algorithms/path_finding/a_star";
import { generateRandomMaze } from "@/algorithms/maze_generation/random";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainApp() {
  const cellSize = 24;
  const navBarHeight = 136;
  const legendHeight = 164;
  // столб
  const [numRows, setNumRows] = useState(
    Math.floor(window.innerWidth / cellSize) - 2
  );
  //   строка
  const [numCols, setNumCols] = useState(
    Math.floor((window.innerHeight - navBarHeight - legendHeight) / cellSize) -
      2
  );

  //  проверка, изменил ли пользователь размер окна
  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    setBoard([...createBoard()]);
  }, [numRows, numCols]);

  // const pathRecreationDelay = 500;
  const foundDestinationDelay = 1000;
  // const weightedNodeWeight = 15;
  const pathfindingAlgorithms = ["BFS", "DFS", "Дейкстра", "A*"];
  const mazeGenerationAlgorithms = ["Случайно"];
  const [selectedPathFindingAlgorithm, setSelectedPathFindingAlgorithm] =
    useState("BFS");
  const [selectedMazeGenerationAlgorithm, setSelectedMazeGenerationAlgorithm] =
    useState("Случайно");
  // const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);
  const [isWeightNodePicked, setIsWeightNodePicked] = useState(false);

  const initialSquare: SquareType = {
    state: SquareState.path,
    weight: 1,
    classes: [],
  };

  const [board, setBoard] = useState(() => createBoard());

  let sourceX = -1,
    sourceY = -1,
    destinationX = -1,
    destinationY = -1;

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y].state === SquareState.source) {
        sourceX = x;
        sourceY = y;
      }
      if (board[x][y].state === SquareState.destination) {
        destinationX = x;
        destinationY = y;
      }
    }
  }

  const algorithmsProps: AlgorithmsPropsType = {
    board: board,
    setBoard: setBoard,
    start: [sourceX, sourceY],
    destination: [destinationX, destinationY],
    foundDestinationDelay: foundDestinationDelay,

    isVisualizationRunning: isVisualizationRunning,
    setIsVisualizationRunning: setIsVisualizationRunning,
  };

  function handleScreenSize() {
    // Вычислить количество строк и столбцов, исходя из доступного пространства и размера ячейки, вычесть 2, чтобы получить больше пространства
    const newNumRows = Math.floor(window.innerWidth / cellSize) - 2;
    const newNumCols =
      Math.floor(
        (window.innerHeight - navBarHeight - legendHeight) / cellSize
      ) - 2;

    setNumRows(newNumRows);
    setNumCols(newNumCols);
  }

  function createBoard(): SquareType[][] {
    const newBoard = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => ({ ...initialSquare }))
    );

    // Создайте копию поля и установите квадраты источника и назначения
    const updatedBoard = [...newBoard];
    updatedBoard[0][0].state = SquareState.source;

    // Создайте новый массив классов для квадрата назначения
    updatedBoard[numRows - 1][numCols - 1].state = SquareState.destination;
    updatedBoard[numRows - 1][numCols - 1].classes = ["destination"];

    return updatedBoard;
  }

  function handleVisualizeClick(): void {
    if (isVisualizationRunning) {
      return;
    }
    const newBoard = [...board];
    resetBoardStates(newBoard);
    setBoard([...newBoard]);
    switch (selectedPathFindingAlgorithm) {
      case "BFS":
        bfs(algorithmsProps);
        return;
      case "DFS":
        dfs(algorithmsProps);
        return;
      case "Дейкстра":
        dijkstra(algorithmsProps);
        return;
      case "A*":
        aStar(algorithmsProps);
        return;
    }
  }

  function handleGenerateMazeClick(): void {
    if (isVisualizationRunning) {
      return;
    }

    switch (selectedMazeGenerationAlgorithm) {
      case "Случайно":
        generateRandomMaze(algorithmsProps, isWeightNodePicked);
        return;
    }
  }

  function handleResetButtonClick(): void {
    setIsVisualizationRunning(false);
    const newBoard = [...board];
    resetBoardStates(newBoard, true);
    setBoard([...newBoard]);
  }

  function getIsWeightNodePicked(): boolean {
    return isWeightNodePicked;
  }

  return (
    <div>
      <Navbar
        isVisualizationRunning={isVisualizationRunning}
        setIsVisualizationRunning={setIsVisualizationRunning}
        selectedPathFindingAlgorithm={selectedPathFindingAlgorithm}
        setSelectedPathFindingAlgorithm={setSelectedPathFindingAlgorithm}
        selectedMazeGenerationAlgorithm={selectedMazeGenerationAlgorithm}
        setSelectedMazeGenerationAlgorithm={setSelectedMazeGenerationAlgorithm}
        isWeightNodeClicked={isWeightNodePicked}
        updateWeightNodeClicked={() =>
          setIsWeightNodePicked(!isWeightNodePicked)
        }
        pathfindingAlgorithms={pathfindingAlgorithms}
        mazeGenerationAlgorithms={mazeGenerationAlgorithms}
        handleGenerateMazeClick={handleGenerateMazeClick}
        handleVisualizeClick={handleVisualizeClick}
        handleResetButtonClick={handleResetButtonClick}
      />
      <AlgorithmDescription algorithm={selectedPathFindingAlgorithm} />
      <Board
        board={board}
        setBoard={setBoard}
        isVisualizationRunning={isVisualizationRunning}
        setIsVisualizationRunning={setIsVisualizationRunning}
        getIsWeightNodePicked={getIsWeightNodePicked}
      />
      <Legend />
      <ToastContainer />
    </div>
  );
}
