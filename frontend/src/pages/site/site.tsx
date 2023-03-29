import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import {
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
} from '~/packages/sections/sections.js';
import { actions as sectionsActions } from '~/slices/sections/sections.js';

import { Footer, Header, Main } from './components/components.js';
import styles from './styles.module.scss';

const Site: React.FC = () => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.sections.sections);
  const { siteId } = useParams() as { siteId: string };

  useEffect(() => {
    void dispatch(sectionsActions.getSiteSections({ siteId: Number(siteId) }));
  }, [dispatch, siteId]);

  const renderSections = (): JSX.Element[] => {
    return sections.map(({ type, content }) => {
      switch (type) {
        case 'header': {
          return <Header content={content as SiteHeaderContent} key={type} />;
        }
        case 'main': {
          return <Main content={content as SiteMainContent} key={type} />;
        }
        case 'footer': {
          return <Footer content={content as SiteFooterContent} key={type} />;
        }
      }
    });
  };

  return <div className={styles['site']}>{renderSections()}</div>;
};

export { Site };
