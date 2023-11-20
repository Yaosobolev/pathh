"use client";

import React from "react";
import { NavbarProps } from "./props/navbar_props";

export const Navbar = (props: NavbarProps) => {
  const handlePathFindingAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setSelectedPathFindingAlgorithm(event.target.value);
  };
  const handleMazeGenerationAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setSelectedMazeGenerationAlgorithm(event.target.value);
  };

  return (
    <nav className="bg-neutral-700 p-4 w-full">
      <div className="container flex items-center justify-between max-w-full">
        <div className="text-white ml-4">
          <h1 className="text-xl font-semibold">
            Визуализация алгоритма для поиска выхода в лабиринте
          </h1>
        </div>
        <div className="sm:ml-8 ml-auto max-w-full overflow-x-auto p-4">
          <div className="flex space-x-4 items-center">
            <button
              disabled={props.isVisualizationRunning}
              className="ml-2 mr-2 text-white px-4 py-2 rounded-md"
              style={props.isWeightNodeClicked ? { color: "#1E90FF" } : {}}
              onClick={props.updateWeightNodeClicked}
            >
              {" "}
            </button>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label htmlFor="algorithm" className="text-white">
                Генерация припятствий:
              </label>
              <select
                disabled={props.isVisualizationRunning}
                id="algorithm"
                className="bg-white text-gray-800 p-2 rounded-md"
                value={props.selectedMazeGenerationAlgorithm}
                onChange={handleMazeGenerationAlgorithmChange}
              >
                {props.mazeGenerationAlgorithms.map((algorithm) => (
                  <option key={algorithm} value={algorithm}>
                    {algorithm}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={props.isVisualizationRunning}
              className="ml-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={props.handleGenerateMazeClick}
              style={
                props.isVisualizationRunning
                  ? { backgroundColor: "rgb(197, 197, 197)", color: "#4d4d4d" }
                  : {}
              }
            >
              Генерировать
            </button>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label htmlFor="algorithm" className="text-white">
                Алгоритм для поиска:
              </label>
              <select
                disabled={props.isVisualizationRunning}
                id="algorithm"
                className="ml-3 bg-white text-gray-800 p-2 rounded-md"
                value={props.selectedPathFindingAlgorithm}
                onChange={handlePathFindingAlgorithmChange}
              >
                {props.pathfindingAlgorithms.map((algorithm) => (
                  <option key={algorithm} value={algorithm}>
                    {algorithm}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={props.isVisualizationRunning}
              className="ml-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={props.handleVisualizeClick}
              style={
                props.isVisualizationRunning
                  ? { backgroundColor: "rgb(197, 197, 197)", color: "#4d4d4d" }
                  : {}
              }
            >
              Показать
            </button>
            <button
              disabled={props.isVisualizationRunning}
              className="ml-2 mr-2 text-white px-4 py-2 rounded-md"
              onClick={props.handleResetButtonClick}
            >
              {" "}
              Очистить поле
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
