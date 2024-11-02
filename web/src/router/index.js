// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import oneProperty from '../view/oneProperty.vue';
import propertyList from '../view/allProperty.vue';
import publishProperty from '@/view/publishProperty.vue';
import unlockMyAccount from '@/view/unlockMyAccount.vue';
import rentProperty from '@/view/rentProperty.vue';
// 其他视图组件的导入...

const routes = [

  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path:'/',
    name:'Home',
    component:oneProperty
  },
  {
    path:'/oneProperty',
    name:'oneProperty',
    component:oneProperty
  },
  {
    path:'/propertyList',
    name:'propertyList',
    component:propertyList
  },
  {
    path:'/publishProperty',
    name:'publishProperty',
    component:publishProperty
  },
  {
    path:'/unlockMyAccount',
    name:'unlockMyAccount',
    component:unlockMyAccount

  },
  {
    path:'/rentProperty',
    name:'rentProperty',
    component:rentProperty
  }


  // 其他路由配置...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;