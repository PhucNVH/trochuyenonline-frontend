import React from "react";
import { ReactTypeformEmbed } from "react-typeform-embed";
import { useHistory } from "react-router-dom";
export function Survey() {
  const history = useHistory();
  return (
    <div>
      <ReactTypeformEmbed
        popup={false}
        url="https://form.typeform.com/to/puiTDUi1"
        onSubmit={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}
