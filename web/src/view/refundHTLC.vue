<template>
    <div id="refundHTLC">
      <el-text class="mx-1" size="large">The refundHTLC feature enables tenants to request a refund if certain conditions are met. <br>
          If the property is rented, the requester is verified as the tenant, the time lock has expired, and the contract balance covers the required amount, <br>
          the system will return the tenant's rent, deposit, and half of the recovery fee.
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
          <el-button type="primary" @click="onSubmit">Request Refund</el-button>
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
          let ans = await this.refundHTLC(this.form.propertyId, this.form.usr_addr);
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
  #refundHTLC {
    margin-top: 30px;
    padding-top: 30px;
  }
  </style>