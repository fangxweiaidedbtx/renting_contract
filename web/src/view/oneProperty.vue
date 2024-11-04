<template>
    <div id="oneProperty">  
        <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="property Id">
            <el-input v-model="form.propertyId" placeholder="please input property Id" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">search</el-button>
        </el-form-item>

    </el-form>

    </div>
    <div v-if="!result.invalid">
        <p>address:{{result.addr}}</p>
        <p>area:{{result.area}}</p>
        <p>deposit:{{result.deposit}}</p>
        <p>isRented:{{result.isRented}}</p>
        <p>landlord:{{result.landlord}}</p>
        <p>nextRentDue:{{result.nextRentDue}}</p>
        <p>rent:{{result.rent}}</p>
        <p>tenant:{{result.tenant}}</p>
        <p>contact information:{{result.contactInformation  }}</p>
    </div>
    <div v-else>
        <p>this property is not exist or invalid</p>
    </div>
</template>

<script>
export default {
    name: 'OneProperty',
    data() {
        return {
            form: {
                propertyId: '',
            },
            result:{
                landlord:'',
                rent:'',
                addr:'',
                area:'',
                deposit:'',
                hashLock:'',
                invalid:"",
                isRented:'',
                nextRentDue:'',
                tenant:'',
                timeLock:'',
                contactInformation:''
            }
        }
    },
    methods: {
        async onSubmit() {
            try {
                let ans = await this.getProperty(this.form.propertyId)
                this.result.addr = ans.addr
                this.result.area = ans.area
                this.result.deposit = ans.deposit
                this.result.hashLock = ans.hashLock
                this.result.invalid = ans.invalid
                this.result.isRented = ans.isRented
                this.result.landlord = ans.landlord
                this.result.nextRentDue = ans.nextRentDue
                this.result.rent = ans.rent
                this.result.tenant = ans.tenant
                this.result.timeLock = ans.timeLock
                this.result.contactInformation = ans.contactInformation
                
                
            } catch (error) {
                this.result = error.message
            }
            
        }
    }

}
</script>

<style>
#oneProperty {
    margin-top :30px;
    padding-top: 30px;
}
</style>