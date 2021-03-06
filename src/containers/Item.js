import React from "react"
import format from "date-fns/format"

export default ({
  datum: {
    date: { parsed, formatted, time },
    event,
    location,
    city,
    state,
    sourceLabel,
    sourceURL
  }
}) => (
  <li>
    <h1>
      {format(parsed, "MMM")}{" "}
      <span class="red">{format(parsed, "D")}</span>
    </h1>
    <h3>{event}</h3>
    {location && <h4>{location}</h4>}
    <div>
      {city && `${city}, `} {state}
    </div>
    <div>{time}*</div>
    <div>
      Source: <a href={sourceURL}>{sourceLabel}</a>{" "}
    </div>
  </li>
)
