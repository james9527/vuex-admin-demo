<template lang="html">
  <div :class="customClass">
    <ul class="clearfix csSwitchBar">
      <li
        class="switchBar-item"
        v-for="item in switchList"
        :class="{'active': item[prop] === activeTab[prop]}"
        @click="handleSwitch(item)"
      >
      <slot :item="item" :prop="prop" :label="label">{{item[label]}}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
/**
  <csSwitchBar v-model="activeTab" class="tabs" :switchList="switchList"></csSwitchBar>
  data () {
    return {
      activeTab: {
        id: 'role',
        label: '选择角色'
      },
      switchList: [
        {
          id: 'role',
          label: '选择角色'
        },
        {
          id: 'rule',
          label: '选择规则'
        },
        {
          id: 'user',
          label: '权限拷贝'
        },
      ],
    }
  }
 */
export default {
  name: 'csSwitchBar',

  props: {
    prop: {
      type: String,
      default () {
        return 'id'
      }
    },
    label: {
      type: String,
      default () {
        return 'label'
      }
    },
    customClass: String,
    value: {
      type: Object,
      default () {
        console.warn('csSwitchBar: 你正在使用mock数据,`v-model`')
        return {
          id: 1,
          label: 'mock数据1'
        }
      }
    },
    switchList: {
      type: Array,
      default () {
        console.warn('csSwitchBar: 你正在使用mock数据,`switchList`')
        return [
          {
            id: 1,
            label: 'mock数据1'
          },
          {
            id: 2,
            label: 'mock数据2'
          },
          {
            id: 3,
            label: 'mock数据3'
          },

        ]
      }
    },

  },

  data () {
    return {

    }
  },

  computed: {
    activeTab () {
      return this.value
    }
  },

  methods: {
    handleSwitch (item) {
      this.$emit('input', item)
    }
  }


}
</script>

<style lang="less">
.csSwitchBar{
  border-bottom: 1px solid #E0E6ED;
  height: 39px;

  .switchBar-item{
    float: left;
    width: 130px;
    text-align: center;
    font-size: 14px;
    color: #717580;
    line-height: 19px;
    padding: 10px 0px;
    position: relative;

    &:hover{
      color: #0074FF;
    }
    &:after{
      content: '';
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 0;
      height: 2px;
      background-color: #0074FF;
    }
  }
  .active{
    color: #0074FF;
    &:after{
      // content: '';
      // position: absolute;
      // bottom: 0px;
      // left: 0px;
      width: 100%;
      transition: width 0.25s ease-in-out;

      // height: 2px;
      // background-color: #0074FF;
    }
  }
}
</style>
