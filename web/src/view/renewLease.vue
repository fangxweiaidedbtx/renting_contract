<template>
    <div id="renewLease">  
        <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="property Id">
            <el-input v-model="form.propertyId" placeholder="please input property Id" />
        </el-form-item>
        <el-form-item label="user account">
            <el-input v-model="form.propertyId" placeholder="please input your user account" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">renew lease</el-button>
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
                usr_addr:''
            },
            result:''
        }
    },
    methods: {
        async onSubmit() {
            try {
                let ans = await this.renewLease(this.form.propertyId,this.form.usr_addr)
                console.log(ans)
                this.result = ans
                
            } catch (error) {
                this.result = error.message
            }
            
        }
    }

}
</script>

<style>
#renewLease {
    margin-top :30px;
    padding-top: 30px;
}
</style>