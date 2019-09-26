```
// 必须使用作用于插槽

el-table-column(prop="forbidden" label="运营状态" width="120")
    template(slot-scope="forbidden")
        el-switch(
        :active-value="1" :inactive-value="2"  //开关表示的值 1开 2关
        v-model="forbidden.row.forbidden"
        @change="changeForbidden(forbidden.row)")
```

