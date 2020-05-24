效果 文字在滑块中间

```html
<el-switch v-model="row.topping" active-text="开" inactive-text="关" />
```

```stylus
.el-switch
    /deep/ .el-switch__label--left
        position relative
        left 46px
        color #fff
    /deep/ .el-switch__label--right
        position relative
        right 46px
        color #fff
    /deep/ .el-switch__label.is-active
        z-index 1111
        color #fff
```
