<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ product.name }}</h1>
      </div>

      <div class="col-md-4">
        <img
          class="img-responsive center-block"
          :src="product.image | emptyImage"
          style="width: 250px;margin-bottom: 25px;"
        />
        <div class="well">
          <ul class="list-unstyled">
            <li>
              <strong>成本:</strong>
              {{ product.cost_price }} 元
            </li>
            <li>
              <strong>原價:</strong>
              {{ product.origin_price }} 元
            </li>
            <li>
              <strong>特價:</strong>
              {{ product.sell_price }} 元
            </li>
            <li>
              <strong>庫存:</strong>
              {{ product.stock_quantity }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-8">
        <p>{{ product.description }}</p>
        <hr />
        <p v-if="product.product_status">產品已啟用</p>
        <p v-else>產品未啟用</p>
      </div>
    </div>
    <hr />

    <a href="#" @click="$router.back()">回上一頁</a>
  </div>
</template>

<script>
import { emptyImageFilter } from '@/utils/mixins'

const dummyData = {
  product: {
    id: 1,
    name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
    image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
    description: '針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。',
    stock_quantity: 50,
    cost_price: 250,
    origin_price: 580,
    sell_price: 460,
    product_status: true,
    createdAt: '2019-08-14T08:20:56.000Z',
    updatedAt: '2019-08-14T08:20:56.000Z'
  }
}

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      product: {
        id: -1,
        name: '',
        description: '',
        stock_quantity: 0,
        cost_price: 0,
        origin_price: 0,
        sell_price: 0,
        product_status: true,
        image: ''
      }
    }
  },
  created() {
    const { productId } = this.$route.params
    this.fetchProduct(productId)
  },
  methods: {
    fetchProduct(productId) {
      const { product } = dummyData
      this.product = {
        ...this.product,
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        stock_quantity: product.stock_quantity,
        cost_price: product.cost_price,
        origin_price: product.origin_price,
        sell_price: product.sell_price,
        product_status: product.product_status
      }
    }
  }
}
</script> 