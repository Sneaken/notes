```
如果是vue页面中的内部跳转，可以用this.$router.push()实现
但是如果我们还用这种方法跳到外部链接，就会报错，我们一看链接的路径，原来是我们的外部链接前面加上了http://localhost:8080/#/这一串导致跳转出现问题
跳转到外部链接 用 window.location.href = 'url'
```

