import './stylesheet.scss';

import AppStore, { AppStoreProvider } from './data/store';
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { SnackbarList, Spinner } from '@wordpress/components';
import classnames from 'classnames';
import Header from './components/header';
import AppRoutes from './data/routes';
import ErrorCard from './components/errorCard';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { store as noticesStore } from '@wordpress/notices';
import { setActiveSubnav } from './util/helpers';

const Notices = () => {
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === 'snackbar'),
		[]
	);
	const { removeNotice } = useDispatch(noticesStore);
	return (
		<SnackbarList
			className="edit-site-notices"
			notices={notices}
			onRemove={removeNotice}
		/>
	);
};

const handlePageLoad = () => {
	const location = useLocation();
	const routeContents = document.querySelector('.hgwp-app-body-inner');
	useEffect(() => {
		setActiveSubnav(location.pathname);
		window.scrollTo(0, 0);
		if ( routeContents ) {
			routeContents.focus({ preventScroll: true });
		}
	}, [location.pathname]);
};

const AppBody = (props) => {
	const { booted, hasError } = useContext(AppStore);

	handlePageLoad();

	return (
		<main
			id="hgwp-app-rendered"
			className={classnames('wpadmin-brand-hostgator', props.className)}
		>
			<Header />
			<div className="hgwp-app-body">
				<div className="hgwp-app-body-inner">
					<ErrorBoundary FallbackComponent={<ErrorCard />}>
						{ hasError && <ErrorCard error={hasError} notice="Please update permalink settings!" /> }
						{(true === booted && <AppRoutes />) || (!hasError && <Spinner />) }
					</ErrorBoundary>
				</div>
			</div>

			<div className="hgwp-app-snackbar">
				<Notices />
			</div>
		</main>
	);
};

export const App = () => (
	<AppStoreProvider>
		<Router>
			<AppBody />
		</Router>
	</AppStoreProvider>
);

export default App;
