import { JSX } from "react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export interface DietData {
  breakfast: string[],
  lunch: string[],
  dinner: string[],
  weight: number;
  fats: number;
  activity: 1 | 2 | 3;
  vegan: boolean;
}