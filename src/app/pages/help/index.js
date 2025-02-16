import { Page } from '../../components/page';
import { SectionContainer, SectionContent, SectionHeader } from '../../components/section';
import help from '../../data/help';
import { getLinkPerRegion, supportsLinkPerRegion } from '../../util/helpers';
import { Button, Card, Title } from "@newfold/ui-component-library";

const HelpCard = ({ item }) => {
	return ( 
		<Card className={`hgwp-help-card card-help-${item.name}`}>
			<Card.Content>
				<Title 
					as="h3" 
					size="4"
					className="nfd-mb-2"	
				>{item.title}</Title>
				<p>{item.description}</p>
			</Card.Content>

			<Card.Footer>
				<Button
					variant="secondary"
					as="a"
					className="nfd-w-full"
					href={ getLinkPerRegion( item.id, item.cta )}
					target="_blank"
				>
					{item.cta}
				</Button>
			</Card.Footer>
		</Card>
	 );
}

const Help = () => {
	const renderHelpCards = () => {
		const helpItems = help;

		return (
			<div className="nfd-grid nfd-gap-6 nfd-grid-cols-1 sm:nfd-grid-cols-2 xl:nfd-grid-cols-3 2xl:nfd-grid-cols-4">
				{helpItems.map((item) => (
					supportsLinkPerRegion(item.id) &&
					<HelpCard key={item.name} item={item} />
				))}
			</div>
		);
	};
	return (
		<Page className={"hgwp-app-help-page"}>
			<SectionContainer className={'hgwp-app-help-container'}>
				<SectionHeader
					title={__('Help', 'wp-plugin-hostgator')}
					subTitle={__('We are available 24/7 to help answer questions and solve your problems.',
					'wp-plugin-hostgator')}
				/>

				<SectionContent>
					{renderHelpCards()}
				</SectionContent>
			</SectionContainer>
		</Page>
	);
};

export default Help;
