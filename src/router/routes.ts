import { RouteRecordRaw } from 'vue-router';
// should load in lazy loading mode
// https://router.vuejs.org/guide/advanced/lazy-loading.html
const InterviewPage = () => import('pages/InterviewPage.vue');
const ReminderPage = () => import('pages/ReminderPage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      // { path: '/notifications', component: () => import('src/pages/NotificationsPage.vue') },
      { path: '/todo', component: () => import('pages/TodoPage.vue') },
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
      {
        path: '/preferences',
        component: () => import('pages/PreferencesPage.vue'),
      },
      { path: '/interview', component: InterviewPage },
      {
        path: '/signalement',
        component: () => import('pages/SignalementPage.vue'),
      },
      { path: '/presence', component: () => import('pages/PresencePage.vue') },
      { path: '/guides', component: () => import('pages/GuidesPage.vue') },
      {
        path: '/medications',
        component: () => import('pages/MedicationsPage.vue'),
      },
      { path: '/supply', component: () => import('pages/SupplyPage.vue') },
      {
        path: '/exercises',
        component: () => import('pages/ExercisesPage.vue'),
      },
      { path: '/security', component: () => import('pages/SecurityPage.vue') },
      {
        path: '/registration',
        component: () => import('pages/RegistrationPage.vue'),
      },
      {
        path: '/connexion',
        component: () => import('pages/ConnexionPage.vue'),
      },
      { path: '/ges_food', component: () => import('pages/FoodPage.vue') },
      {
        path: '/ges_commute',
        component: () => import('pages/CommutePage.vue'),
      },
      { path: '/ges_waste', component: () => import('pages/WastePage.vue') },
      { path: '/ges_goods', component: () => import('pages/GoodsPage.vue') },
      { path: '/ges_hobby', component: () => import('pages/HobbyPage.vue') },
      { path: '/reminder', component: ReminderPage },
      { path: '/chat_ai', component: () => import('pages/ChatAIPage.vue') },
      { path: '/faq', component: () => import('pages/support/FAQPage.vue') },
      {
        path: '/conditions',
        component: () => import('pages/support/ConditionsPage.vue'),
      },
      {
        path: '/confidentiality',
        component: () => import('pages/support/ConfidentialityPage.vue'),
      },
      {
        path: '/contactus',
        component: () => import('pages/support/ContactUsPage.vue'),
      },
    ],
  },
  {
    path: '/i18n',
    component: () => import('layouts/I18NLayout.vue'),
    children: [
      {
        path: '/i18n/index',
        name: 'i18n-index',
        component: () => import('pages/i18n/I18NIndexPage.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '/admin/index',
        name: 'admin-index',
        component: () => import('pages/admin/AdminIndexPage.vue'),
      },
    ],
  },
  {
    path: '/help',
    component: () => import('layouts/HelpLayout.vue'),
    // children: [
    //   { path: '/help/index',
    //     name: 'help-index',
    //     component: () => import('pages/help/HelpIndexPage.vue')
    //   },
    // ],
  },
  // {
  //   path: '/posts',
  //   component: () => import('layouts/DefaultEdit.vue'),
  //   meta: {
  //     requiresAuth: true
  //   },
  //   children: [
  //     {
  //       path: '/posts/create',
  //       name: 'posts-create',
  //       component: () => import('pages/posts/create.vue'),
  //       meta: {
  //         requiresAuth: true
  //       }
  //     },
  //     {
  //       path: '/posts/show',
  //       name: 'posts-show',
  //       component: () => import('pages/posts/show.vue'),
  //       meta: {
  //         requiresAuth: true
  //       }
  //     },
  //     {
  //       path: '/posts/edit',
  //       name: 'posts-edit',
  //       component: () => import('pages/posts/edit.vue'),
  //       meta: {
  //         requiresAuth: true
  //       }
  //     }
  //   ]
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
