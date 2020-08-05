1. 避免 Boolean 断言。例如：

   - 在测试 DOM 属性时,Boolean 断言总会留给你一个思考：元素是否包含不正确的属性值？属性是否被渲染？Boolean 断言不会告诉你答案。
   - 使用富有表达力的`值断言`来代替。

2. 避免测试 prop 过程中的陷阱

   - 如果一个组件未声明它要接受一个 prop,则 prop 不会被挑选并添加到这个 vue 实例中。
   - 对于一个接受 prop 的组件，该组件需要为它要接受的 prop 进行声明。

3. 测试组件输出的原则:

   - 仅测试动态生成的输出。
   - 仅测试组件契约部分的输出。

4. 若要触发 DOM 修改, test 的回调得用 async 声明。

5. 使用假定时器

   - 调用 jest.useFakeTimers 替换全局定时器函数, 定时器被替换后，使用 jest.runTimersToTime 推进假时间。
   - 在测试套件中使用假定时器最安全的方式是在每次测试运行之前调用 useFakeTimers。这样，定时器函数将在每次测试之前复位。（使用 beforeEach 钩子函数）
   - 从 22.0.0 版本的 Jest 开始，runTimersToTime 被重命名为 advanceTimersByTime

6. 测试 vuex

   - 通过克隆 store 配置对象来避免测试之间的 mutation 泄露，使得每次测试时都会有一个全新的 store

7. 在需要安装插件的情况下，使用 createLocalVue 来代替 Vue 基础构造函数，以便不影响 Vue 基础构造函数，但值得注意的是，并非所有插件都需要使用 localVue，为了安全起见，建议使用 localVue 进行所有的插件安装。
