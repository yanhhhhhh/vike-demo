import { counterAtom } from "@/stores/couter";
import { Button } from "antd";
import { useAtom } from "jotai";
import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useAtom(counterAtom);

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
