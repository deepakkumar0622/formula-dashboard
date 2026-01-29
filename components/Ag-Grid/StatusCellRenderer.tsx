import React from "react";
import Badge from "../common/Badge";

const StatusCellRenderer = (props: any) => {
  return (
    <div>
      <Badge title={props.value} type="green" />
    </div>
  );
};

export default StatusCellRenderer;
