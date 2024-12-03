import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"

const Buttons: FC = () => {
  return (
    <div className="grid gap-5">
      <Typography variant="semibold-3xl">Buttons</Typography>
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="primary" size="lg" className="px-10">
          Primary
        </Button>
        <Button variant="outlined" size="lg" className="px-10">
          Outlined
        </Button>
        <Button variant="text" size="lg" className="px-10">
          Text
        </Button>
        <Button variant="tetiary" size="lg" className="px-10" autoFocus>
          Tetiary
        </Button>
        <Button variant="tetiaryText" size="lg" className="px-10">
          Tetiary Text
        </Button>
        <Button variant="success" size="lg" className="px-10">
          Success
        </Button>
        <Button variant="info" size="lg" className="px-10">
          Info
        </Button>
        <Button variant="warning" size="lg" className="px-10">
          Warning
        </Button>
        <Button variant="error" size="lg" className="px-10">
          Error
        </Button>
      </div>
    </div>
  )
}

export default Buttons
