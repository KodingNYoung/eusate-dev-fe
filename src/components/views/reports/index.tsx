import PageHeader from "@/components/molecules/PageHeader"
import { FC } from "@/utils/types"
import React from "react"
import { REPORTS } from "./utils"
import Image from "next/image"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"
import Link from "next/link"
import { ROUTES } from "@/utils/constants"

const Reports: FC = () => {
  return (
    <div className="bg-white sm:rounded-x20 px-4 sm:px-5 py-3 sm:py-4.5 h-full flex flex-col gap-4 sm:gap-5 relative">
      <PageHeader
        title="Reports"
        description="Empower your AI with curated knowledge."
      />
      <section className="grid gap-5">
        {REPORTS.map((report) => {
          return (
            <Link
              href={`${ROUTES.REPORT}/${report.id}`}
              target="_blank"
              rel="noreferrer"
              className="border border-gray-100 p-4 sm:p-5 rounded-x20 flex flex-col md:flex-row gap-5 sm:gap-8 md:items-center"
              key={report.id}
            >
              <div className="flex justify-center md:justify-end bg-gray-25 border border-gray-50 rounded-xl w-full h-[106px] md:w-fit md:h-fit overflow-hidden">
                <Image
                  src={report.img}
                  className="hidden md:block"
                  height={160}
                  width={200}
                  alt=""
                />
                <Image
                  src={report.imgSm}
                  className="md:hidden"
                  height={160}
                  width={200}
                  alt=""
                />
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Typography className="text-semibold-sm sm:text-semibold-lg text-gray-900">
                    {report.title}
                  </Typography>
                  <Typography className="text-regular-xs sm:text-regular-sm text-gray-500">
                    {report.description}
                  </Typography>
                </div>
                <div className="flex items-center gap-3 sm:gap-6">
                  <Button
                    className="px-4.5 sm:px-7 py-1.5 sm:py-2.5"
                    classNames={{ label: "text-medium-xs sm:text-medium-sm" }}
                    startContent={
                      <Icon
                        name="icon-article-text"
                        className="text-regular-base sm:text-regular-xl"
                      />
                    }
                  >
                    Prepare a report
                  </Button>
                  <Button
                    variant="tetiary"
                    className="px-4.5 sm:px-7 py-1.5 sm:py-2.5"
                    classNames={{ label: "text-medium-xs sm:text-medium-sm" }}
                    startContent={
                      <Icon
                        name="icon-download"
                        className="text-regular-base sm:text-regular-xl"
                      />
                    }
                  >
                    Download report
                  </Button>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}

export default Reports
