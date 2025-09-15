import React from "react";

export type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

export type ButtonAppBarProps = {
  menuItems: MenuItem[];
};
