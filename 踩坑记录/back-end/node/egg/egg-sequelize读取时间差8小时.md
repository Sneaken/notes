```
exports.sequelize = {
  dialect: 'mysql',
  ....
  timezone: '+08:00' ,// 保存为本地时区
  //但是egg-sequelize在读取时间时，还是会返回UTC格式，还需要改一下配置，添加：
  dialectOptions: {
    dateStrings: true,
    typeCast(field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  }
}
```

