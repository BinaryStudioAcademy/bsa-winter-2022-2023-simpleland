import { useEffect, useRef, useState } from '~/libs/hooks/hooks.js';

type SvgElement = React.FC<React.SVGProps<SVGSVGElement>>;

type ResultType = {
  SvgIcon: SvgElement | undefined;
  error: string;
  isLoading: boolean;
};

type Properties = {
  iconPath: string;
};

type SvgProperties = {
  ReactComponent: SvgElement;
};

const useSVGImport = ({ iconPath }: Properties): ResultType => {
  const ImportedIconReference = useRef<SvgElement>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (iconPath) {
      import(iconPath)
        .then(({ ReactComponent }: SvgProperties) => {
          ImportedIconReference.current = ReactComponent;
        })
        .catch((error: Error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [iconPath]);

  return { error, isLoading, SvgIcon: ImportedIconReference.current };
};

export { useSVGImport };
