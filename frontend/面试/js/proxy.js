const source = {};
const proxy = new Proxy(source, {
  get(target, propKey, receiver) {
    console.log(target === source); // true
    console.log(receiver === proxy); // true
    return Reflect.get(target, propKey, receiver);
  },
});
proxy.a = 1;
proxy.b = 12;
console.log(proxy.a);
console.log(source);
