<template>
  <div class="container py-5">
    <AdminProductForm :initial-product="product" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminProductForm from '@/components/admin/AdminProductForm.vue'

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
    },
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  },
  components: {
    AdminProductForm
  }
}
</script> 