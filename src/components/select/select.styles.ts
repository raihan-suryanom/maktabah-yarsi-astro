import { cn } from "~/lib/utils/cn";

import type { ClassNamesConfig, GroupBase } from "react-select";

export const selectBaseStyles = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  controlStyle: string,
): ClassNamesConfig<Option, IsMulti, Group> => ({
  control: (state) =>
    cn(
      controlStyle,
      state.menuIsOpen ? "rounded-b-none border-b-0" : "",
      "[&]:focus-within:border-primary-light [&]:focus-within:shadow-[0px_0px_0px_2px_rgba(16,185,129,1)]",
    ),
  container: () => "w-full",
  placeholder: () => "text-xl text-dark-100/50 dark:text-light-100/50",
  menu: () =>
    "bg-light-300 rounded-b-lg text-lg !z-20 relative overflow-hidden text-dark-100 border-t-0 border-primary-light shadow-[0px_0px_0px_2px_rgba(16,185,129,1)]",
  option: () => "px-3 py-2 !cursor-pointer hover:bg-light-100",
  multiValue: () => "bg-primary-light text-light-100",
  multiValueLabel: () => "text-base px-1",
  multiValueRemove: () => "px-0.5 bg-red-300 text-red-700",
  valueContainer: () => "gap-1.5",
});
