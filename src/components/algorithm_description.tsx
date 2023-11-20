import { AlgorithmDescriptionProps } from "./props/algorithm_description_props";

export const AlgorithmDescription = (props: AlgorithmDescriptionProps) => {
  let description = "";

  switch (props.algorithm) {
    case "BFS":
      description = "это алгоритм - Breadth-First Search ";
      break;
    case "DFS":
      description = "это алгоритм -  Depth-First Search ";
      break;
    case "A*":
      description = "это алгоритм - A*";
      break;
    case "Дейкстра":
      description = "это алгоритм - Дейкстра";
      break;

    default:
      description = "Выберите алгоритм";
      break;
  }

  return (
    <div className="text-xl text-center mt-8 mb-2 mx-3">
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};
