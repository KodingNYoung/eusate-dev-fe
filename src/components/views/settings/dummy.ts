import { Profile } from "./utils"
import { Info } from "./Organization/Info/utils"
import { dummyMembers } from "./Organization/Members/MembersArea/utils/dummy"

export const dummyProfile: Profile = {
  email: "adainipatrick@gmail.com",
  fullname: "Patrick Adanini",
  role: "Product Designer",
  avatar: null,
}

export const dummyOrganizationInfo: Info = {
  email: "adainipatric@gmail.com",
  industry: "Technology",
  name: "Eusate Inc",
  avatar: null,
  members: 20,
  size: "50+",
}

export const DUMMY_ORGANIZATION = {
  info: dummyOrganizationInfo,
  members: dummyMembers,
}
