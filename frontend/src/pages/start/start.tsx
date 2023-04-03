import { IconButton, PageLayout } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useParams,
  useState,
  useStepper,
} from '~/libs/hooks/hooks.js';
import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';
import { actions as siteActions } from '~/slices/sites/sites.js';

import {
  FinalForm,
  IndustryForm,
  ProjectNameForm,
} from './libs/components/components.js';
import { DEFAULT_SITE_PAYLOAD, ONE_STEP_LENGTH } from './libs/constants.js';
import styles from './styles.module.scss';

const steps = [ProjectNameForm, IndustryForm, FinalForm] as const;

const Start: React.FC = () => {
  const { projectId } = useParams();
  const [sitePayload, setSitePayload] =
    useState<SiteCreateRequestDto>(DEFAULT_SITE_PAYLOAD);

  const dispatch = useAppDispatch();

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    barYellowWidth,
    handleNextStep,
    handlePreviousStep,
  } = useStepper({ length: steps.length });

  const handleStepSubmit = useCallback(
    (newSitePayload: Partial<SiteCreateRequestDto>) => {
      if (isLastStep) {
        return void dispatch(
          siteActions.createSite({
            ...sitePayload,
            projectId: Number(projectId),
          }),
        );
      }

      setSitePayload((oldSitePayload) => ({
        ...oldSitePayload,
        ...newSitePayload,
      }));

      handleNextStep();
    },
    [dispatch, handleNextStep, isLastStep, projectId, sitePayload],
  );

  const CurrentForm = steps[(currentStep - ONE_STEP_LENGTH) as 0];

  return (
    <PageLayout style="black" className={styles['layout']}>
      <div className={styles['page-wrapper']}>
        <div className={styles['content']}>
          <div className={styles['content-text']}>
            First, tell us about your project
          </div>
          <div className={styles['content-info']}>
            <div className={styles['stepper']}>
              <div className={styles['bar-wrapper']}>
                <div className={styles['bar']}>
                  <div
                    className={getValidClassNames(
                      styles['bar'],
                      styles['bar-yellow'],
                    )}
                    style={{ width: `${barYellowWidth}%` }}
                  />
                </div>

                <div className={styles['stepper-wrapper']}>
                  <div className={styles['img-wrapper']}>
                    <IconButton
                      icon="arrowLeft"
                      label="Go to the previous step"
                      onClick={handlePreviousStep}
                      isDisabled={isFirstStep}
                    />
                    <IconButton
                      icon="arrowRight"
                      label="Go to the next step"
                      onClick={handleNextStep}
                      isDisabled={isLastStep}
                    />
                  </div>
                  <div className={styles['text']}>
                    <span className={styles['yellow']}>{currentStep}</span>/
                    {steps.length}
                  </div>
                </div>
              </div>
              <CurrentForm onSubmit={handleStepSubmit} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { Start };
