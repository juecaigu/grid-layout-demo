import { useDragLayer } from "react-dnd";
import { useEffect, useRef } from "react";

const CustomeDragLayer = () => {
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(), // 获取拖动项的类型
      isDragging: monitor.isDragging(), // 获取拖动状态
      currentOffset: monitor.getSourceClientOffset(), // 获取拖动项的当前偏移量
    };
  });

  useEffect(() => {
    const dragStartEvent = (e: DragEvent) => {
      dragStartOffset.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("dragstart", dragStartEvent);
    return () => {
      document.removeEventListener("dragstart", dragStartEvent);
    };
  }, []);

  if (!isDragging) {
    return null;
  }

  return (
    <div
      style={{
        width: "80px",
        height: "32px",
        border: "1px solid #ccc",
        backgroundColor: "#ddd",
        transform: `translate(${
          dragStartOffset.current.x + (currentOffset?.x || 0)
        }px,${dragStartOffset.current.y + (currentOffset?.y || 0)}px)`,
        pointerEvents: "none",
        top: "0",
        left: "0",
        position: "fixed",
      }}
    >
      <span>{item.itemName || "dragItem"}</span>
    </div>
  );
};

export default CustomeDragLayer;
