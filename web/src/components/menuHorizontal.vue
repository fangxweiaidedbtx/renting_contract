<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal"  background-color="#1D6BC5" 
  text-color="#fff"    active-text-color="#ffd04b"  @select="handleSelect">
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        获取房源信息
      </template>
      <el-menu-item index="1-1">获取单个房源信息</el-menu-item>
      <el-menu-item index="1-2">获取所有房源信息</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        获取基础信息
      </template>
      <el-menu-item index="2-1">获取发布费用</el-menu-item>
      <el-menu-item index="2-2">获取维修费用</el-menu-item>
      <el-menu-item index="2-3">获取定金费用</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <i class="el-icon-document"></i>
        房东操作
      </template>
      <el-menu-item index="3-1">发布房源</el-menu-item>
      <el-menu-item index="3-2">获取定金与押金</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <i class="el-icon-setting"></i>
        房客操作
      </template>
      <el-menu-item index="4-1">租房</el-menu-item>
      <el-menu-item index="4-2">续租</el-menu-item>
      <el-menu-item index="4-3">退款</el-menu-item>
      <el-menu-item index="4-4">退房</el-menu-item>

    </el-sub-menu>
    <el-menu-item index="5">解锁我的账户</el-menu-item>
  </el-menu>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSelect = (index, indexPath) => {
  console.log(index, indexPath);
  switch (index) {
    case '1-1':
      router.push('/oneProperty');
      break;
    case '1-2':
      router.push('/propertyList');
      break;
    case '2-1':
      router.push('/getPublishFee');
      break;
    case '2-2':
      router.push('/getRecoveryFee');
      break;
    case '2-3':
      router.push('/getBookFee');
      break;
    case '3-1':
      router.push('/publishProperty');
      break;
    case '3-2':
      router.push('/unlockHTLC');
      break;
    case '5':
      router.push('/unlockMyAccount');
      break;
    case '4-1':
      router.push('/rentProperty');
      break;
    case '4-2':
      router.push('renewLease');
      break;
    case '4-3':
      router.push('refundHTLC');
      break;
    case '4-4':
      router.push('returnDespoit');
      break;
    
    // 可以根据需要添加更多的 case
  }
};
</script>

<style>
.el-menu-demo {
  border:none;
  
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 30px;
}


</style>