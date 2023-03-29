import { Button, Input, PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDebounce,
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useRef,
} from '~/libs/hooks/hooks.js';
import { type ProjectSearchRequestDto } from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { ProjectCard } from './components/project-card/project-card.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects,
  }));

  const { control, errors, handleSubmit } = useAppForm<ProjectSearchRequestDto>(
    {
      defaultValues: { search: '' },
      mode: 'onChange',
    },
  );

  const previousQueryReference = useRef('');

  const handleSearch = (data: ProjectSearchRequestDto): void => {
    const query = data.search;

    if (query !== previousQueryReference.current) {
      void dispatch(projectActions.getUserProjects(query));
      previousQueryReference.current = query;
    }
  };

  const debouncedHandleSubmit = useAppDebounce(handleSubmit(handleSearch), 500);

  const handleFormChange = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void debouncedHandleSubmit(event_);
    },
    [debouncedHandleSubmit],
  );

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
