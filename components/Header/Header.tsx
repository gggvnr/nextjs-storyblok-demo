import { useState } from 'react';
import Link from 'next/link';

import Logo from '../../icons/logo.svg';
import IconBurger from '../../icons/icon-burger.svg';

import Nav from '../Nav/Nav';
import LangSwitch from '../LangSwitch/LangSwitch';
import MobileMenu from '../MobileMenu/MobileMenu';

type HeaderProps = {
  routes: any[],
  locale: string,
  locales: string[],
}

export default function Header({
  routes,
  locale,
  locales,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="nav-center-container">
          <Link href="/">
            <a className="header__logo">
              <Logo />
            </a>
          </Link>
          <div className="nav-filler" />

          <Nav className="header__nav" routes={routes} isInsideHeader isAbsoluteDropdown />

          <LangSwitch className="header__lang" locale={locale} locales={locales} />
        </div>
        <button
          type="button"
          className="header__menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <IconBurger />
        </button>
      </header>

      {isMobileMenuOpen && <MobileMenu onCloseClick={() => setIsMobileMenuOpen(false)} />}
    </>
  );
}
