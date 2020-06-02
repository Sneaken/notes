# footer 吸底布局

## 较好的方案 flexbox

```html
<body>
  <header><h1>Site name</h1></header>
  <main>
    <p>
      Bacon Ipsum dolor sit amet...
      <!-- Filler text from baconipsum.com -->
    </p>
  </main>
  <footer>
    <p>© 2015 No rights reserved.</p>
    <p>Made with ♥ by an anonymous pastafarian.</p>
  </footer>
</body>
```

```css
body { /* 主要内容的父盒子*/
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
main { /* 主要内容的盒子 */
  flex: 1; /* 把高度撑起来 */
}
```
