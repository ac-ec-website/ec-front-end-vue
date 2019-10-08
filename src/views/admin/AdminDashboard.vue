<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="container">
        <div class="row py-5 text-center">
          <div class="col-lg-3 col-md-6">
            <div class="card-body">
              <h6>銷售商品總數</h6>
              <h2>{{productCount}}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card-body">
              <h6>銷售訂單總數</h6>
              <h2>{{orderCount}}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card-body">
              <h6>總營收</h6>
              <h2>{{revenue | currency}}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card-body">
              <h6>總淨利</h6>
              <h2>{{netSales| currency}}</h2>
            </div>
          </div>
        </div>
        <div class="row revenue-chart">
          <div class="col-12">
            <highcharts :options="chartOptions" ref="highcharts"></highcharts>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">熱賣商品</div>
          <div class="col-md-6">優惠券使用情形</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'
import { currencyFilter } from '@/utils/mixins'
import adminOrderAPI from '@/apis/admin/adminOrder'
import { Toast } from '@/utils/helpers'
import { Chart } from 'highcharts-vue'

export default {
  components: {
    AdminNav,
    highcharts: Chart
  },
  mixins: [currencyFilter],
  data() {
    return {
      productCount: 0,
      orderCount: 0,
      revenue: 0,
      netSales: 0,
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: '每月銷售額、淨利'
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '金額 (NT$)'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>$ {point.y:,.0f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: []
      }
    }
  },
  created() {
    this.fetchOverallData()
  },
  methods: {
    async fetchOverallData() {
      try {
        const vm = this
        const { data, statusText } = await adminOrderAPI.getOrders()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        console.log(data)
        vm.orderCount = data.orders.length

        const monthlyRevenue = [...Array(12)].map(_ => 0)
        const monthlyNetSales = [...Array(12)].map(_ => 0)
        data.orders.map(order => {
          vm.productCount += order.items.reduce((acc, cur) => {
            return cur.OrderItem.quantity + acc
          }, 0)
          vm.revenue += order.checkoutPrice
          vm.netSales +=
            order.checkoutPrice -
            order.items.reduce((acc, cur) => {
              return cur.cost_price * cur.OrderItem.quantity + acc
            }, 0)
          const orderMonth = parseInt(order.createdAt.slice(5, 7))
          monthlyRevenue[orderMonth - 1] += order.checkoutPrice
          monthlyNetSales[orderMonth - 1] +=
            order.checkoutPrice -
            order.items.reduce((acc, cur) => {
              return cur.cost_price * cur.OrderItem.quantity + acc
            }, 0)
        })

        let chart = this.$refs.highcharts.chart
        chart.addSeries({
          name: '銷售額',
          data: monthlyRevenue
        })
        chart.addSeries({
          name: '淨利',
          data: monthlyNetSales
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          type: 'error',
          title: '無法取得 Overall 資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.card-body {
  background-color: #343a40;
  color: #f8f9fa;
  margin: 0.5em 0;
  border-radius: 10px;
}
</style>