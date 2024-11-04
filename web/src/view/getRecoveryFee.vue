<template>
    <div id="getRecoveryFee">
      <h1>Recovery Fee is {{ result }}</h1>
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
          let fee = await this.getRecoveryFee();
          console.log('Recovery Fee:', fee);
          this.result = fee;
        } catch (error) {
          this.result = error.message;
        }
      },
    }
  };
  </script>
  
  <style>
  #getRecoveryFee {
    margin-top: 30px;
    padding-top: 30px;
    text-align: center;
  }
  </style>