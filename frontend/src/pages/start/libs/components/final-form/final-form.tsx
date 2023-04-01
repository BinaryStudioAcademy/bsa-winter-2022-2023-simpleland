import { Button } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';

type Properties = {
  onSubmit: () => void;
};

const FinalForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const handleClick = useCallback((): void => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      Ready?
      <Button label="Go" onClick={handleClick} />
    </>
  );
};

export { FinalForm };
