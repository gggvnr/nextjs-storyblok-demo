import { useEffect, useCallback, MutableRefObject } from 'react';

export function useAutoClose(ref: MutableRefObject<any>, setIsOpen: any) {
  const handleClosure = useCallback(
    (event) => ref.current && !ref.current.contains(event.target) && setIsOpen(false),
    [setIsOpen, ref],
  );

  useEffect(() => {
    window.addEventListener('click', handleClosure);
    window.addEventListener('focusin', handleClosure);

    return () => {
      window.removeEventListener('click', handleClosure);
      window.removeEventListener('focusin', handleClosure);
    };
  }, [handleClosure, ref]);
}
