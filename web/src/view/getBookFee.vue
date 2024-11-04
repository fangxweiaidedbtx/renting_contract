<template>
    <div id="getBookFee">
        <h1>book fee is {{ result }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        result: ''
      };
    },
    mounted(){
        this.onSubmit();

    },
    methods: {
      async onSubmit() {
        try {
          let fee = await this.getBookFee();
          console.log('Book Fee:', fee);
          this.result = fee;
        } catch (error) {
          this.result = error.message;
        }
      },
    }
  };
  </script>
  
  <style>
  #getBookFee {
    margin-top: 30px;
    padding-top: 30px;
    text-align: center;
  }
  </style>