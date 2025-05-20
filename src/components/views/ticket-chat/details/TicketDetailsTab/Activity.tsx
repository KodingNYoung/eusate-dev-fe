import { Activity } from "../../utils"
import React, { useState } from "react"
import ActivityCard from "../../_components/ActivityCard"
import NoContentFound from "../../_components/NoContentFound"

const Activities = () => {
  const [localActivities] = useState<Activity[]>([])

  return (
    <div className="custom-scrollbar px-6 py-4 h-[17rem] overflow-y-auto">
      {localActivities?.length ? (
        <div className="border border-gray-50 rounded-x20 p-4 flex flex-col gap-y-4">
          {localActivities.map((activity, idx) => (
            <ActivityCard
              key={idx}
              activity={activity}
              lastCard={idx === localActivities.length - 1}
            />
          ))}
        </div>
      ) : (
        <NoContentFound msg="No Activity Found" />
      )}
    </div>
  )
}

export default Activities
