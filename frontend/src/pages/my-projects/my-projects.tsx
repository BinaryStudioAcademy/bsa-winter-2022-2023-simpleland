import { type FieldValues, type SubmitHandler } from 'react-hook-form';

import { Button, Input, PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useForm,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
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

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [projects, searchQuery]);

  const handleChange: SubmitHandler<FieldValues> = useCallback(
    (data: FieldValues) => {
      setSearchQuery(data['search'] as string);
    },
    [setSearchQuery],
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const handleFormChange = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((data) => handleChange(data))(event_);
    },
    [handleSubmit, handleChange],
  );

  const hasProjects = filteredProjects.length > 0;

  return (
    <PageLayout pageName="My Projects">
      {hasProjects ? (
        <>
          <div className={styles['wrapper']}>
            <div className={styles['cards-wrapper']}>
              {filteredProjects.map((card) => (
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
