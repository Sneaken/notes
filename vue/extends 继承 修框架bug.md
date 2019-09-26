通过继承修bug

```
import { Loadmore } from 'mint-ui'

export default {
  extends: Loadmore, //从哪里继承
  methods: {
    handleTouchEnd: function handleTouchEnd (event) {
      if (
        this.direction === 'down' &&
        this.getScrollTop(this.scrollEventTarget) === 0 &&
        this.translate > 0
      ) {
        this.topDropped = true
        event.preventDefault()  // 修Bug
        event.stopPropagation() // 修Bug
        if (this.topStatus === 'drop') {
          this.translate = '50'
          this.topStatus = 'loading'
          this.topMethod()
        } else {
          this.translate = '0'
          this.topStatus = 'pull'
        }
      }
      if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
        event.preventDefault() // 修Bug
        event.stopPropagation() // 修Bug
        this.bottomDropped = true
        this.bottomReached = false
        if (this.bottomStatus === 'drop') {
          this.translate = '-50'
          this.bottomStatus = 'loading'
          this.bottomMethod()
        } else {
          this.translate = '0'
          this.bottomStatus = 'pull'
        }
      }
      this.$emit('translate-change', this.translate)
      this.direction = ''
    }
  }
}

```

