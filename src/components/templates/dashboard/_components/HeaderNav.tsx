"use client"

import Icon from "@/components/atoms/Icon"
import { FC } from "@/utils/types"
import { useRouter } from "next/navigation"
import React from "react"

const HeaderNav: FC = () => {
  const router = useRouter()
  return (
    <section className="hidden sm:flex items-center gap-2 text-gray-200 leading-none border-r border-gray-100 pr-3 mr-3">
      <button onClick={() => router.back()}>
        <Icon name="icon-arrow-circle-left" className="!text-regular-2xl" />
      </button>
      <button onClick={() => router.forward()}>
        <Icon name="icon-arrow-circle-right" className="!text-regular-2xl" />
      </button>
    </section>
  )
}

export default HeaderNav
