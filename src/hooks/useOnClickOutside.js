import { useEffect } from "react";

function useOnClickOutside(element, callback) {
  useEffect(() => {
    function eventListener(event) {
      if (
        !element.current ||
        !(event.target instanceof HTMLElement) ||
        element.current.contains(event.target)
      ) {
        return;
      }

      callback();
    }

    document.addEventListener("mousedown", eventListener);
    document.addEventListener("touchstart", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("touchstart", eventListener);
    };
  }, [element, callback]);
}

/* USAGE:

  useOnClickOutside(dropdownRef, closeDropdown);

*/

export default useOnClickOutside;