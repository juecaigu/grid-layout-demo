import { useState } from "react";
import { Button } from "antd";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <Button type="primary">测试</Button>;
}

export default App;
