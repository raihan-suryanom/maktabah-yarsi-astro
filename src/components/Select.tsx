import { useId } from "react";

import SelectComponent from "react-select";

import type { GroupBase, Props } from "react-select";

const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group>,
) => {
  const id = useId();

  return <SelectComponent instanceId={id} {...props} />;
};

export default Select;
