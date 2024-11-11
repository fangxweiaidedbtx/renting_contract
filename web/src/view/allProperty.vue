<template>
  <el-collapse v-model="activeName" class="property-collapse">
    <el-collapse-item v-for="(item, index) in result" :key="index" :title="`Property Information ${index + 1}`" :name="index.toString()">
      <template #header>
        <div>Property Information {{ index + 1 }}</div>
      </template>
      <div>Landlord: {{ item.landlord }}</div>
      <div>Rent: {{ item.rent }}</div>
      <div>Address: {{ item.addr }}</div>
      <div>Area: {{ item.area }}</div>
      <div>Deposit: {{ item.deposit }}</div>
      <div>Invalid: {{ item.invalid }}</div>
      <div>Is Rented: {{ item.isRented }}</div>
      <div>Next Rent Due: {{ item.nextRentDue }}</div>
      <div>Tenant: {{ item.tenant === "0x0000000000000000000000000000000000000000" ? "not rented" : item.tenant }}</div>
      <div>Contact Information: {{ item.contactInformation }}</div>
    </el-collapse-item>
  </el-collapse>
</template>
  
  <script>
  export default {
    name: 'AllProperty',
    data() {
      return {
        activeName: '0',
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
              contactInformation: ans.contactInformation
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