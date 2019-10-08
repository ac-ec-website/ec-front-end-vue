<template>
  <div class="row">
    <AdminNav class="sidebar col-md-2 d-none d-md-block bg-light" />

    <div class="col-md-10 ml-sm-auto col-lg-10">
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
          <div class="col-lg-6">
            <div class="card-body">
              <h4>熱賣商品</h4>
              <table class="table text-light">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in topSellingArray" :key="product.id">
                    <th scope="row">{{product.name}}</th>
                    <td>{{product.price}}</td>
                    <td>{{product.quantity}}</td>
                    <td>{{product.amount}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-6">優惠券使用情形</div>
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
      topSelling: {},
      topSellingArray: [],
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
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      try {
        const vm = this
        const { data, statusText } = await adminOrderAPI.getOrders()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        console.log(data)

        vm.setOverallData(data.orders)
        vm.setChart(data.orders)
        vm.setTopSell(data.orders)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 Orders 資料，請稍後再試'
        })
      }
    },
    async setOverallData(orders) {
      try {
        vm.orderCount = orders.length
        orders.map(order => {
          vm.productCount += order.items.reduce((acc, cur) => {
            return cur.OrderItem.quantity + acc
          }, 0)
          vm.revenue += order.checkoutPrice
          vm.netSales +=
            order.checkoutPrice -
            order.items.reduce((acc, cur) => {
              return cur.cost_price * cur.OrderItem.quantity + acc
            }, 0)
        })
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 Overall data 資料，請稍後再試'
        })
      }
    },
    async setChart(orders) {
      try {
        const monthlyRevenue = [...Array(12)].map(_ => 0)
        const monthlyNetSales = [...Array(12)].map(_ => 0)
        orders.map(order => {
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
        Toast.fire({
          type: 'error',
          title: '無法取得 chart 資料，請稍後再試'
        })
      }
    },
    async setTopSell(orders) {
      try {
        orders.map(order => {
          order.items.map(item => {
            if (!vm.topSelling[item.id]) {
              vm.topSelling[item.id] = {
                id: item.id,
                name: item.name,
                price: item.sell_price,
                quantity: item.OrderItem.quantity,
                amount: item.sell_price * item.OrderItem.quantity
              }
              return
            }

            vm.topSelling[item.id].quantity += item.OrderItem.quantity
            vm.topSelling[item.id].amount += item.sell_price * item.OrderItem.quantity
          })
        })
        Object.keys(vm.topSelling).forEach(function(key) {
          vm.topSellingArray.push(vm.topSelling[key])
        })
        vm.topSellingArray.sort((a, b) => b.amount - a.amount)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 Top Sell 資料，請稍後再試'
        })
      }
    },
    async setCoupon(orders) {
      try {
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得 Coupon 資料，請稍後再試'
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