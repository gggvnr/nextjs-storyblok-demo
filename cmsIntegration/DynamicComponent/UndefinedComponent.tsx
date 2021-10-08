type UndefinedComponentProps = {
  children: React.ReactNode,
  component: string,
};

export default function UndefinedComponent({
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
