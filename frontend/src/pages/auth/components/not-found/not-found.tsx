import { useRouteError } from 'react-router-dom';

import styless from './not-found.module.scss';

interface RouteError {
    statusText?: string;
    message?: string;
}

const ErrorPage = (): JSX.Element => {
    const error = useRouteError() as RouteError;

    return (
        <div className={styless.errorPage}>
            <h1 className={styless.warningMessage}>Oops!</h1>
            <p className={styless.text404}>
                Sorry, an unexpected error has occurred.
            </p>
            <p>
                <i className={styless.status}>{error.statusText ?? error.message}</i>
            </p>
        </div>
    );
};

export { ErrorPage as ErrorFunction };
