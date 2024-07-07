import { wait } from "./helper";

export const Await = async <T>({
  promise,
  children,
  delay = 0,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
  delay?: number;
}) => {
  try {
    await wait(delay); // WARNING: DON'T USE THIS, ONLY FOR DEBUGGING PURPOSE!
    const response = (await promise) as T;

    return children(response);
  } catch (error) {
    throw new Error(error as string);
  }
};
