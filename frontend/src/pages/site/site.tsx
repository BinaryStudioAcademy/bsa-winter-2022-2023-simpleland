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
  type SiteAboutContent,
  type SiteFeedbackContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
  type SitePortfolioContent,
  type SiteServiceContent,
  SectionType,
} from '~/packages/sections/sections.js';
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
import styles from './styles.module.scss';

const Site: React.FC = () => {
  const dispatch = useAppDispatch();
  useTitle('My site');

  const { sections, status, siteName, projectId } = useAppSelector((state) => ({
    sections: state.sections.sections,
    status: state.sections.dataStatus,
    siteName: state.sites.currentSite?.name,
    projectId: state.sites.currentSite?.projectId,
  }));

  const { siteId } = useParams() as { siteId: string };

  useEffect(() => {
    void dispatch(sectionsActions.getSiteSections({ siteId: Number(siteId) }))
      .unwrap()
      .then(() => {
        void dispatch(sitesActionss.getCurrentSite({ id: Number(siteId) }));
      });
  }, [dispatch, siteId]);

  const renderReturnButton = useCallback((): JSX.Element => {
    return (
      <div className={styles['button-wrapper']}>
        <div>
          <Link
            to={configureString<ValueOf<typeof AppRoute>>(
              AppRoute.PROJECTS_$PROJECT_ID_SITES,
              {
                projectId,
              },
            )}
          >
            <span className={styles['link-to-projects']}>
              <Icon iconName="arrowLeft" className={styles['back-icon']} />
            </span>
          </Link>
        </div>
        <h2>{siteName}</h2>
      </div>
    );
  }, [siteName, projectId]);

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  const renderSections = (): JSX.Element[] => {
    return sections.map(({ type, content }) => {
      switch (type) {
        case SectionType.HEADER: {
          return <Header content={content as SiteHeaderContent} key={type} />;
        }
        case SectionType.MAIN: {
          return (
            <Main
              content={content as SiteMainContent}
              key={type}
              renderButton={renderReturnButton}
            />
          );
        }
        case SectionType.ABOUT: {
          return <About content={content as SiteAboutContent} key={type} />;
        }
        case SectionType.PORTFOLIO: {
          return (
            <Portfolio content={content as SitePortfolioContent} key={type} />
          );
        }
        case SectionType.FOOTER: {
          return <Footer content={content as SiteFooterContent} key={type} />;
        }
        case SectionType.FEEDBACK: {
          return (
            <Feedback content={content as SiteFeedbackContent} key={type} />
          );
        }
        case SectionType.SERVICE: {
          return <Service content={content as SiteServiceContent} key={type} />;
        }
      }
    });
  };

  return <div className={styles['site']}>{renderSections()}</div>;
};

export { Site };
