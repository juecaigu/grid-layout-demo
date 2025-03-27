import GridLayout from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import React, { useRef, useState } from "react";
import "./Layout.less";

const Layout = (props: { width: number }) => {
  const { width } = props;
  const [layout, setLayout] = useState<Layout[]>([]);
  const gridLayoutRef = useRef(null);
  const [, drop] = useDrop({
    accept: "block",
    drop: (item) => {
      console.log("itme", item);
    },
    hover: (item, monitor) => {
      const initPos = monitor.getInitialClientOffset() || { x: 0, y: 0 }; // 在列表中的初始位置
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 }; // 拖动放置之后的偏移量
      console.log("hover", initPos?.x + delta?.x, delta.y + initPos.y);
    },
  });
  return (
    <div className="rgl-target-canvas" ref={drop}>
      <GridLayout
        ref={gridLayoutRef.current}
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={width}
        onDrop={(item) => {
          console.log("item", item);
        }}
      ></GridLayout>
    </div>
  );
};

export default React.memo(Layout);
