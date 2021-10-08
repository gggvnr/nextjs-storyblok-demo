import clsx from 'clsx';

type ColumnProps = {
  children: React.ReactNode,
  config: {
    xsmall: string,
    small: string,
    medium: string,
    large: string,
    xlarge: string,
  },
};

export default function Column({
  children,
  config,
}: ColumnProps) {
  const {
    xsmall,
    small,
    medium,
    large,
    xlarge,
  } = config;

  return (
    <div className={clsx('column', {
      [`xs-${xsmall}`]: xsmall,
      [`sm-${small}`]: small,
      [`md-${medium}`]: medium,
      [`lg-${large}`]: large,
      [`xl-${xlarge}`]: xlarge,
    })}
    >
      {children}
    </div>
  );
}
