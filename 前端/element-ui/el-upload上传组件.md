上传到七牛云
```
<el-upload
    class="avatar-uploader"
    list-type="picture-card"
    :action="actionPath"
    :bucket="bucket"
    :data="form.cover.dataObj"
    accept="image/jpeg"
    :auto-upload="false"
    :before-upload="beforeCoverUpload"
    :on-success="handleCoverSuccess"
    :on-exceed="handleExceed"
    :on-change="handleCoverChange"
    :on-error="handleCoverError"
    :on-progress="uploadCoverProcess"
    ref="uploadCover"
    :limit="1"
>
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{ file }">
        <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt="封面"
            ref="coverImage"
        />
        <el-progress
            v-if="form.cover.uploadFlag"
            type="circle"
            :percentage="form.cover.uploadPercent"
        ></el-progress>
        <span class="el-upload-list__item-actions">
            <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
            >
                <i class="el-icon-zoom-in"></i>
            </span>
            <span
                v-if="!form.cover.disabled"
                class="el-upload-list__item-delete"
                @click="handleCoverRemove(file)"
            >
                <i class="el-icon-delete"></i>
            </span>
        </span>
    </div>
</el-upload>
<el-dialog :visible.sync="form.cover.dialogVisible">
<img width="100%" :src="form.cover.dialogImageUrl" alt="" />
</el-dialog>

data(){
	return {
	    actionPath: 'https://upload-z1.qiniup.com',  // 华东1地区   好像是？？？
      	bucket: 'qiniu2.xiguangtech.com',    //七牛云仓库的上传地址
	}
}



handleCoverChange(file, fileList) {
    if (file.status === 'ready') {
    	//blob对象生成的地址
        this.form.cover.imageUrl = URL.createObjectURL(file.raw)
        // 隐藏上传框
        this.$refs.uploadCover.$children[1].$el.classList.add('hide')
        
        // 判断文件是否符合上传要求
        const isJPG = file.raw.type === 'image/jpeg'
        const isLt2M = file.raw.size / 1024 / 1024 < 2
        if (!isJPG) {
            this.$message.error('上传封面图片只能是JPG格式!')
        }
        if (!isLt2M) {
        	this.$message.error('上传封面图片大小不能超过2MB!')
        }
        if (!(isJPG && isLt2M)) {
            this.$refs.uploadCover.$children[1].$el.classList.remove('hide')
            this.$refs.uploadCover.clearFiles()
        }
    }
},

// async 时 只有 return Promise.reject(); 才能 阻止 上传
// 其他 时候 return false; 即可
async beforeCoverUpload(file) {
    // 此时的 file 是blob对象 所以不能在上面添加属性 
    // 即 不能使用file.token = token 使用了会取消上传 且不会走onError钩子函数 不会抛错
    
    // 组件内部会根据file.status 来判断文件时候 上传 若为ready 则上传 其他则不上传
    
    
    // 此时 已经在 handleCoverChange 里面判断是否符合要求了
    await this.getToken()
    this.form.cover.dataObj.key = file.name // 图片访问地址  需要改成随机数！!!!!!!!!!!!!!!!!!
    this.form.cover.dataObj.name = file.name
    // 获取图片原始宽高
    this.form.cover.width = this.$refs.coverImage.naturalWidth
    this.form.cover.height = this.$refs.coverImage.naturalHeight
    this.form.cover.size = file.size
    return Promise.resolve()
},
uploadCoverProcess(event, file, fileList) {
    this.form.cover.uploadFlag = true
    this.form.cover.uploadPercent = Number.parseFloat(file.percentage.toFixed(2))
},
handleCoverError(err, file, fileList) {
    this.form.cover.uploadFlag = false
    this.form.cover.uploadPercent = 0
    this.$refs.uploadCover.$children[1].$el.classList.remove('hide')
},
handleCoverSuccess(res, file) {
    // 此时获得封面图片地址
    this.form.cover.uploadFlag = false
    this.form.cover.uploadPercent = 100
    this.form.cover.imageUrl = `http://${this.bucket}/` + res.key
},
handleCoverRemove(file) {
    // const index = this.$refs.uploadCover.uploadFiles.findIndex(item => item.uid === file.uid)
    // this.$refs.uploadCover.uploadFiles.splice(index, 1)  // 删除 指定文件
    // 组件内部有维护 上传过的文件列表 即el-upload组件里的 upload组件的 fileList
    // 此时 删除uploadFiles内的文件 fileList 也会同步删除
    this.$refs.uploadCover.clearFiles() //删除全部
    this.$refs.uploadCover.$children[1].$el.classList.remove('hide')
},

```

