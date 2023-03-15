import { PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback((): void => {
    // handle sign in
  }, []);

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <PageLayout>
      <div className={styles.pageContent}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoDot}></span>
          <div className={styles.logoText}>SimpleLand</div>
        </div>
        <div className={styles.formWrapper}>{getScreen(pathname)}</div>
      </div>
    </PageLayout>
  );
};

export { Auth };
