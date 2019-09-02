<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="coupon.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="coupon_code">優惠碼</label>
      <input
        id="coupon_code"
        v-model="coupon.coupon_code"
        type="text"
        class="form-control"
        name="coupon_code"
      />
    </div>

    <div class="form-group">
      <label for="percent">折扣 % 數</label>
      <input
        id="percent"
        v-model.number="coupon.percent"
        type="number"
        class="form-control"
        name="percent"
      />
    </div>

    <div class="form-group">
      <label for="product_reduce">折抵費用</label>
      <input
        id="product_reduce"
        v-model.number="coupon.product_reduce"
        type="number"
        class="form-control"
        name="product_reduce"
      />
    </div>

    <div class="form-group">
      <label for="limited_num">有效次數</label>
      <input
        id="limited_num"
        v-model.number="coupon.limited_num"
        type="number"
        class="form-control"
        name="limited_num"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="coupon.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="end_date">有效日期</label>
      <input
        id="end_date"
        v-model="coupon.end_date"
        type="datetime-local"
        class="form-control"
        name="end_date"
      />
    </div>

    <div class="form-group">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="1"
          v-model="coupon.shipping_free"
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
          v-model="coupon.shipping_free"
          id="shipping_free2"
          name="shipping_free"
        />
        <label class="form-check-label" for="shipping_free2">需運費</label>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中..." : "上傳優惠券" }}</button>
  </form>
</template>

<script>
import { Toast } from '@/utils/helpers'

export default {
  props: {
    initialCoupon: {
      type: Object,
      default: () => ({})
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coupon: {
        name: '',
        coupon_code: '',
        description: '',
        percent: 0,
        product_reduce: 0,
        limited_num: 0,
        shipping_free: 0,
        end_date: ''
      },
      isLoading: true
    }
  },
  watch: {
    initialCoupon(coupon) {
      this.coupon = {
        ...this.coupon,
        ...coupon
      }
    }
  },
  created() {
    this.coupon = {
      ...this.coupon,
      ...this.initialCoupon
    }
  },
  methods: {
    handleSubmit(e) {
      if (!this.coupon.name) {
        Toast.fire({
          type: 'warning',
          title: '請填寫 coupon 名稱'
        })
        return
      } else if (!this.coupon.coupon_code) {
        Toast.fire({
          type: 'warning',
          title: '請填寫優惠碼'
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