import { SquareState } from "@/states/square_state";
import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";
import { recreatePath } from "../../utilities/recreate_path";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function dfs(props: AlgorithmsPropsType): Promise<void> {
  await props.setIsVisualizationRunning(true);

  const numRows: number = props.board.length;
  const numCols: number = props.board[0].length;

  const directions: number[][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  // Создание стека для DFS
  const stack: Cell[] = [];
  const startingCell: Cell = {
    row: props.start[0],
    col: props.start[1],
    distance: 0,
    parent: null,
  };

  stack.push(startingCell);

  // Пометить начальную ячейку как посещенную
  const visited: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  visited[props.start[0]][props.start[1]] = true;

  while (stack.length > 0) {
    const currentCell = stack.pop() as Cell;

    // Проверьте, достигли ли мы места назначения
    if (
      props.board[currentCell.row][currentCell.col].state ===
      SquareState.destination
    ) {
      recreatePath(currentCell, props);
      return;
    }

    markAsVisited(currentCell, props);

    visited[currentCell.row][currentCell.col] = true;

    // Изучить все возможные направления
    for (const [dx, dy] of directions) {
      const newRow: number = currentCell.row + dx;
      const newCol: number = currentCell.col + dy;

      // Проверьте, находится ли новая позиция внутри платы и не посещается ли она
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        !visited[newRow][newCol]
      ) {
        if (props.board[newRow][newCol].state !== SquareState.obstacle) {
          // Поместить новую ячейку в стек
          stack.push({
            row: newRow,
            col: newCol,
            distance: currentCell.distance + props.board[newRow][newCol].weight,
            parent: currentCell,
          });

          await new Promise((resolve) => setTimeout(resolve));
        }
      }
    }
  }
  showThereIsNoPathError();
  await props.setIsVisualizationRunning(false);
}
