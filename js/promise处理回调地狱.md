```javascript
new Promise((resolve, reject) => {
  console.log("hello1");
  resolve();
})
  .then(() => {
    console.log(1);
    new Promise((resolve, reject) => {
      console.log("hello2");
      resolve();
    }).then(() => {
      console.log(2);
    });
  })
  .then(() => {
    console.log(3);
  });

```

转换成下面写法 每次都return一个新的promise

```javascript
new Promise((resolve, reject) => {
  console.log("hello1");
  resolve();
})
    .then(() => {
        console.log(1);
        return new Promise((resolve, reject) => {
            console.log("hello2");
            resolve    
        });
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    });
```

