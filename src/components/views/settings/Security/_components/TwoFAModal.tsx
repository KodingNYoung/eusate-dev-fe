import AppModal from "@/components/organisms/Modal"
import TwoFAMethod from "@/components/views/setup-2fa/TwoFAMethod"
import { PopupKeys } from "@/utils/enums"
import { TwoFAMethods } from "@/utils/enums"
import { FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons/"

type Props = {
  method: TwoFAMethods
}

const TwoFAModal: FC<Props> = ({ method }) => {
  return (
    <AppModal
      id={PopupKeys.TWOFA}
      size="xl"
      classNames={{
        body: "gap-0",
        closeButton: "relative left-[82%] w-20",
      }}
      closeButton={
        <Button
          size="mini"
          variant="tetiary"
          startContent={<Icon name="icon-close" />}
        >
          Close
        </Button>
      }
    >
      <TwoFAMethod method={method} hasBackBtn={false} />
      <Button
        variant="text"
        startContent={<Icon name="icon-eusate" />}
        size="mini"
        className="pb-8 self-center"
      >
        Need help?
      </Button>
    </AppModal>
  )
}

export default TwoFAModal
