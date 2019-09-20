<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 21:49:00
 * @LastEditTime: 2019-09-17 21:06:11
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div id="userAdd" class="userAdd">
        <div class="page_header">
            <button type="button" class="back" @click="goBack">返回</button>
        </div>
        <div class="form_wrapper">
            <div class="cm_inner">
                <label class="cm_label">年龄</label>
                <input type="Number" placeholder="请输入您的年龄" class="cm_input" v-model="formData.age" data-type="age" @blur="handleBlur"/>
                <i class="tips" v-if="ageTip">{{ageText}}</i>
            </div>
            <div class="cm_inner">
                <label class="cm_label">传真</label>
                <input type="text" placeholder="请输入您的传真" class="cm_input" v-model="formData.fax" data-type="fax" @blur="handleBlur"/>
                <i class="tips" v-if="faxTip">{{faxText}}</i>
            </div>
            <div class="cm_inner">
                <label class="cm_label">地址</label>
                <input type="text" placeholder="请输入您的地址" class="cm_input" v-model="formData.line1" data-type="line1" @blur="handleBlur"/>
                <i class="tips" v-if="line1Tip">{{line1Text}}</i>
            </div>
            <div class="cm_inner">
                <label class="cm_label">手机号码</label>
                <input type="text" placeholder="请输入您的手机号码" class="cm_input" v-model="formData.mobile" maxlength="11" data-type="mobile" @blur="handleBlur"/>
                <i class="tips" v-if="mobileTip">{{mobileText}}</i>
            </div>
            <div class="cm_inner">
                <label class="cm_label">电子邮箱</label>
                <input type="text" placeholder="请输入您的电子邮箱" class="cm_input" v-model="formData.email"/>
            </div>
            <div class="cm_inner">
                <label class="cm_label">姓名</label>
                <input type="text" placeholder="请输入您的姓名" class="cm_input" v-model="formData.name"/>
            </div>
            <div class="cm_inner">
                <label class="cm_label">生日</label>
                <Date-picker type="date" placeholder="选择日期" style="width: 200px" v-model="formData.birthDate"></Date-picker>
            </div>
            <div class="cm_inner">
                <label class="cm_label">性别</label>
                <input type="radio" id="male" value="1" name="male" v-model="formData.gender"/>
                <label for="male">男</label>
                <input type="radio" id="female" value="0" name="female" v-model="formData.gender"/>
                <label for="female">女</label>
            </div>
            <div class="cm_inner">
                <label class="cm_label">是否为管理员</label>
                <input type="checkbox" v-model="formData.isAdmin"/>
            </div>
            <div class="cm_inner">
                <label class="cm_label">用户头像</label>
                <Upload :action="uploadUrl" :on-success="handleUpload" name="avatar">
                    <Button icon="ios-cloud-upload-outline">上传用户头像</Button>
                </Upload>
            </div>
            <div class="save_inner">
                <button type="button" class="save" @click="postForm">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formData: {
                age: '',
                fax: '',
                line1: '',
                mobile: '',
                birthDate: '', 
                email: '',
                gender: 1, 
                name: '',
                isAdmin: false, 
                userImg: '' 
            },
            uploadUrl: "http://localhost:9008/api/profile",
            alertText: '请输入',
            ageTip: false,
            faxTip: false,
            line1Tip: false,
            mobileTip: false,
            ageText: '',
            faxText: '',
            line1Text: '',
            mobileText: ''
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/home'
            });
        },
        postForm() {
            for (let key in this.formData) {
                if (this.formData[key] === '') {
                    alert("请完善资料");
                    return;
                }
            }
            let that = this;
            this.axios.post('http://localhost:9008/api/saveUserData', {
                data: this.formData
            })
            .then(function (response) {
                console.log(response);
                that.$router.push({
                    path: '/home'
                });
            });
        },
        handleUpload(response, file, fileList) {
            if (response.code == 1) {
                this.formData.userImg = response.data;
            }
        },
        handleBlur(e) {
            let type = e.target.getAttribute('data-type');
            let regex = null;
            switch(type) {
                case "age": 
                    this.ageTip = this.formData.age > 0 && this.formData.age < 100 ? false : true;
                    this.ageText = "请输入正确的年龄";
                    break;
                case "fax": 
                    regex = /\-/gmi;
                    this.faxTip = !regex.test(this.formData.fax);
                    this.faxText = "请输入正确的传真";
                    break;
                case "line1":
                    regex = /\S+/;
                    this.line1Tip = !regex.test(this.formData.line1);
                    this.line1Text = "请输入正确的地址";
                    break;
                case "mobile":
                    regex = /\d{11}/;
                    this.mobileTip = !regex.test(this.formData.mobile);
                    this.mobileText = "请输入正确的手机号码";
                    break;
                default: 
                    console.warn('Error');
            }
        }
    }
}
</script>
<style scoped>
.userAdd{
    width: 1400px;
    margin: 0 auto;
}
.page_header{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.back{
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: #409EFF;
    color: #fff;
    font-size: 16px;
}
.form_wrapper{
    width: 1000px;
    margin: 0 auto;
}
.cm_inner{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
}
.save_inner{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.cm_label{
    flex-basis: 100px;
    font-size: 16px;
    color: #909399;
}
.cm_input{
    flex-grow: 1;
    height: 34px;
    line-height: 34px;
    border-radius: 10px;
    border: 1px solid #909399;
    padding: 0 10px;
    font-size: 16px;
}
.save{
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: #409EFF;
    color: #fff;
    font-size: 16px;
}
.tips{
    color: red;
    font-size: 12px;
}
</style>
