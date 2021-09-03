import Container from '../components/Container/Container';
import Column from '../components/Grid/Column';
import Grid from '../components/Grid/Grid';

interface IComponents {
  [key: string]: React.ElementType,
}

type UndefinedComponentProps = {
  children: React.ReactNode,
  component: string,
}

export const componentTypes: IComponents = {
  container: Container,
  grid: Grid,
  column: Column,
};

export function UndefinedComponent({
  children,
  component,
}: UndefinedComponentProps) {
  return (
    <div style={{ padding: 10 }}>
      The component
      {' '}
      <strong>{component}</strong>
      {' '}
      has not been created yet
      <br />
      {children}
    </div>
  );
}
