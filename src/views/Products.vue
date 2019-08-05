<template>
  <div class="container py-5">
    <!-- 類別標籤  -->
    <NavCate :categories="categories" />

    <div class="row">
      <!-- 產品卡片 -->
      <ProductsCard v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
    </div>

    <!-- 分頁標籤  -->
    <Pagination v-if="totalPage > 1" :category-id="categoryId" :current-page="currentPage" :total-page="totalPage" />
  </div>
</template>

<script>
import ProductsCard from '@/components/ProductsCard'
import NavCate from '@/components/NavCate'
import Pagination from '@/components/Pagination'

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: 'Judy Runte',
      tel: '(918) 827-1962',
      address: '98138 Elisa Road',
      opening_hours: '08:00',
      description: 'dicta et cupiditate',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=1',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 2,
      name: 'Mrs. Mckenzie Johnston',
      tel: '567-714-6131 x621',
      address: '61371 Rosalinda Knoll',
      opening_hours: '08:00',
      description: 'Quia pariatur perferendis architecto tenetur omnis',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=2',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 3,
      name: 'Abel Blanda',
      tel: '1-554-475-7456 x210',
      address: '4510 Guiseppe Lights',
      opening_hours: '08:00',
      description: 'Quibusdam aliquid perferendis quam. Aspernatur sit',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=3',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 4,
      name: 'Davon Langosh DDS',
      tel: '(884) 775-2408',
      address: '91733 Hayden Field',
      opening_hours: '08:00',
      description: 'Quo molestiae repellendus dolorem eos nulla.\nOdio ',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=4',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 5,
      name: 'Dimitri Kuvalis',
      tel: '(683) 051-4164 x64803',
      address: '137 Torphy Shore',
      opening_hours: '08:00',
      description: 'Repellendus iusto aut aut nemo.',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=5',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 6,
      name: 'Nona Schuppe',
      tel: '443.433.1239 x6607',
      address: '874 Jayda Plain',
      opening_hours: '08:00',
      description: 'dolorum est dolor',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=6',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 7,
      name: 'Jasen Ward',
      tel: '909-961-8157 x325',
      address: "9825 O'Reilly Lodge",
      opening_hours: '08:00',
      description: 'Cum eum dolor odio. Placeat veniam corrupti assume',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=7',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 8,
      name: 'Xander Crooks',
      tel: '953.479.8828 x5860',
      address: '832 Arnulfo Hills',
      opening_hours: '08:00',
      description: 'Laborum quia ipsam repellat.',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=8',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 9,
      name: 'Jazmyn Tromp',
      tel: '(024) 685-4922 x2905',
      address: '26087 Kuhlman Meadows',
      opening_hours: '08:00',
      description: 'Aliquid ut est nihil eum. Fugit et nobis enim. Sed',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=9',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    },
    {
      id: 10,
      name: 'Landen Schmeler MD',
      tel: '764-310-0872',
      address: '86710 Oberbrunner Meadow',
      opening_hours: '08:00',
      description: 'Sunt magni repudiandae cum. Qui quae excepturi ver',
      image: 'https://loremflickr.com/320/240/food,dessert,restaurant/?random=10',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2019-06-22T09:00:43.000Z',
        updatedAt: '2019-06-22T09:00:43.000Z'
      },
      isFavorited: false,
      isLiked: false
    }
  ],
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 5,
      name: '素食料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 6,
      name: '美式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 7,
      name: '複合式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ],
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
  categoryId: ''
}

export default {
  data() {
    return {
      categories: [],
      categoryId: '',
      currentPage: 1,
      restaurants: [],
      totalPage: 0
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants() {
      this.categories = dummyData.categories
      this.categoryId = dummyData.categoryId
      this.currentPage = dummyData.page
      this.restaurants = dummyData.restaurants
      this.totalPage = dummyData.totalPage.length
    }
  },
  components: {
    NavCate,
    ProductsCard,
    Pagination
  }
}
</script>