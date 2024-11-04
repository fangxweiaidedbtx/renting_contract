<template>
    <div id="returnDeposit">
        <el-text class="mx-1" size="large">The returnDeposit feature allows tenants to apply for a refund of their deposit after the lease period has ended. <br>
            If the property is indeed rented out, the applicant is the tenant themselves, <br>
            and the lease period has concluded, the system will automatically return the deposit amount, <br>
            which is equivalent to one month's rent, to the tenant.
        </el-text>
        <br>        <br>        <br>
      <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="Property ID">
          <el-input v-model="form.propertyId" placeholder="Please input property ID" />
        </el-form-item>
        <el-form-item label="User Account">
          <el-input v-model="form.usr_addr" placeholder="Please input your user account" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Return Deposit</el-button>
        </el-form-item>
  
        <el-form-item v-if="result">
          <el-alert :title="result" type="info" />
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          propertyId: '',
          usr_addr: ''
        },
        result: ''
      };
    },
    methods: {
      async onSubmit() {
        try {
          let ans = await this.returnDeposit(this.form.propertyId, this.form.usr_addr);
          console.log(ans);
          this.result = ans;
        } catch (error) {
          this.result = error.message;
        }
      }
    }
  };
  </script>
  
  <style>
  #returnDeposit {
    margin-top: 30px;
    padding-top: 30px;
  }
  </style>