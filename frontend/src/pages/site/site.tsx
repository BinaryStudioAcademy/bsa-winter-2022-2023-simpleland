import { Loader, PageLayout } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  useParams,
  useTitle,
} from '~/libs/hooks/hooks.js';
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

  const { sections, status } = useAppSelector((state) => ({
    sections: state.sections.sections,
    status: state.sections.dataStatus,
  }));

  const { siteId } = useParams() as { siteId: string };

  const navigationSections = useMemo(() => {
    return sections.filter(
      (section) =>
        section.type !== SectionType.HEADER &&
        section.type !== SectionType.FOOTER,
    );
  }, [sections]);

  useEffect(() => {
    void dispatch(sectionsActions.getSiteSections({ siteId: Number(siteId) }));
  }, [dispatch, siteId]);

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
            <Main content={content as SiteMainContent} type={type} key={type} />
          );
        }
        case SectionType.ABOUT: {
          return (
            <About
              content={content as SiteAboutContent}
              type={type}
              key={type}
            />
          );
        }
        case SectionType.PORTFOLIO: {
          return (
            <Portfolio
              content={content as SitePortfolioContent}
              type={type}
              key={type}
            />
          );
        }
        case SectionType.FOOTER: {
          return (
            <Footer
              content={content as SiteFooterContent}
              navigationSections={navigationSections}
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
    });
  };

  return <div className={styles['site']}>{renderSections()}</div>;
};

export { Site };
