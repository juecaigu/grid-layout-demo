import GridLayout from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import React, { useEffect, useRef, useState } from "react";
import gridContent from "./GridContent";
import "./Layout.less";

interface ClientProps {
  t: number;
  l: number;
  h: number;
  w: number;
}

const createItemLayout = (type: string, widget: { w: number; h: number }) => {
  const newId = gridContent.addGridContent({ tag: "new", type });
  return { i: newId, x: 0, y: 0, w: widget.w, h: widget.h };
};

const equalsPos = (a: Layout, b: { x: number; y: number }) => {
  return a.x === b.x && a.y === b.y;
};

const calOffset = (
  client: { x: number; y: number } | null,
  layoutClient?: ClientProps
) => {
  if (client && layoutClient) {
    const gridh = layoutClient.h / 12;
    const gridw = layoutClient.w / 12;
    return {
      x: Math.floor((client.x - layoutClient.l) / gridw),
      y: Math.floor((client.y - layoutClient.t) / gridh),
    };
  }
  return { x: 0, y: 0 };
};

const Layout = (props: { width: number }) => {
  const { width } = props;
  const [layout, setLayout] = useState<Layout[]>([]);
  const currentId = useRef<string>("");
  const gridLayoutRef = useRef<HTMLDivElement>(null);
  const gridLayoutClient = useRef<ClientProps>({ w: 0, l: 0, t: 0, h: 0 });
  const [, drop] = useDrop({
    accept: "block",
    drop: () => {
      currentId.current = "";
    },
    hover: (_, monitor) => {
      if (gridContent.hasGridContent(currentId.current)) {
        const { x, y } = calOffset(
          monitor.getClientOffset(),
          gridLayoutClient.current
        );
        //update
        setLayout((prev) => {
          const index = prev.findIndex((item) => item.i === currentId.current);
          const prevWidget = prev[index];
          if (!equalsPos(prevWidget, { x, y })) {
            prev.splice(index, 1, { ...prevWidget, x, y });
            return [...prev];
          }
          return prev;
        });
      } else {
        const newLayout = createItemLayout("block", { w: 8, h: 2 });
        currentId.current = newLayout.i;
        setLayout((prev) => {
          return [...prev, newLayout];
        });
      }
    },
  });

  if (gridLayoutRef.current) {
    drop(gridLayoutRef.current);
  }

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (gridLayoutRef.current) {
        const { width, height, left, top } =
          gridLayoutRef.current.getBoundingClientRect();
        gridLayoutClient.current = { w: width, h: height, l: left, t: top };
      }
    });
    // 开始监听目标元素
    if (gridLayoutRef.current) {
      observer.observe(gridLayoutRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="rgl-target-canvas" ref={gridLayoutRef}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={width}
      >
        {layout.map((item) => {
          return (
            <div key={item.i} data-grid={item} className="rgl-component-block">
              {item.i}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default React.memo(Layout);
