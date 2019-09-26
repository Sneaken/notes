node接收文件需要包 multer

```
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  // 确定图片存储的位置
  destination: path.join(__dirname, "../../public/upload"),
  // 确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });
router.use(upload.single("file"));

req.file 就是接收的文件


if(req.file){//上传的文件存在
    fs.unlink(req.file.path, e => {    //删除文件
        if (e) {
            console.log("文件操作失败");
            throw e;
        }
    });
}
```

