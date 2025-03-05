import AuthHeader from "@/components/molecules/AuthHeader"
import { FC } from "@/utils/types"
import React from "react"
import SetupForm from "./SetupForm"

type Props = {
  orgName?: string
}

const OnboardingSetup: FC<Props> = ({ orgName }) => {
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col">
      <AuthHeader
        title={`Let's know more about ${orgName}`}
        subtitle="Tell us more about your business to help us personalize your experience."
      />
      <SetupForm />
    </main>
  )
}

export default OnboardingSetup
