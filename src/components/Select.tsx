import { useEffect, useId, useState } from "react";

import SelectComponent from "react-select";

import type { ReactNode } from "react";
import type { GroupBase, Props } from "react-select";

// TODO: refactor to vanilla js instead(a.k.a web component)
const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & { children?: ReactNode },
) => {
  const id = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <SelectComponent instanceId={id} {...props} />
  ) : (
    <div
      aria-label="skeleton"
      className="h-11 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600"
    />
  );
};

export default Select;
