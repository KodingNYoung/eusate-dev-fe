"use client"

import AuthHeader from "@/components/molecules/AuthHeader"
import { FC } from "@/utils/types"
import React from "react"
import SetupForm from "./SetupForm"
import { useOwnedOrganisation } from "@/hooks/api/organisationHooks"
import Typography from "@/components/atoms/Typography"

const OnboardingSetup: FC = () => {
  const { data, isLoading } = useOwnedOrganisation()
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col">
      <AuthHeader
        title={
          <>
            Let&apos;s know more about{" "}
            <Typography
              as="span"
              loading={isLoading}
              style={{ fontWeight: "inherit", fontSize: "inherit" }}
            >
              {data?.name}
            </Typography>
          </>
        }
        subtitle="Tell us more about your business to help us personalize your experience."
      />
      <SetupForm />
    </main>
  )
}

export default OnboardingSetup
