import { useSVGImport } from '~/libs/hooks/hooks.js';

type Properties = {
  iconPath: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Icon: React.FC<Properties> = ({
  iconPath,
  className,
  onClick,
}: Properties) => {
  const { SvgIcon } = useSVGImport({ iconPath });
  if (SvgIcon) {
    return <SvgIcon className={className} onClick={onClick} />;
  }

  return null;
};

export { Icon };
