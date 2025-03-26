import { Button } from "antd";

const RButton: React.FC = () => {
  return (
    <div className="gld-area-com">
      <Button type="primary">按钮</Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          backgroundColor: "antiquewhite",
        }}
      >
        组件tab
      </div>
    </div>
  );
};

export default RButton;
