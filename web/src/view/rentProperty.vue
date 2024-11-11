<template>
    <div id="unlockMyAccount">
      <a href="https://www.lddgo.net/encrypt/hash" target="_blank">if you have hashLock, you can click here to get a hashLock</a>
      <br>
      <br>
      <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="Property ID">
          <el-input v-model="form.propertyId" placeholder="please input property ID" />
        </el-form-item>
  
        <el-form-item label="HashLock">
          <el-input v-model="form.hashLock" placeholder="please input hashLock" />
        </el-form-item>
  
        <el-form-item label="User Address">
          <el-input v-model="form.usr_addr" placeholder="please input user address" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">rent property</el-button>
        </el-form-item>
      </el-form>
      <br>
      <div v-if="res.transactionHash">
        <h1>Congratulations! You have successfully rented the property!</h1>
        <p>your transaction hash is: {{ res.transactionHash }}</p>
            <br>
            <h3>your transaction details as follows:</h3><br>
            <p>blockHash: {{ res.blockHash }}</p>
            <p>blockNumber: {{ res.blockNumber }}</p>
            <p>cumulativeGasUsed: {{ res.cumulativeGasUsed }}</p>
            <p>effectiveGasPrice: {{ res.effectiveGasPrice }}</p>
            <p>from: {{ res.from }}</p>
            <p>gasUsed: {{ res.gasUsed }}</p>
            <p>to: {{ res.to }}</p>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // propertyId, hashLock, usr_addr
            form: {
                propertyId: '',
                hashLock: '',
                usr_addr: '',
            },
            res: {}

        }
    },
    methods: {
        async onSubmit() {
            try {
                let ans = await this.rentProperty(this.form.propertyId, this.form.hashLock, this.form.usr_addr)
                console.log(ans);

                this.res = {
                    blockHash: ans.blockHash,
                    blockNumber: ans.blockNumber.toString(), // 转换为字符串，因为bigint在前端可能不被支持
                    cumulativeGasUsed: ans.cumulativeGasUsed.toString(),
                    effectiveGasPrice: ans.effectiveGasPrice.toString(),
                    from: ans.from.toString(),
                    gasUsed: ans.gasUsed.toString(),
                    // logs: ans.logs,
                    // logsBloom: ans.logsBloom,
                    status: ans.status.toString(),
                    to: ans.to.toString(),
                    transactionHash: ans.transactionHash.toString()
                };

            } catch (error) {
                this.result = error.message
            }

        }
    }

}
</script>

<style>
#unlockMyAccount {
    margin-top: 30px;
    padding-top: 30px;
}
</style>