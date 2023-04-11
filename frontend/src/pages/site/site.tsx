import {
  Icon,
  Link,
  Loader,
  PageLayout,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useTitle,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionGetAllItemResponseDto,
  type SiteAboutContent,
  type SiteFeedbackContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
  type SitePortfolioContent,
  type SiteServiceContent,
  SectionType,
} from '~/packages/sections/sections.js';
import { NAVIGATION_SECTION_TYPES } from '~/pages/site/libs/constants.js';
import { actions as sectionsActions } from '~/slices/sections/sections.js';
import { actions as sitesActionss } from '~/slices/sites/sites.js';

import {
  About,
  Feedback,
  Footer,
  Header,
  Main,
  Portfolio,
  Service,
} from './components/components.js';
import { sortSectionsByPosition } from './libs/helpers/helpers.js';
import { sectionTypeToPosition } from './libs/maps/maps.js';
import styles from './styles.module.scss';

const Site: React.FC = () => {
  const { siteId } = useParams() as { siteId: string };
  const dispatch = useAppDispatch();
  useTitle('My site');

  useEffect(() => {
    void dispatch(sectionsActions.getSiteSections({ siteId: Number(siteId) }));
    void dispatch(sitesActionss.getCurrentSite({ id: Number(siteId) }));
  }, [dispatch, siteId]);

  const { sections, sectionsStatus, site, siteStatus } = useAppSelector(
    (state) => ({
      sections: state.sections.sections,
      sectionsStatus: state.sections.dataStatus,
      site: state.sites.currentSite,
      siteStatus: state.sites.dataStatus,
    }),
  );

  const handleUpdate = useCallback(
    ({ id, type }: SectionGetAllItemResponseDto) => {
      return (content: unknown) => {
        void dispatch(
          sectionsActions.updateContent({
            id: id.toString(),
            type,
            content,
          }),
        );
      };
    },
    [dispatch],
  );

  const renderSections = (): JSX.Element[] => {
    return sortSectionsByPosition(sections, sectionTypeToPosition).map(
      (section) => {
        const { content, type } = section;

        switch (type) {
          case SectionType.HEADER: {
            return (
              <Header
                content={content as SiteHeaderContent}
                key={type}
                onUpdate={handleUpdate(section)}
                navigationSections={NAVIGATION_SECTION_TYPES}
              />
            );
          }
          case SectionType.MAIN: {
            return <Main content={content as SiteMainContent} key={type} />;
          }
          case SectionType.ABOUT: {
            return (
              <About
                content={content as SiteAboutContent}
                key={type}
                type={type}
                onUpdate={handleUpdate(section)}
              />
            );
          }
          case SectionType.PORTFOLIO: {
            return (
              <Portfolio
                content={content as SitePortfolioContent}
                type={type}
                key={type}
                onUpdate={handleUpdate(section)}
              />
            );
          }
          case SectionType.FOOTER: {
            return (
              <Footer
                content={content as SiteFooterContent}
                navigationSections={NAVIGATION_SECTION_TYPES}
                key={type}
              />
            );
          }
          case SectionType.FEEDBACK: {
            return (
              <Feedback
                content={content as SiteFeedbackContent}
                type={type}
                key={type}
                onUpdate={handleUpdate(section)}
              />
            );
          }
          case SectionType.SERVICE: {
            return (
              <Service
                content={content as SiteServiceContent}
                type={type}
                key={type}
              />
            );
          }
        }
      },
    );
  };

  const isLoading =
    sectionsStatus === DataStatus.PENDING || siteStatus === DataStatus.PENDING;

  if (isLoading) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return (
    <div className={styles['site']}>
      <div className={styles['button-container']}>
        <div className={styles['button-wrapper']}>
          <div>
            <Link
              to={configureString<ValueOf<typeof AppRoute>>(
                AppRoute.PROJECTS_$PROJECT_ID_SITES,
                {
                  projectId: site?.projectId,
                },
              )}
            >
              <span className={styles['link-to-projects']}>
                <Icon iconName="arrowLeft" className={styles['back-icon']} />
              </span>
            </Link>
          </div>
          <h2>Back to all sites</h2>
        </div>
      </div>
      {renderSections()}
    </div>
  );
};

export { Site };
