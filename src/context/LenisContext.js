import { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

/** Returns the Lenis instance, or null outside the provider. */
export function useLenis() {
  return useContext(LenisContext);
}
