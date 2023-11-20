import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { SquareState } from "@/states/square_state";
import { Cell } from "@/types/cell_type";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { recreatePath } from "../../utilities/recreate_path";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function dijkstra(props: AlgorithmsPropsType): Promise<void> {
  await props.setIsVisualizationRunning(true);

  const numRows: number = props.board.length;
  const numCols: number = props.board[0].length;

  // Определите направления: вверх, вниз, влево, вправо
  const directions: number[][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  // Создайте массив для хранения расстояний до каждой ячейки
  const distances: number[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(Number.MAX_VALUE)
  );

  // Создание приоритетной очереди (min heap) для алгоритма Дейкстры
  const priorityQueue: Cell[] = [];

  // Инициализация стартовой ячейки
  const startCell: Cell = {
    row: props.start[0],
    col: props.start[1],
    distance: 0,
    parent: null,
  };

  priorityQueue.push(startCell);
  distances[startCell.row][startCell.col] = 0;

  while (priorityQueue.length > 0) {
    // Получить ячейку с минимальным расстоянием
    priorityQueue.sort(
      (a, b) => distances[a.row][a.col] - distances[b.row][b.col]
    );
    const currentCell: Cell = priorityQueue.shift() as Cell;

    // Проверьте, достигли ли мы места назначения
    if (
      props.board[currentCell.row][currentCell.col].state ===
      SquareState.destination
    ) {
      recreatePath(currentCell, props);
      return;
    }

    markAsVisited(currentCell, props);

    // Изучить все возможные направления
    for (const [dx, dy] of directions) {
      const newRow: number = currentCell.row + dx;
      const newCol: number = currentCell.col + dy;

      // Проверьте, находится ли новая позиция в пределах платы
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        if (props.board[newRow][newCol].state !== SquareState.obstacle) {
          // Вычислить ориентировочное расстояние до соседа
          let tentativeDistance: number =
            distances[currentCell.row][currentCell.col] +
            props.board[newRow][newCol].weight;

          // Проверьте, не меньше ли новое расстояние, чем текущее
          if (tentativeDistance < distances[newRow][newCol]) {
            distances[newRow][newCol] = tentativeDistance;

            // Записать соседа с обновленным расстоянием
            priorityQueue.push({
              row: newRow,
              col: newCol,
              distance: tentativeDistance,
              parent: currentCell,
            });

            await new Promise((resolve) => setTimeout(resolve));
          }

          if (props.board[newRow][newCol].state === SquareState.destination) {
            break;
          }
        }
      }
    }
  }
  showThereIsNoPathError();
  await props.setIsVisualizationRunning(false);
}
