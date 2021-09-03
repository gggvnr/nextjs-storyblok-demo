import { useEffect } from 'react';
import Nav from '../Nav/Nav';

import IconTimes from '../../icons/icon-times.svg';

const MENU_OPENED_GLOBAL_CLASSNAME = 'is-mobile-menu-opened';

export default function MobileMenu({
  onCloseClick = () => {},
}) {
  useEffect(() => {
    document.documentElement.classList.add(MENU_OPENED_GLOBAL_CLASSNAME);

    return () => {
      document.documentElement.classList.remove(MENU_OPENED_GLOBAL_CLASSNAME);
    };
  }, []);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu__close"
        onClick={onCloseClick}
      >
        <IconTimes />
      </button>

      <Nav className="mobile-menu__nav" isMobileView routes={[]} />
    </div>
  );
}
