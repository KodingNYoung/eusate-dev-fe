import Typography from "@/components/atoms/Typography"
import AppSlider from "@/components/molecules/AppSlider"
import Button from "@/components/molecules/Buttons"
import { AI_TONES, RESOURCE_SOURCES } from "@/utils/constants"
import { FC, PlaygroundSettings } from "@/utils/types"
import React, { useState } from "react"
import { PREFERENCES_DEFAULT_VALUES } from "../utils"
import { SettingsKey } from "@/providers/playgroundProvider"
import { AiTones, ResourceSources } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import AppSelect from "@/components/molecules/AppSelect"
import { usePlayground } from "@/hooks/playground"

const ChatPreferencesForm: FC = () => {
  const { settings, setPreferences: setPreferencesState } = usePlayground()
  const { close } = useModal()

  const [preferences, setPreferences] = useState<PlaygroundSettings>(settings)

  const handlePreferencesChange = (
    key: SettingsKey,
    value: PlaygroundSettings[SettingsKey]
  ) => {
    setPreferences((curr) => ({ ...curr, [key]: value }))
  }

  return (
    <form>
      <main className="p-5 grid gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="border border-gray-50 rounded-lg p-3 flex-1 min-w-[200px] flex flex-col gap-4">
            <AppSelect
              defaultSelectedKeys={[settings.source]}
              selectedKeys={[preferences.source]}
              onChange={(e) =>
                handlePreferencesChange(
                  "source",
                  e.target.value as ResourceSources
                )
              }
              label="Source"
              aria-label="Select a source"
              name="source"
              items={RESOURCE_SOURCES}
              classNames={{
                label: "!text-gray-700 group-data-[filled:true]:!text-gray-700",
                selectorIcon: "w-4 h-4",
                value: "text-[12px] font-[600]",
              }}
            />
          </div>
          <div className="border border-gray-50 rounded-lg p-3 flex-1 min-w-[200px] flex flex-col gap-4">
            <AppSelect
              defaultSelectedKeys={[settings.tone]}
              selectedKeys={[preferences.tone]}
              onChange={(e) =>
                handlePreferencesChange("tone", e.target.value as AiTones)
              }
              label="AI Tone"
              aria-label="Select a tone for the AI"
              name="tone"
              items={AI_TONES}
              classNames={{
                label: "!text-gray-700 group-data-[filled:true]:!text-gray-700",
                selectorIcon: "w-4 h-4",
                value: "text-[12px] font-[600]",
              }}
            />
          </div>
        </div>
        <div className="border border-gray-50 rounded-lg p-3">
          <AppSlider
            label="Temperature"
            startContent={<Typography className="text-medium-sm">0</Typography>}
            endContent={<Typography className="text-medium-sm">1</Typography>}
            minValue={0}
            maxValue={1}
            step={0.01}
            defaultValue={settings.temperature}
            value={preferences.temperature}
            onChange={(value) =>
              handlePreferencesChange("temperature", value as number)
            }
            name="temperature"
          />
        </div>
        <div className="border border-gray-50 rounded-lg p-3">
          <AppSlider
            label="Top P"
            startContent={<Typography className="text-medium-sm">0</Typography>}
            endContent={<Typography className="text-medium-sm">1</Typography>}
            minValue={0}
            maxValue={1}
            step={0.01}
            defaultValue={settings.top_p}
            value={preferences.top_p}
            onChange={(value) =>
              handlePreferencesChange("top_p", value as number)
            }
            name="top_p"
          />
        </div>
      </main>
      <footer className="flex items-center justify-end p-5 gap-5 border-t border-gray-50">
        <Button
          type="submit"
          variant="tetiary"
          size="lg"
          className="px-4.5 py-4"
          formAction={() => {
            setPreferences(PREFERENCES_DEFAULT_VALUES)
          }}
        >
          Use default
        </Button>
        <Button
          type="submit"
          size="lg"
          className="px-4.5 py-4"
          formAction={(formdata) => {
            setPreferencesState({
              source: formdata.get("source") as ResourceSources,
              tone: formdata.get("tone") as AiTones,
              temperature: Number(formdata.get("temperature")) as number,
              top_p: Number(formdata.get("top_p")) as number,
            })
            close()
          }}
        >
          Apply changes
        </Button>
      </footer>
    </form>
  )
}

export default ChatPreferencesForm
