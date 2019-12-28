```
 // initial data
  msg = 123;

  // use prop values for initial data
   helloMsg = 'Hello, ' + this.propMessage;

  // lifecycle hook
  mounted() {
    // this.greet();
  }

  // computed
  get computedMsg() {
    return 'computed ' + this.msg;
  }

  // method
  greet() {
    alert('greeting: ' + this.msg);
  }
```

