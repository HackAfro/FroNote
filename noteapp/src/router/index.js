import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Home from '@/components/Home';
import TweetSection from '@/components/TweetSection';
import NoteSection from '@/components/NoteSection';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'notes',
        },
        {
          path: 'tweets',
          name: 'tweets',
          component: TweetSection,
        },
        {
          path: 'notes',
          name: 'notes',
          component: NoteSection,
        },
      ],
    },
  ],
});
