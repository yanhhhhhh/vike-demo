import { Button } from "antd";
import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button
      type="primary"
      className={" px-2 py-1 text-xs font-medium uppercase leading-normal"}
      onClick={() => setCount((count) => count + 1)}
    >
      Counter {count}
    </Button>
  );
}
