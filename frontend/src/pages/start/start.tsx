import { IconButton, PageLayout } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useMemo,
  useParams,
  useState,
  useStepper,
} from '~/libs/hooks/hooks.js';
import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';
import { actions as siteActions } from '~/slices/sites/sites.js';

import { FinalForm, ProjectNameForm } from './libs/components/components.js';
import { DEFAULT_SITE_PAYLOAD, ONE_STEP_LENGTH } from './libs/constants.js';
import styles from './styles.module.scss';

const Start: React.FC = () => {
  const { projectId } = useParams();
  const [sitePayload, setSitePayload] =
    useState<SiteCreateRequestDto>(DEFAULT_SITE_PAYLOAD);

  const dispatch = useAppDispatch();

  const handleStepSubmit = useCallback(
    (newSitePayload: Partial<SiteCreateRequestDto>) => {
      setSitePayload((oldSitePayload) => ({
        ...oldSitePayload,
        ...newSitePayload,
      }));

      handleNextStep();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleFinalSubmit = useCallback(() => {
    void dispatch(
      siteActions.createSite({
        ...sitePayload,
        projectId: Number(projectId),
      }),
    );
  }, [dispatch, sitePayload, projectId]);

  const steps = useMemo(
    () => [
      <ProjectNameForm onSubmit={handleStepSubmit} key="name" />,
      <FinalForm onSubmit={handleFinalSubmit} key="final" />,
    ],
    [handleStepSubmit, handleFinalSubmit],
  );

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    barYellowWidth,
    handleNextStep,
    handlePreviousStep,
  } = useStepper({ length: steps.length });

  const currentForm = useMemo(() => {
    return steps[currentStep - ONE_STEP_LENGTH];
  }, [steps, currentStep]);

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
              {currentForm}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { Start };
