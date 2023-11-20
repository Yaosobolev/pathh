export type NavbarProps = {
  isVisualizationRunning: boolean;
  setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPathFindingAlgorithm: string;
  selectedMazeGenerationAlgorithm: string;
  setSelectedPathFindingAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMazeGenerationAlgorithm: React.Dispatch<
    React.SetStateAction<string>
  >;

  isWeightNodeClicked: boolean;
  updateWeightNodeClicked: () => void;
  pathfindingAlgorithms: string[];
  mazeGenerationAlgorithms: string[];
  handleGenerateMazeClick: () => void;
  handleVisualizeClick: () => void;
  handleResetButtonClick: () => void;
};
