<template>
  <div class="container py-5">
    <AdminNav />

    <router-link to="/admin/products/new" class="btn btn-primary mb-4">New Products</router-link>

    <AdminProductsTable :initial-products="products" />
  </div>
</template>

<script>
import AdminNav from '@/components/admin/AdminNav'
import AdminProductsTable from '@/components/admin/AdminProductsTable'

const dummyData = {
  products: [
    {
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
    },
    {
      id: 2,
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
    },
    {
      id: 3,
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
    },
    {
      id: 4,
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
    },
    {
      id: 5,
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
    },
    {
      id: 6,
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
  ]
}

export default {
  data() {
    return {
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.products = dummyData.products
    }
  },
  components: {
    AdminNav,
    AdminProductsTable
  }
}
</script> 