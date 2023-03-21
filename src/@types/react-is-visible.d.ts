/* eslint-disable */
declare module 'react-is-visible' {
  const useIsVisible = (
    ref: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null,
    options?: { once: boolean },
  ) => boolean;

  export const { useIsVisible };
}
