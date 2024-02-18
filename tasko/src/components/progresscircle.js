import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function ProgressCircle() {
  return (
    <CircularProgress
      label=""
      size="lg"
      value={30}
      color="success"
      formatOptions={{ style: "percent" }}
      showValueLabel={true}
      style={{ marginLeft: "0%" }}
    />
  );
}
