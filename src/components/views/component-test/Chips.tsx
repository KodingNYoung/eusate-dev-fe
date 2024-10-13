import Typography from "@/components/atoms/Typography";
import Chip from "@/components/molecules/Chip";
import { FC } from "@/utils/types";
import React from "react";

const Chips: FC = () => {
  return (
    <div className="grid gap-5">
      <Typography variant="semibold-3xl">Buttons</Typography>
      <div className="flex items-center gap-3 flex-wrap">
        <Chip name="default">Default</Chip>
      </div>
    </div>
  );
};

export default Chips;
