import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import { ROUTES } from "@/utils/constants"
import { formatComma, round } from "@/utils/helpers"
import { FC } from "@/utils/types"
import dayjs from "dayjs"
import Link from "next/link"
import React from "react"

type Props = {
  start: string
  end: string
}

const WalletOverview: FC<Props> = ({}) => {
  return (
    <ChartCard
      title="Wallet overview"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden",
        main: "!py-0 !px-0 overflow-y-auto max-h-[290px]",
      }}
    >
      <div className="grid gap-6 px-6 pt-1.5">
        <div className="flex items-center justify-between gap-6">
          <div className="grid gap-1">
            <Typography
              as="div"
              variant="medium-sm"
              className="text-gray-400 flex items-center gap-2"
            >
              <Icon name="icon-wallet" size={18} />
              <span>Current balance</span>
            </Typography>
            <Typography className="text-bold-3xl text-black">
              ${formatComma(round(2342.454, 2))}
            </Typography>
          </div>
          <Button
            variant="tetiary"
            className="py-2 px-3"
            startContent={<Icon name="icon-plus" size={20} />}
          >
            Top up
          </Button>
        </div>
        <div className="grid gap-1.5">
          <Typography
            as="div"
            variant="medium-sm"
            className="text-gray-400 flex items-center gap-2"
          >
            <Icon name="icon-receipt-2" size={18} />
            <span>Recent transactions</span>
          </Typography>
          <table className="border-spacing-y-1.5 border-separate">
            <tbody>
              <tr>
                <td className="px-6 py-5 rounded-l-xl bg-gray-25 w-full">
                  <div className="grid gap-1">
                    <Typography variant="medium-sm" className="text-black">
                      NEW AGENT
                    </Typography>
                    <Typography
                      variant="regular-sm"
                      className="sm:hidden text-gray-500"
                    >
                      {dayjs().format("DD MMM, YYYY. hh:mmA")}
                    </Typography>
                  </div>
                </td>
                <td className="px-6 py-5 bg-gray-25 hidden sm:table-cell whitespace-nowrap">
                  <Typography variant="regular-sm" className="hidden sm:inline">
                    {dayjs().format("DD MMM, YYYY. hh:mmA")}
                  </Typography>
                </td>
                <td
                  align="right"
                  className="px-6 py-5 rounded-r-xl bg-gray-25 whitespace-nowrap"
                >
                  <Typography
                    variant="semibold-sm"
                    className="hidden sm:inline text-success-600"
                  >
                    +${(90).toFixed(2)}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-5 rounded-l-xl bg-gray-25 w-full">
                  <div className="grid gap-1">
                    <Typography variant="medium-sm" className="text-black">
                      NEW AGENT
                    </Typography>
                    <Typography
                      variant="regular-sm"
                      className="sm:hidden text-gray-500"
                    >
                      {dayjs().format("DD MMM, YYYY. hh:mmA")}
                    </Typography>
                  </div>
                </td>
                <td className="px-6 py-5 bg-gray-25 hidden sm:table-cell whitespace-nowrap">
                  <Typography variant="regular-sm" className="hidden sm:inline">
                    {dayjs().format("DD MMM, YYYY. hh:mmA")}
                  </Typography>
                </td>
                <td
                  align="right"
                  className="px-6 py-5 rounded-r-xl bg-gray-25 whitespace-nowrap"
                >
                  <Typography
                    variant="semibold-sm"
                    className="hidden sm:inline text-success-600"
                  >
                    +${(90).toFixed(2)}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-5 rounded-l-xl bg-gray-25 w-full">
                  <div className="grid gap-1">
                    <Typography variant="medium-sm" className="text-black">
                      NEW AGENT
                    </Typography>
                    <Typography
                      variant="regular-sm"
                      className="sm:hidden text-gray-500"
                    >
                      {dayjs().format("DD MMM, YYYY. hh:mmA")}
                    </Typography>
                  </div>
                </td>
                <td className="px-6 py-5 bg-gray-25 hidden sm:table-cell whitespace-nowrap">
                  <Typography variant="regular-sm" className="hidden sm:inline">
                    {dayjs().format("DD MMM, YYYY. hh:mmA")}
                  </Typography>
                </td>
                <td
                  align="right"
                  className="px-6 py-5 rounded-r-xl bg-gray-25 whitespace-nowrap"
                >
                  <Typography
                    variant="semibold-sm"
                    className="hidden sm:inline text-success-600"
                  >
                    +${(90).toFixed(2)}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer className="border-t border-[#e6e6e6] bg-white py-4 flex items-center justify-center sticky bottom-0">
        <Link
          href={`${ROUTES.USAGE_AND_BILLING}`}
          className="flex items-center justify-center gap-1 leading-none group/link"
        >
          <Typography
            as="span"
            className="text-medium-sm text-gray-500 group-hover/link:text-gradient"
          >
            See all transactions
          </Typography>
          <Icon
            name="icon-arrow-right"
            size={20}
            className="text-gray-500 group-hover/link:text-gradient"
          />
        </Link>
      </footer>
    </ChartCard>
  )
}

export default WalletOverview
