import Icon from "@/components/icons";
import { counterAtom } from "@/stores/couter";
import { Button } from "antd";
import { useAtomValue } from "jotai";
import React, { useState } from "react";

export function CounterNumber() {
  const counterValue = useAtomValue(counterAtom);

  return <div className="text-black">Counter {counterValue}</div>;
}
