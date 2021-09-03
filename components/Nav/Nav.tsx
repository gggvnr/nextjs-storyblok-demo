import clsx from 'clsx';

import NavItem from './NavItem';

type NavProps = {
  className: string,
  routes: Route[],
  isInsideHeader?: boolean,
  isMobileView?: boolean,
  isAbsoluteDropdown?: boolean,
  dropdownToTop?: boolean,
  darkDropdown?: boolean,
}

export default function Nav({
  className = '',
  routes = [],
  isInsideHeader,
  isMobileView,
  isAbsoluteDropdown,
  dropdownToTop,
  darkDropdown,
}: NavProps) {
  const filteredByPositionRoutes = isInsideHeader
    ? routes.filter((route) => !route.excludeFromHeader)
    : routes;

  const filteredRoutes = filteredByPositionRoutes
    .filter((route) => !(route.isFolder && !route.routes.length));

  return (
    <nav
      className={clsx('navlist', className, {
        'navlist--mobile': isMobileView,
      })}
    >
      <ul className="navlist__list">
        {filteredRoutes.map((route) => (
          <NavItem
            key={route.uuid || route.id}
            className="navlist__item"
            isAbsoluteDropdown={isAbsoluteDropdown}
            dropdownToTop={dropdownToTop}
            darkDropdown={darkDropdown}
            route={route}
          />
        ))}
      </ul>
    </nav>
  );
}
