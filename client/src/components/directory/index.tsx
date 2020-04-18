import React from "react";
import { DIRECTORY_DATA } from "./data";

import MenuItem from "../menu-item";

import { DirectoryMenuContainer } from "./styles";

const Directory = () => (
  <DirectoryMenuContainer>
    {DIRECTORY_DATA.map((section) => (
      <MenuItem key={section.id} {...section} />
    ))}
  </DirectoryMenuContainer>
);

export default Directory;
