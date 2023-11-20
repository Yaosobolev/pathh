import { SquareType } from "@/types/square_type";

export type AlgorithmsPropsType = {
  board: SquareType[][];
  start: number[];
  destination: number[];
  foundDestinationDelay: number;
  isVisualizationRunning: boolean;
  setBoard: React.Dispatch<React.SetStateAction<SquareType[][]>>;
  setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>;
};
