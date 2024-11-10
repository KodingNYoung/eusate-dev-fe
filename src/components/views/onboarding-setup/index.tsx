import AuthHeader from "@/components/molecules/AuthHeader"
import { FC } from "@/utils/types"
import React from "react"
import SetupForm from "./SetupForm"
import ToastContextProvider from "@/providers/toastProviders"

const OnboardingSetup: FC = () => {
  return (
    <ToastContextProvider>
      <main className="mx-auto w-[544px] px-4 py-8 max-w-full flex flex-col">
        <AuthHeader
          title="Let know more about Eusate"
          subtitle="Tell us more about your business to help us personalize your experience."
          toast
        />
        <SetupForm />
      </main>
    </ToastContextProvider>
  )
}

export default OnboardingSetup
