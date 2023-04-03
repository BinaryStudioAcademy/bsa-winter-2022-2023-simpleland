import { Loader, PageLayout } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import {
  type SiteAboutContent,
  type SiteFeedbackContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
  SectionType,
} from '~/packages/sections/sections.js';
import { actions as sectionsActions } from '~/slices/sections/sections.js';

import {
  About,
  Feedback,
  Footer,
  Header,
  Main,
} from './components/components.js';
import styles from './styles.module.scss';

const Site: React.FC = () => {
  const dispatch = useAppDispatch();

  const { sections, status } = useAppSelector((state) => ({
    sections: state.sections.sections,
    status: state.sections.dataStatus,
  }));

  const { siteId } = useParams() as { siteId: string };

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
          return <Main content={content as SiteMainContent} key={type} />;
        }
        case SectionType.ABOUT: {
          return <About content={content as SiteAboutContent} key={type} />;
        }
        case SectionType.PORTFOLIO: {
          return <></>;
        }
        case SectionType.FOOTER: {
          return <Footer content={content as SiteFooterContent} key={type} />;
        }
        case SectionType.FEEDBACK: {
          return (
            <Feedback content={content as SiteFeedbackContent} key={type} />
          );
        }
      }
    });
  };

  return <div className={styles['site']}>{renderSections()}</div>;
};

export { Site };
