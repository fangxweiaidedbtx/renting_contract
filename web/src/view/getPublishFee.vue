<template>
    <div id="getPublishFee">
      <h1>Publish Fee is {{ result }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        result: ''
      };
    },
    mounted() {
      this.onSubmit();
    },
    methods: {
      async onSubmit() {
        try {
          let fee = await this.getPublishFee();
          console.log('Publish Fee:', fee);
          this.result = fee;
        } catch (error) {
          this.result = error.message;
        }
      }
    }
  };
  </script>
  
  <style>
  #getPublishFee {
    margin-top: 30px;
    padding-top: 30px;
    text-align: center;
  }
  </style>