import { Button, Input, Select } from '~/libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  type SiteCreateIndustryName,
  type SiteCreateRequestDto,
} from '~/packages/sites/sites.js';
import { siteCreateStepIndustryValidationSchema } from '~/packages/sites/sites.js';

import { DEFAULT_STEP_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateRequestDto>) => void;
};

const IndustryForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit, watch } =
    useAppForm<SiteCreateIndustryName>({
      defaultValues: DEFAULT_STEP_PAYLOAD,
      validationSchema: siteCreateStepIndustryValidationSchema,
    });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((payload) => {
        const resultValue = disableSelect
          ? payload.enterIndustry
          : payload.selectIndustry;

        onSubmit({ industry: resultValue });
      })(event_);
    },
    [handleSubmit, onSubmit],
  );

  const [disableSelect, setDisableSelect] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    return () => {
      const { selectIndustry, enterIndustry } = watch();
      setDisableSelect(Boolean(enterIndustry));
      setDisableInput(Boolean(selectIndustry));
    };
  }, [watch()]);

  const options = [
    { value: 'Casino', label: 'Casino' },
    { value: 'Cafeteria', label: 'Cafeteria' },
    { value: 'VinoVodochniy', label: 'VinoVodochniy' },
  ];

  return (
    <>
      <h1 className={styles['title-text']}>What is your industry?</h1>
      <p className={styles['title-description']}>
        Choose the one from the list or enter the custom one
      </p>
      <form onSubmit={handleFormSubmit}>
        <Select
          isDisabled={disableSelect}
          control={control}
          errors={errors}
          name="selectIndustry"
          placeholder="Please select your industry"
          options={options}
        />
        <Input
          isDisabled={disableInput}
          type="text"
          label="Your industry"
          isLabelVisuallyHidden
          placeholder="Please enter your industry"
          name="enterIndustry"
          control={control}
          errors={errors}
        />
        <Button
          label="Next"
          style="secondary"
          size="small"
          type="submit"
          className={styles['button']}
        />
      </form>
    </>
  );
};

export { IndustryForm };
