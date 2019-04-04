<template lang="html">
  <div class="search-erp por" :class="{'disabled': disabled}">
      <input
        type="text"
        ref="input"
        :disabled="disabled"
        spellcheck="false"
        :placeholder="placeholder || ''"
        v-model="input"
        @focus="$event.target.select()"
      />

      <ul class="options" v-show="search_list_show">
        <li v-for="(option, i) in search_list" @click="handleUpdateErpInfo(option)" class="search" :key="option.userName">
          <span>{{option.erp}}</span>
          <span>{{option.organizationFullName}}</span>
        </li>
        <li v-show="!search_list.length">
          查无此用户
        </li>
      </ul>
      <div class="error-info">
          <p v-show="erpDuplicate"><i class="icon"></i>该用户已存在</p>
          <p v-show="erpNull"><i class="icon"></i>用户不能为空</p>
      </div>
  </div>
</template>

<script>
import {
  GetUserInfoByErp,
  GetUserList
} from '@api/authority'

import { createNamespacedHelpers } from 'vuex'
const {mapMutations, mapGetters} = createNamespacedHelpers('userEdit')

const getUserInfoByErp = new GetUserInfoByErp()
const getUserList = new GetUserList()

export default {
  name: 'search-erp',

  props: {
    value: Object,
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    placeholder: String
  },

  data() {
    return {
      input: '',
      complate: false,
      timmer: undefined,
      search_list: [],
      search_list_show: false,
      docClickHandle: null,

      erpNull: false,
      erpDuplicate: false
    }
  },

  computed: {
    ...mapGetters({
      currentPage: 'getPageInfo'
    })
  },

  watch: {
    input() {
      this.search_list_show = false

      if (this.complate) {
        this.complate = false
        return
      }

      this.timmer && clearTimeout(this.timmer)
      if (val.length < 2) return val

      this.timmer = setTimeout(() => {
        const params = {
          erp: val
        }
        // 输入停顿500ms请求数据接口
        getUserInfoByErp.fetch(params).then(res => {
          this.search_list = res

          this.$nextTick(() => {
            this.search_list_show = true
          })
        })
      }, 500)
    }
  },

  created() {
    /**
     * 点击组件外部区域时，关闭下拉菜单
     */
    this.docClickHandle = function(event) {
      if (event.target === this.$refs.input) return

      this.search_list_show = false
    }.bind(this)
    document.addEventListener('click', this.docClickHandle)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.docClickHandle)
  },

  methods: {
    ...mapMutations({
      'updateModule': 'updateModule'
    }),
    hasError() {
      let {erp} = this.currentPage
      if (!erp) {
        this.erpNull = true
      } else {
        this.erpNull = false
      }

      return this.erpNull || this.erpDuplicate
    },
    async handleUpdateErpInfo(option) {
      this.complate = true
      // console.log('option', option);
      this.erpNull = false
      this.erpDuplicate = false
      // 效验用户是否已存在
      let params = {
        category: 'user',
        page: 1,
        pageSize: 1,
        plateform: '',
        searchBy: 'erp',
        query: option.erp,
      }
      // console.log('params', params);
      let res = await getUserList.fetch(params)
      console.log('res', res);
      // console.log('res', res);
      if (res.length !== 0) {
        this.erpDuplicate = true
        return
      }

      // 更新用户信息
      this.input = option.erp

      // 将用户信息更新到store
      let payload = {
        erp: option.erp,
        organizationFullName: option.organizationFullName
      }
      this.updateModule(payload)
    }
  }
}
</script>

<style lang="less">
.search-erp {
  position: relative;
  font-size: 12px;

  .checked {
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: red;
    top: 0px;
    right: -30px;
    border-radius: 0px 2px 2px 0px;
  }

  .error-info {
    position: absolute;
    margin-left: 0px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0px 6px;
    padding-right: 38px;
    border: 1px solid #e0e6ed;
    border-radius: 2px;

    &:hover {
      border: 1px solid #0074ff;
      box-shadow: 0 1px 6px 0 rgba(0, 116, 255, 0.3);
    }
    &:focus {
      outline: none;
      border: 1px solid #0074ff;
      box-shadow: 0 1px 6px 0 rgba(0, 116, 255, 0.3);
      border-radius: 2px;
    }
    &:disabled {
      border-color: #e0e6ed;
      cursor: not-allowed;
      background-color: #f6f8fc;
    }
  }

  .options {
    position: absolute;
    top: 32px;
    left: 0px;
    z-index: 999;
    min-width: 180px;
    width: 100%;
    min-height: 30px;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid #dbe6ea;
    border-radius: 4px;
    background-color: #fff;
    li {
      line-height: 26px;
      padding: 0px 7px;
      text-align: left;

      &:hover {
        background-color: #f4f8f9;
        color: #23a2f5;
      }
    }
  }
}
.search-erp.disabled {
  input {
    border-color: #e5e5e5;
    color: #a8a8a8;
  }
  .process {
    background-color: #f9fbfc;
    color: #a8a8a8;

    span {
      cursor: default;
    }

    .icon {
      // background-image: url(../img/clear-disabled.png);
      cursor: default;
    }
  }
}
</style>
