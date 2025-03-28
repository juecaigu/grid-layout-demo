import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CustomeDragLayer from "../DragLayout/CustomeDragLayer";

const Block: React.FC = () => {
  const [, drag, dragPreview] = useDrag({
    type: "block",
    item: { type: "block", itemName: "block" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <div className="gld-area-com">
      <div
        ref={drag}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          backgroundColor: "antiquewhite",
        }}
      >
        block
      </div>
      <CustomeDragLayer />
    </div>
  );
};

export default Block;
