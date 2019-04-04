<template lang="html">
  <div class="searchGroup" :class="{'showDropdown': !hideDropdown}">
    <csCheckList
      class="checks"
      v-if="!hideCheckList"
      v-model="checked"
      :checkList="applicationList"
      prop="id"
      label="name"
      @input="queryChange()"
    >
      <!-- <template slot-scope="slotProps">
        {{slotProps.item.id}}{{log(slotProps.item.id, slotProps)}}
      </template> -->
    </csCheckList>

    <div class="search-wrapper clearfix">
      <csDropdown
        class="select"
        :ghost="true"
        v-if="!hideDropdown"
        v-model="select"
        :optionList="selectList"
        @input="queryChange()"
      >
      </csDropdown>

      <csSearch
        class="search"
        :ghost="true"
        v-model="query"
        @input="queryChange()"
        :sync="false"
      ></csSearch>
    </div>
  </div>
</template>

<script>
import csCheckList from '@common/csCheckList'
import csSearch from '@common/csSearch'
import csDropdown from '@common/csDropdown'
import {mapGetters} from 'vuex'

export default {
  name: 'searchGroup',

  props: {
    hideDropdown: {
      type: Boolean,
      default () {
        return false
      }
    },
    hideCheckList: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  components: {
    csCheckList,
    csSearch,
    csDropdown,
  },

  data () {
    return {
      log: window.console.log,
      query: 'init',
      checked: [
        {
          id: 'application1',
          name: 'application1'
        },
        {
          id: 'application2',
          name: 'application2'
        }
      ],
      select: {
        id: 'erp',
        label: 'ERP'
      },
      selectList: [
        {
          id: 'role',
          label: '包含角色'
        },
        {
          id: 'rule',
          label: '包含规则'
        },
        {
          id: 'menu',
          label: '包含菜单'
        },
        {
          id: 'erp',
          label: 'ERP'
        },
      ]
    }
  },

  computed: {
    ...mapGetters({
      'applicationList': 'getApplicationList'
    })
  },

  methods: {
    // updateRouter () {
    //   let platform = this.checked.map(item => item.id)
    //
    //   let router = {
    //     name: this.$route.name,
    //     params: {
    //       ...this.$route.params
    //     },
    //     query: {
    //       ...this.$route.query,
    //       query: this.query,
    //       platform,
    //     }
    //   }
    //   if (this.showDropdown) router.query.searchBy = this.select.id
    //
    //   this.$router.push(router)
    // },
    queryChange () {
      let payload = {
        query: this.query
      }

      if (!this.hideCheckList) payload.platform = this.checked.map(item => item.id)
      if (!this.hideDropdown) payload.searchBy = this.select.id
      console.log('queryChange', payload)
      this.$emit('queryChange', payload)
    }
  }
}
</script>

<style lang="less" scoped>
.searchGroup{
  float: right;

  .checks{
    float: left;
    padding-top: 9px;
  }
  .select{
    float: left;
    width: 120px;
    background-color: #f6f8fc;
  }
  .search{
    float: left;
    width: 360px;
  }
  .search-wrapper{
    border: 1px solid #e0e6ed;
    border-radius: 2px;
    display: inline-block;

    &:hover{
      border-color: #0074ff;
    }
  }

}
.showDropdown .search{
  width: 240px;
}

</style>
