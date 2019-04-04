<template lang="html">
  <form class="csSearch" :class="{'csSearch-ghost': ghost}" @submit.prevent="$refs.input.blur()">
    <input type="text" ref="input" v-model="query" class="csInput search-input" @focus="$event.target.select()" @blur="handleSearch($event)">
    <i class="icon" @click="$refs.input.blur()"></i>
  </form>
</template>

<script>
import _ from 'lodash'
import '@common/csInput.less'
export default {
  name: 'csSearch',

  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    },
    sync: {
      type: Boolean,
      default () {
        return false
      }
    },
    ghost: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  computed: {
    query: {
      get () {
        return this.value
      },
      set (val = '') {
        if (this.sync) {
          this.$emit('input', val)
        } else {
          this.debouncedEmit(val)
        }
      }
    }
  },

  methods: {
    handleSearch () {
      let val = this.$refs.input.value.trim()
      this.$emit('input', val)
    },
    debouncedEmit: _.debounce(function (val) {
      this.$emit('input', val)
    }, 500)
  }

}
</script>

<style lang="less">
.csSearch{
  position: relative;

  .search-input{
    // width: 360px;
    width: 100%;
    padding-right: 30px;
  }
  .icon{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 100%;
    background-image: url(./search.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 12px;
    cursor: pointer;
  }
}
.csSearch-ghost{

  .search-input{
    border: none;
  }
}
</style>
