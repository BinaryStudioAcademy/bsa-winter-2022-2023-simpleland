import { useCallback,useState } from 'react';

import { Button,Select } from '~/libs/components/components.js';
import { type Option } from '~/libs/types/types.js';

type Properties = {
  onSubmit: () => void;
};

const SelectSeeSample: React.FC = () => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = useCallback((option: Option | null) => {
    setSelectedOption(option);
  }, []);

  return (
    <div>
    <h1>Select Example</h1>
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
    />
    </div>
  );

};

const SignInForm: React.FC<Properties> = () => (
  <>
    <h1>Sign In</h1>
    <form>
      <Button label="Sign in" />
      <SelectSeeSample />
    </form>
  </>
);

export { SignInForm };
