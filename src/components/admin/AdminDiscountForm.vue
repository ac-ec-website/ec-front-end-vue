<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="discount.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="target_price">消費額度</label>
      <input
        id="target_price"
        v-model.number="discount.target_price"
        type="number"
        class="form-control"
        name="target_price"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="discount.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="start_date">有效日期</label>
      <input
        id="start_date"
        v-model="discount.start_date"
        type="datetime-local"
        class="form-control"
        name="start_date"
      />
    </div>

    <div class="form-group">
      <label for="end_date">有效日期</label>
      <input
        id="end_date"
        v-model="discount.end_date"
        type="datetime-local"
        class="form-control"
        name="end_date"
      />
    </div>

    <div class="form-group">
      <label for="type">優惠方案</label>
      <select
        id="type"
        v-model.number="discount.type"
        class="form-control"
        name="type"
        @change="handleChange"
        required
      >
        <option value selected disabled>--請確認--</option>
        <option value="0">免運費</option>
        <option value="1">扣款</option>
        <option value="2">打折</option>
      </select>
    </div>

    <div v-show="discount.type === 2" class="form-group">
      <label for="percent">折扣 % 數</label>
      <input
        id="percent"
        v-model.number="discount.percent"
        type="number"
        class="form-control"
        name="percent"
      />
    </div>

    <div v-show="discount.type === 1" class="form-group">
      <label for="product_reduce">折抵費用</label>
      <input
        id="product_reduce"
        v-model.number="discount.product_reduce"
        type="number"
        class="form-control"
        name="product_reduce"
      />
    </div>

    <div v-show="discount.type === 0" class="form-group">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="1"
          v-model="discount.shipping_free"
          id="shipping_free1"
          name="shipping_free"
        />
        <label class="form-check-label" for="shipping_free1">免運費</label>
      </div>

      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="0"
          v-model="discount.shipping_free"
          id="shipping_free2"
          name="shipping_free"
        />
        <label class="form-check-label" for="shipping_free2">需運費</label>
      </div>
    </div>

    <button
      v-if="editPage"
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中..." : "更新特價活動" }}</button>
    <button
      v-else
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中..." : "新增特價活動" }}</button>
  </form>
</template>

<script>
import { Toast } from '@/utils/helpers'

export default {
  props: {
    initialDiscount: {
      type: Object,
      default: () => ({})
    },
    isProcessing: {
      type: Boolean,
      default: false
    },
    editPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      discount: {
        name: '',
        type: '',
        description: '',
        target_price: 0,
        percent: -1,
        product_reduce: -1,
        shipping_free: 0,
        start_date: '',
        end_date: ''
      },
      isLoading: true
    }
  },
  watch: {
    initialDiscount (discount) {
      this.discount = {
        ...this.discount,
        ...discount
      }
    }
  },
  created () {
    this.discount = {
      ...this.discount,
      ...this.initialDiscount
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      if (value === '0') {
        this.discount.percent = -1
        this.discount.product_reduce = -1
      }
      if (value === '1') {
        this.discount.percent = -1
        this.discount.shipping_free = 0
      }
      if (value === '2') {
        this.discount.product_reduce = -1
        this.discount.shipping_free = 0
      }
    },
    handleSubmit (e) {
      if (!this.discount.name) {
        Toast.fire({
          type: 'warning',
          title: '請填寫 discount 名稱'
        })
        return
      } else if (!this.discount.target_price) {
        Toast.fire({
          type: 'warning',
          title: '請填寫消費額度'
        })
        return
      }

      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>
