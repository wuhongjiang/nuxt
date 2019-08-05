<template>
<section class="contianer">
  <el-row type="flex" justify="space-between">

    <!-- 顶部过滤列表 -->
    <div class="flights-content">
      <!-- 过滤条件 -->
      <div>

      </div>

      <!-- 航班头部布局 -->
      <div>
        <FlightstHead />
      </div>

      <!-- 航班信息 -->
      <div>
        <!-- 航班列表 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页 -->

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 4, 6, 8]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="aside">
      <!-- 侧边栏组件 -->
    </div>
  </el-row>
</section>
</template>

<script>
import FlightstHead from '@/components/air/flightstHead'
import FlightsItem from '@/components/air/flightsitem'
export default {
  data() {
    return {
      flightsData: {}, //航班的总数
      dataList: [], //航班列表数据，用于循环flightsiTEM，单独出来是因为要分页
      // 当前页数
      pageIndex: 1,
      // 显示的条数
      pageSize: 2,
      // 总页数
      total: 0
    }
  },
  components: {
    FlightstHead,
    FlightsItem
  },
  methods: {
    // 修改分页数时候触发
    handleSizeChange(value) {
      // 修改分页的数据
      this.pageSize = value;
      // 获取分页数据
      this.getDataList();
    },
    // 切换页数时触发
    handleCurrentChange(value) {
      // 修改页数
      this.pageIndex = value;
      // 获取分页的数据
      this.getDataList();
    },
    // 获取分页的数据
    getDataList() {
      //  修改dataList的数据
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      )
    },
    // 获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query //来自uRl的5个参数 
      }).then(res => {
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights;
      })
    }
  },
  mounted() {
    this.getData();

    // 请求列表数据
    this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      // 总条数
      this.total = this.flightsData.flights.length;
      // 切割出当前的页面显示的数据
      this.dataList = this.flightsData.flights.slice(0, 2);
    })
  }
}
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
