import OnboardingSetup from "@/components/views/onboarding-setup"
import { getOrganisation } from "@/lib/data/organisation"
import { PageFC } from "@/utils/types"
import React from "react"

const OnboardingSetupPage: PageFC = async () => {
  const organization = await getOrganisation()

  return <OnboardingSetup orgName={organization.data?.name} />
}

export default OnboardingSetupPage
