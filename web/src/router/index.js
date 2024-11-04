// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import oneProperty from '../view/oneProperty.vue';
import propertyList from '../view/allProperty.vue';
import publishProperty from '@/view/publishProperty.vue';
import unlockMyAccount from '@/view/unlockMyAccount.vue';
import rentProperty from '@/view/rentProperty.vue';
import renewLease from '@/view/renewLease.vue';
import returnDespoit from '@/view/returnDespoit.vue';
import refundHTLC from '@/view/refundHTLC.vue';
import unlockHTLC from '@/view/unlockHTLC.vue';
import getBookFee from '@/view/getBookFee.vue';
import getPublishFee from '@/view/getPublishFee.vue';
import getRecoveryFee from '@/view/getRecoveryFee.vue';
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
  },
  {
    path:'/renewLease',
    name:'renewLease',
    component:renewLease
  },
  {
    path:'/returnDespoit',
    name:'returnDespoit',
    component:returnDespoit
  },
  {
    path:'/refundHTLC',
    name:'refundHTLC',
    component:refundHTLC
  },
  {
    path:'/unlockHTLC',
    name:'unlockHTLC',
    component:unlockHTLC
  },
  {
    path:'/getBookFee',
    name:'getBookFee',
    component:getBookFee
  },
  {
    path:'/getRecoveryFee',
    name:'getRecoveryFee',
    component:getRecoveryFee
  },
  {
    path:'/getPublishFee',
    name:'getPublishFee',
    component:getPublishFee
  },
  


  // 其他路由配置...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;