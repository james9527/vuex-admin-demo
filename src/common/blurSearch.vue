<template lang="html">
    <div class="query el-input el-input--suffix" :style="{width:inputWidth+'px'}">
      <input type="text" autocomplete="off" class="el-input__inner" :placeholder="txtPlaceholder" v-model="searchParam" @focus="$event.target.select()"
                              @blur="rtnParam" @keyup.13="rtnParam"/>
      <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
              <i class="el-input__icon el-icon-search"></i>
          </span>
      </span>  
  </div>
</template>

<script>
export default {
  name: 'blurSearch',
  props: {
    inputWidth: {
      type: Number,
      default: 320
    },
    txtPlaceholder: {
      type: String,
      default: '输入后按Enter可搜索'
    }
  },
  data() {
    return {
      searchParam: ''
    }
  },
  watch: {
    $route: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.searchParam = ''
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    rtnParam() {
      this.$emit('getParam', this.searchParam)
    }
  }
}
</script>

<style lang="css">
</style>
