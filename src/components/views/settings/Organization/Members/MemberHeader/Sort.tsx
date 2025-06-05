import { cls } from "@/utils/helpers"
import Icon from "@/components/atoms/Icon"
import Radio from "@/components/molecules/Radio"
import Button from "@/components/molecules/Buttons"
import { useQueryParams } from "@/hooks/utilityHooks"
import Typography from "@/components/atoms/Typography"
import { ORDER_OPTIONS, SORT_BY_OPTIONS } from "../utils"
import AppPopover from "@/components/molecules/Popups/AppPopover"

const Sort = () => {
  const { get, set } = useQueryParams()

  return (
    <AppPopover
      placement="bottom-start"
      classNames={{ content: "w-full min-w-52" }}
      trigger={
        <Button
          size="sm"
          variant="tetiary"
          className="px-4 py-3"
          endContent={<Icon size={20} name="icon-arrow-swap" />}
        >
          Sort by
        </Button>
      }
    >
      <div className="flex px-4 py-2 justify-between items-center w-full border-b border-b-gray-50">
        <Typography variant="semibold-xs" className="text-gray-700">
          Sortby
        </Typography>
        <div className="flex gap-2 items-center">
          {ORDER_OPTIONS.map(({ query_key, key, name }) => (
            <Icon
              key={key}
              onClick={() => set(query_key, key)}
              className={cls(
                get(query_key) === key || (!get(query_key) && name === "up")
                  ? `bg-black text-white p-1 rounded-full`
                  : "",
                "cursor-pointer"
              )}
              size={16}
              name={`icon-arrow-circle-${name}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full p-1 grid">
        {SORT_BY_OPTIONS.map(({ query_key, key, label, ...props }) => (
          <div
            key={key}
            onClick={() => {
              if (get(query_key) === key) {
                set(query_key, "none")
                return
              }
              set(query_key, key)
            }}
            className={cls(
              "flex cursor-pointer rounded-lg items-center w-full justify-between px-4 py-3",
              get(query_key) === key && "bg-gray-50"
            )}
          >
            <Typography variant="regular-xs" className="text-gray-600">
              {label}
            </Typography>
            <Radio
              id="ls"
              checked={get(query_key) === key}
              classNames={{
                iconMidCircle: "bg-white",
                iconInnerCircle: cls(
                  "size-[0%]",
                  get(query_key) === key && "size-[80%]"
                ),
              }}
              {...props}
            />
          </div>
        ))}
      </div>
    </AppPopover>
  )
}

export default Sort
