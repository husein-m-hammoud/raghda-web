import React from "react";
import { useContextTranslate } from "../../Context/ContextAPI";

const Currency = ({ number, currency }) => {
  const { profile } = useContextTranslate();
  return (
    <span>
      {profile?.currency === "USD"
        ? number?.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })

        : parseInt(number).toLocaleString() || 0}
      {" " + (currency || profile?.currency || "")}
    </span>
  );
};

export default Currency;
