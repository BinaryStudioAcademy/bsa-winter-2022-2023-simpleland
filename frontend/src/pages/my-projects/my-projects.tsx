import { Button, Input, PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type ProjectGetAllParametersDto } from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { ProjectCard } from './components/project-card/project-card.js';
import { DEFAULT_PROJECT_SEARCH_PAYLOAD } from './libs/constants.js';
import { initDebounce } from './libs/helpers/init-debounce-helper.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects,
  }));

  const { control, errors, handleSubmit } =
    useAppForm<ProjectGetAllParametersDto>({
      defaultValues: DEFAULT_PROJECT_SEARCH_PAYLOAD,
      mode: 'onChange',
    });

  const handleSearch = useCallback(
    (data: ProjectGetAllParametersDto): void => {
      void dispatch(projectActions.getUserProjects({ query: data.search }));
    },
    [dispatch],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

  const hasProjects = projects.length > 0;

  return (
    <PageLayout pageName="My Projects">
      {hasProjects ? (
        <>
          <div className={styles['wrapper']}>
            <div className={styles['cards-wrapper']}>
              {projects.map((card) => (
                <ProjectCard key={card.id} project={card} />
              ))}
            </div>
            <form onChange={handleFormChange}>
              <div className={styles['search-input-wrapper']}>
                <Input
                  type="search"
                  placeholder="Search"
                  name="search"
                  control={control}
                  errors={errors}
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className={styles['placeholder']}>
          <div className={styles['placeholder-caption']}>
            <span className={styles['placeholder-sub-caption']}>Hello!</span>
            <span className={styles['placeholder-main-caption']}>
              There are no businesses
            </span>
          </div>
          <Button
            className={styles['placeholder-button']}
            label="Create new business"
            to={AppRoute.ROOT}
          />
        </div>
      )}
    </PageLayout>
  );
};

export { MyProjects };
