import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  };

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={classNames("day-list__item", dayClass)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
