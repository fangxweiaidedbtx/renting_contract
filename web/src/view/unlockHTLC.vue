<template>
    <div id="unlockHTLC">
      <el-text class="mx-1" size="large">The unlockHTLC function allows a landlord to unlock and receive the deposit and first month's rent by providing a valid preimage that matches the property's hash lock, once the conditions are met.</el-text>
      <br><br><br>
      <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="Property ID">
          <el-input v-model="form.propertyId" placeholder="Please input property ID" />
        </el-form-item>
        <el-form-item label="Preimage">
          <el-input v-model="form.preimage" placeholder="Please input the preimage" />
        </el-form-item>
        <el-form-item label="Landlord Account">
          <el-input v-model="form.usr_addr" placeholder="Please input your landlord account" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Unlock HTLC</el-button>
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
          preimage: '',
          usr_addr: ''
        },
        result: ''
      };
    },
    methods: {
      async onSubmit() {
        try {
          let ans = await this.unlockHTLC(this.form.propertyId, this.form.preimage, this.form.usr_addr);
          console.log(ans);
          if(ans){
            this.result = "Successfully unlocked the HTLC and received the deposit and rent";
          }else{
            this.result = "Sorry, because the time lock has not expired yet or you are not the corresponding landlord of the room, you cannot proceed with the refund operation"
          }
        } catch (error) {
          this.result = "Sorry, because the time lock has not expired yet or you are not the corresponding landlord of the room, you cannot proceed with the refund operation"
        }
      }
    }
  };
  </script>
  
  <style>
  #unlockHTLC {
    margin-top: 30px;
    padding-top: 30px;
  }
  </style>