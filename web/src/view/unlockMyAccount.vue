<template>
    <div id="unlockMyAccount">
        <el-form :model="form" label-width="auto" style="max-width: 600px;">
            <el-form-item label="Account Address">
                <el-input v-model="form.accountAddress" placeholder="please input account address" />
            </el-form-item>

            <el-form-item label="Password">
                <el-input type="password" v-model="form.password" placeholder="please input password" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Unlock</el-button>
            </el-form-item>
        </el-form>
        <br>
        <div v-if="ans==true">
            <h1>Unlock Success</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                accountAddress: '',
                password: ''
            },
            ans: ''

        }
    },
    methods: {
        async onSubmit() {
            try {
                 this.ans = await this.unlockMyAccount(this.form.accountAddress, this.form.password)
                console.log(this.ans);



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