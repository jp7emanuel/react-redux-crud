import StoreIndex from '../components/stores';
import StoreCreate from '../components/stores/create';
import StoreTypeCreate from '../components/store-types/create';

export default [
  {
    path: '/',
    exact: true,
    component: StoreIndex,
    key: 'route-stores-index'
  }, {
    path: '/create',
    exact: true,
    component: StoreCreate,
    key: 'route-stores-create'
  }, {
    path: '/store-types/create',
    exact: true,
    component: StoreTypeCreate,
    key: 'route-store-types-create'
  }, {
    component: StoreIndex,
    key: 'route-404'
  },
]
