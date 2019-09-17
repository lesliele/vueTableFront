import VUETABLE from '../components/MyVuetable';
import USERADD from '../components/UserAdd';

export default {
    routes: [
        {
            name: 'home',
            path: '/home',
            component: VUETABLE
        },
        {
            path: '/',
            component: VUETABLE
        },
        {
          name: 'user',
          path: '/user',
          component: USERADD
        }
    ]
}