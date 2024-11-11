
<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#1D6BC5" 
  text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        Retrieve Property Information
      </template>
      <el-menu-item index="1-1">Get Single Property Information</el-menu-item>
      <el-menu-item index="1-2">Get All Property Information</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        Retrieve Basic Information
      </template>
      <el-menu-item index="2-1">Get Publishing Fee</el-menu-item>
      <el-menu-item index="2-2">Get Maintenance Fee</el-menu-item>
      <el-menu-item index="2-3">Get Deposit Fee</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <i class="el-icon-document"></i>
        Host Operations
      </template>
      <el-menu-item index="3-1">Publish Property</el-menu-item>
      <el-menu-item index="3-2">Get Deposit and Security Deposit</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <i class="el-icon-setting"></i>
        Guest Operations
      </template>
      <el-menu-item index="4-1">Rent</el-menu-item>
      <el-menu-item index="4-2">Renew Lease</el-menu-item>
      <el-menu-item index="4-3">Refund</el-menu-item>
      <el-menu-item index="4-4">Check Out</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5">Unlock My Account</el-menu-item>
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