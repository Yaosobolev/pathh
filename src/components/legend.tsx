"use client";

import { SourceSVG } from "./icons/source";

import "./css/legend.css";
import { DestinationSVG } from "./icons/destination";
import { ObstacleSVG } from "./icons/obstacle";

export const Legend = () => {
  return (
    <div className="w-full mt-8 flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 legend">
      <div className="flex items-center">
        <SourceSVG />
        <span>Начало</span>
      </div>
      <div className="flex items-center">
        <DestinationSVG />
        <span>Конец</span>
      </div>
      <div className="flex items-center">
        <ObstacleSVG />
        <span>Препятствие</span>
      </div>
    </div>
  );
};
