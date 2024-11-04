<template>
    <div id="publishProperty">
        <el-form :model="form" label-width="auto" style="max-width: 600px;">
            <el-form-item label="property address">
                <el-input v-model="form.addr" placeholder="please input property address" />
            </el-form-item>
            <el-form-item label="property area">
                <el-input v-model="form.area" placeholder="please input property area" />
            </el-form-item>
            <el-form-item label="property rent">
                <el-input v-model="form.rent" placeholder="please input property rent" />
            </el-form-item>
            <el-form-item label="your account address">
                <el-input v-model="form.usr_addr" placeholder="please input your account address" />
            </el-form-item>
            <el-form-item label="your contact information">
                <el-input v-model="form.usr_addr" placeholder="please input your contact information" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">publish my property</el-button>
            </el-form-item>

        </el-form>

        <div v-if="res.transactionHash">
            <h1>Congratulations, your property has been published!</h1>
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
            form: {
                addr: '',
                area: '',
                rent: '',
                usr_addr: '',
                contactInformation :''
            },
            res: {
                blockHash: '',
                blockNumber: '',
                cumulativeGasUsed: '',
                effectiveGasPrice: '',
                from: '',
                gasUsed: '',
                logs: [],
                logsBloom: '',
                status: '',
                to: '',
                transactionHash: ''
            }
        };
    },
    methods: {
        async onSubmit() {
            try {
                let ans = await this.publishProperty(this.form.addr, this.form.area, this.form.rent, this.form.usr_addr,this.contactInformation);
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
                console.log(this.res);
            } catch (error) {
                console.log(error);
            }
        },
    }
};
</script>
<style>
#publishProperty {
    margin-top: 30px;
    padding-top: 30px;
}
</style>