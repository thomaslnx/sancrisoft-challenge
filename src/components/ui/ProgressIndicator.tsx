"use client";

import { FC } from "react";

import { ProgressIndicatorProps } from "@/types";
import { StatusBadge } from "@/components/styles";

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  $status,
}: ProgressIndicatorProps) => {
  if ($status === "idle") {
    return null;
  }

  const getStatusText = () => {
    switch ($status) {
      case "in-progress":
        return "In progress";
      case "success":
        return "Success";
      case "error":
        return "Error";
      default:
        return "";
    }
  };

  return <StatusBadge $status={$status}>{getStatusText()}</StatusBadge>;
};
