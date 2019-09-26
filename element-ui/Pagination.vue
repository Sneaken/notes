<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :hide-on-single-page="hide"
    :current-page.sync="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSizeCopy: this.pageSize,
      hide: false
    }
  },
  props: {
    pageSizes: Array, // 每页可以多少条 如[15,20,30,50,100]
    pageSize: Number, // 每页多少条
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    data: Array // 总数据
  },
  methods: {
    setPagination() {
      // 数据总量
      this.total = this.data.length
      this.hide = this.total < this.pageSize
      // 设置默认分页数据
      this.tableData = this.data.filter((item, index) => {
        return index < this.pageSizeCopy
      })
      this.$emit('getTableData', { type: 1, data: this.tableData })
    },
    handleCurrentChange(page) {
      // 当前页
      let sortNum = this.pageSizeCopy * (page - 1)
      let table = this.data.filter((item, index) => {
        return index >= sortNum
      })
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.pageSizeCopy
      })
      this.$emit('getTableData', { type: 1, data: this.tableData })
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    handleSizeChange(page_size) {
      // 切换size
      this.currentPage = 1
      let type //从30条每页转15条每页 table 有渲染问题 父组件用setTimeout 275ms 赋值给el-table
      this.pageSizeCopy < page_size ? (type = 1) : (type = 2)
      this.pageSizeCopy = page_size
      this.tableData = this.data.filter((item, index) => {
        return index < page_size
      })
      this.$emit('getTableData', { type, data: this.tableData })
    }
  },
  watch: {
    data() {
      this.setPagination()
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-pagination
  text-align center
  margin-top 20px
</style>
