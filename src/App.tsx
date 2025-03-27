import "./App.less";
import Layout from "./Layout/Layout";
import BlockComponent from "./Component/Block";
import { useEffect, useId, useState, useDeferredValue } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const id = useId();
  const [width, setWidth] = useState<number>(0);
  const deferredWidth = useDeferredValue(width);
  useEffect(() => {
    const target = document.getElementById(id);
    // 创建 ResizeObserver 实例
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setWidth(width);
      }
    });
    // 开始监听目标元素
    if (target) {
      observer.observe(target);
    }
  }, [id]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gld-area">
        <div className="gld-area-left gld-area-part">
          <BlockComponent />
        </div>
        <div className="gld-area-main gld-area-part" id={id}>
          <Layout width={deferredWidth} />
        </div>
        <div className="gld-area-right gld-area-part">right part</div>
      </div>
    </DndProvider>
  );
}

export default App;
