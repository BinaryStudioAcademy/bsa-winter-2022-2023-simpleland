import { PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

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
      <div className={styles['page-content']}>
        <div className={styles['logo-wrapper']}>
          <span className={styles['logo-dot']} />
          <div className={styles['logo-text']}>SimpleLand</div>
        </div>
        <div className={styles['form-wrapper']}>{getScreen(pathname)}</div>
      </div>
    </PageLayout>
  );
};

export { Auth };
