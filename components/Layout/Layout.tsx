import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type LayoutProps = {
  routes: any[],
  locale: string,
  locales: string[],
  children: React.ReactNode,
};

const Layout = ({
  routes,
  locale,
  locales,
  children,
}: LayoutProps) => (
  <div className="page">
    <Header routes={routes} locale={locale} locales={locales} />

    <main>
      {children}
    </main>

    <Footer routes={routes} />
  </div>
);

export default Layout;
