import Lists from '../views/Lists';
import Shops from '../views/Shops';
import Settings from '../views/Settings';

export default [
	{
		title: 'Списки',
		name: 'lists',
		iconStatic: require('../images/listsStatic.png'),
		iconActive: require('../images/listsActive.png'),
		component: Lists
	},
	{
		title: 'Магазины',
		name: 'shops',
		iconStatic: require('../images/shopsStatic.png'),
		iconActive: require('../images/shopsActive.png'),
		component: Shops
	},
	{
		title: 'Настройки',
		name: 'settings',
		iconStatic: require('../images/settingsStatic.png'),
		iconActive: require('../images/settingsActive.png'),
		component: Settings
	}
];