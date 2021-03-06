import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';

import I18n from '../../locales';
import Books from '../containers/books';
import Book from '../containers/books/book';
import { GlobalStyles, headerTintColor } from '../styles';

import HeaderRight from './HeaderRight';
import HeaderRightBook from './headerrightbook';
import HeaderTitle from './headertitle';
import { navigationOptionsFunction } from './MenuNavigator';
import SearchNavigator from './SearchNavigator';

const Navigator = createStackNavigator(
	{
		BooksList: {
			screen: Books,
			navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
				headerTitle: () => <HeaderTitle title="books" />,
				headerRight: () => <HeaderRight navigation={navigation} />,
			}),
		},
		Book: {
			screen: Book,
			navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
				...navigationOptionsFunction({ navigation }),
				headerBackTitle: I18n.t('books'),
				title: navigation.state.params?.title,
				headerRight: () => <HeaderRightBook />,
			}),
		},
		SearchNavigator,
	},
	{
		defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => {
			const options: { [key: string]: any } = {
				headerStyle: GlobalStyles.header,
				headerTintColor: headerTintColor,
			};
			if (navigation.state.params && navigation.state.params.showBackButton) {
				options.headerLeft = () => (
					<HeaderBackButton
						tintColor={headerTintColor}
						onPress={() => {
							(navigation as any).pop();
						}}
					/>
				);
			}
			return options;
		},
	}
);

export default Navigator;
