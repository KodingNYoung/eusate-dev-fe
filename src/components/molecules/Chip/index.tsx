import Typography from "@/components/atoms/Typography";
import { FC } from "@/utils/types";
import React from "react";

type Props = {
  name: string;
};

const Chip: FC<Props> = ({ children, name }) => {
  return (
    <label htmlFor={name}>
      <input type="checkbox" id={name} name={name} />
      <Typography>{children}</Typography>
    </label>
  );
};

export default Chip;
