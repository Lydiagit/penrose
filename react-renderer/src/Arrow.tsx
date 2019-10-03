import * as React from "react";

import { IGPIPropsDraggable } from "./types";
import draggable from "./Draggable";
import { toScreen, toHex, Arrowhead, arrowheads } from "./Util";

class Arrow extends React.Component<IGPIPropsDraggable> {
  public render() {
    const { shape, canvasSize, onClick } = this.props;
    const style = shape.style.contents;
    const [sx, sy] = toScreen(
      [shape.startX.contents, shape.startY.contents],
      canvasSize
    );
    const [ex, ey] = toScreen(
      [shape.endX.contents, shape.endY.contents],
      canvasSize
    );
    const color = toHex(shape.color.contents);
    const alpha = shape.color.contents[3];
    const arrowheadStyle = shape.arrowheadStyle.contents;
    const arrowheadSize = shape.arrowheadSize.contents;
    const arrowHeadId = "arrowhead_" + shape.name.contents;
    const strokeDasharray = style === "dashed" ? "7, 5" : "";

    // HACK: fix arrow position
    const { width, height } = arrowheads[arrowheadStyle];
    const slope = Math.atan2(ey - sy, ex - sx);
    const [offsetX, offsetY] = [
      (Math.cos(slope) * width) / 2,
      (Math.sin(slope) * height) / 2
    ];

    return (
      <g pointerEvents="bounding-box" onMouseDown={onClick}>
        <Arrowhead
          id={arrowHeadId}
          color={color}
          opacity={alpha}
          style={arrowheadStyle}
          size={arrowheadSize}
        />
        <path
          d={`M${sx} ${sy} L${ex - offsetX} ${ey - offsetY}`}
          fill={color}
          stroke={color}
          fillOpacity={alpha}
          strokeOpacity={alpha}
          strokeWidth={shape.thickness.contents}
          strokeDasharray={strokeDasharray}
          markerEnd={`url(#${arrowHeadId})`}
        />
        <title>{shape.name.contents}</title>
      </g>
    );
  }
}
export default draggable(Arrow);