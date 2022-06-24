1. form 组件设置 layout="inline" 时，下拉框宽度不正确。

   <Select style={{ width: '100%' }} />

2. form label 超出显示...

```css
.form {
  :global(.ant-form-item-label > label) {
    width: 100%;
  }
}
```

```jsx
<Form class="form">
  <Form.Item
    label={
      <div className="ant-table-cell-ellipsis" title="实验室名称">
        实验室名称
      </div>
    }
  ></Form.Item>
</Form>
```
