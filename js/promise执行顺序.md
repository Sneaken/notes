```
先执行里面 ，再执行外面
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

