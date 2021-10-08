type GridProps = {
  children: React.ReactNode,
};

export default function Grid({
  children,
}: GridProps) {
  return (
    <div className="grid">
      <div className="row">
        {children}
      </div>
    </div>
  );
}
