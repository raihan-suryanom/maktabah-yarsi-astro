import { useEffect, useId, useState } from "react";

import SelectComponent from "react-select";

import { type Props as P } from "../input/Input.astro";
import { inputStyles } from "../input/input.style";
import { selectBaseStyles } from "./select.styles";

import type { VariantProps } from "class-variance-authority";
import type { GroupBase, Props } from "react-select";

// TODO: refactor to vanilla js instead(a.k.a web component)
const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & VariantProps<typeof inputStyles>,
) => {
  const { className, dimension, ...restProps } = props;
  const id = useId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <SelectComponent
      instanceId={id}
      classNames={selectBaseStyles<Option, IsMulti, Group>(
        inputStyles({ dimension, className }),
      )}
      unstyled
      {...restProps}
    />
  ) : (
    <div
      aria-label="skeleton"
      className="h-11 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600"
    />
  );
};

export default Select;
