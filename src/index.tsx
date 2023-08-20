import { useState } from "react";
import reactDom from "react-dom";
import nj from "numjs";

export default function Home() {
  return <>Hello World!</>;
}

reactDom.render(<Home />, document.querySelector("#app"));
