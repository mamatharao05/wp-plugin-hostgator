import {
	Card,
	CardBody,
	CardHeader,
    CardFooter,
    Button,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { settings } from '@wordpress/icons';

const SettingsCallout = () => {

	return (
		<Card>
			<CardHeader>
				<Heading level="3">
					{__('Settings', 'hostgator-wordpress-plugin')}
				</Heading>
			</CardHeader>
			<CardBody>
				{__(
					'Manage your site settings. You can ajdust automatic updates, comments, revisions and more.',
					'hostgator-wordpress-plugin'
				)}
			</CardBody>
            <CardFooter>
                <Button
                    variant="primary"
                    href="#/settings"
					onClick={() => {window.scrollTo(0, 0)}}
                    icon={settings}
                >
                    {__('Settings', 'hostgator-wordpress-plugin')}
                </Button>
            </CardFooter>
		</Card>
	);
};

export default SettingsCallout;
