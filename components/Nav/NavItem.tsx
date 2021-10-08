import { useState, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { useAutoClose } from '../../common/hooks/useAutoClose';

type NavItemProps = {
  className: string,
  route: Route,
  isAbsoluteDropdown?: boolean,
  dropdownToTop?: boolean,
  darkDropdown?: boolean,
};

export default function NavItem({
  className = '',
  isAbsoluteDropdown,
  dropdownToTop,
  darkDropdown,
  route,
}: NavItemProps) {
  const isNestedRoutes = route.isFolder;
  const useAutoCloseIfHasNested = isNestedRoutes && isAbsoluteDropdown ? useAutoClose : () => {};

  const containerRef = useRef<HTMLLIElement>();
  const [isOpen, setIsOpen] = useState(false);

  useAutoCloseIfHasNested(containerRef, setIsOpen);

  return (
    <li ref={containerRef} className={`navitem ${className}`}>
      {
        isNestedRoutes
          ? (
            <button
              type="button"
              className={clsx('navitem__dropdown-toggle', {
                'navitem__dropdown-toggle--opened': isOpen,
              })}
              onClick={() => setIsOpen(!isOpen)}
            >
              {route.name}
            </button>
          )
          : renderRoute(route)
      }

      {isNestedRoutes && isOpen && (
        <ul
          className={clsx('navitem__nested-list', {
            'navitem__nested-list--abs': isAbsoluteDropdown,
            'navitem__nested-list--top': dropdownToTop,
            'navitem__nested-list--dark': darkDropdown,
          })}
        >
          {route.routes.map((nestedRoute: Route) => (
            <NavItem
              key={nestedRoute.uuid || nestedRoute.id}
              className="navitem__nested-item"
              isAbsoluteDropdown={isAbsoluteDropdown}
              dropdownToTop={dropdownToTop}
              route={nestedRoute}
            />
          ))}
        </ul>
      )}
    </li>
  );

  function renderRoute(routeToRender: Route) {
    return routeToRender.external
      ? (
        <a
          href={routeToRender.path || ''}
          className="navitem__link"
          target="_blank"
          rel="noreferrer noopener"
        >
          {routeToRender.name}
        </a>
      )
      : (
        <Link href={routeToRender.path || ''}>
          <a className="navitem__link">{routeToRender.name}</a>
        </Link>
      );
  }
}
