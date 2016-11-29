import Lists from '../views/Lists';
import Shops from '../views/Shops';
import Settings from '../views/Settings';

export default [
	{
		title: 'Списки',
		name: 'lists',
		icon: require('../images/lists.png'),
		component: Lists
	},
	{
		title: 'Магазины',
		name: 'shops',
		icon: require('../images/shops.png'),
		component: Shops
	},
	{
		title: 'Настройки',
		name: 'settings',
		icon: require('../images/settings.png'),
		component: Settings
	}
];