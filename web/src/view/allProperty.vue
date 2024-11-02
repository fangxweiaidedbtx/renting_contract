<template>
    <el-collapse v-model="activeName" class="property-collapse">
        <el-collapse-item   v-for="(item, index) in result"  :key="index"  :title="`房源信息 ${index + 1}`"  :name="index.toString()">
        <template #header>
          <div>房源信息 {{ index + 1 }}</div>
        </template>
        <div>房东：{{ item.landlord }}</div>
        <div>租金：{{ item.rent }}</div>
        <div>地址：{{ item.addr }}</div>
        <div>面积：{{ item.area }}</div>
        <div>押金：{{ item.deposit }}</div>
        <div>无效：{{ item.invalid }}</div>
        <div>是否已租：{{ item.isRented }}</div>
        <div>下次租金到期：{{ item.nextRentDue }}</div>
        <div>租客：{{ item.tenant =="0x0000000000000000000000000000000000000000"? "not rented" : item.tenant }}</div>
      </el-collapse-item>
    </el-collapse>
  </template>
  
  <script>
  export default {
    name: 'AllProperty',
    data() {
      return {
        activeName: '0', // 默认展开第一个面板
        result: [],
        myerror: "",
      };
    },
     mounted() {
       this.Refresh();
    },
    methods: {
      async Refresh() {
        try {
          let allAns = await this.getAllProperties();
          console.log(allAns);

          for (let ans of allAns) {
            let temp = {
              landlord: ans.landlord,
              rent: ans.rent,
              addr: ans.addr,
              area: ans.area,
              deposit: ans.deposit,
              hashLock: ans.hashLock,
              invalid: ans.invalid,
              isRented: ans.isRented,
              nextRentDue: ans.nextRentDue,
              tenant: ans.tenant,
              timeLock: ans.timeLock,
            };
            this.result.push(temp);
          }
          return true;
        } catch (error) {
          this.myerror = error.message;
        }
      },
    },
  };
  </script>
  
  <style>
  .property-collapse {
    margin: 20px;
  }
  </style>