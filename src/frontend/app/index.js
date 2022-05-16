/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Segment, ReviewDays, Uploads, ThemeType } from '../widgets';

const Item = ( { children } ) => <div style={ { flex: 1 } }>{ children }</div>;

function App() {
	return (
		<div style={{ maxWidth: '960px', margin: '0 auto'}}>
			<h3>Reviews</h3>
			<Flex>
				<Item>
					<ReviewDays />
				</Item>
			</Flex>
			<h3>Authors</h3>
			<Flex direction={ [ 'column', 'row' ] }>
				<Item>
					<Segment />
				</Item>
				<Item>
					<Uploads />
				</Item>
			</Flex>
			<h3>Themes</h3>
			<Flex>
				<Item>
					<ThemeType />
				</Item>
			</Flex>
		</div>
	);
}

export default App;
