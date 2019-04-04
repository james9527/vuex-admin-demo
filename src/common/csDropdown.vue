<script>
/**
<csDropdown
  class="event-list dropdown"
  v-model="selectedEvent"
  prop="id"
  label="label"
  :optionList="filteredEventList"
  groupBy="groupLabel"
>
  <div class="search-group">
  </div>
  <div slot="errorInfo"></div>
</csDropdown>
 */
export default {
  name: 'csDropdown',
  props: {
    value: {
      type: Object,
      default() {
        console.warn('csDropdown: 正在使用模拟数据,请添加v-model属性.')
        return {
          id: 'option1',
          label: 'option1'
        }
      }
    },
    prop: {
      type: String,
      default() {
        return 'id'
      }
    },
    label: {
      type: String,
      default() {
        return 'label'
      }
    },
    groupBy: String,
    optionList: {
      type: Array,
      default() {
        console.warn('csDropdown: 正在使用模拟数据,请添加optionList属性.')
        return [
          {
            id: 'option1',
            label: 'option1'
          },
          {
            id: 'option2',
            label: 'option2'
          },
          {
            id: 'option3',
            label: 'option3'
          }
        ]
      }
    },
    placeholder: String,
    customClass: String,
    error: Boolean,
    disabled: Boolean,
    disabledOptions: {
      type: Array,
      default() {
        return []
      }
    },
    ghost: {
      type: Boolean,
      default () {
        return false
      }
    },
  },

  data() {
    return {
      optionShow: false,
      clickEvent: '',
      fingerprint: '',
      handleClick: ''
    }
  },

  mounted() {
    this.fingerprint = Math.random()
      .toString(36)
      .substring(7)
      .split('')
      .join('.')

    this.handleClick = function(e) {
      let target = e.target
      let clickOutside = true
      while (target.parentNode) {
        if (target) {
          let fingerprint = target.getAttribute('fingerprint')
          if (!fingerprint) {
            target = target.parentNode
            continue
          }
          if (fingerprint === this.fingerprint) {
            clickOutside = false
            break
          }
        }
        target = target.parentNode
      }

      if (clickOutside) this.optionShow = false
    }.bind(this)
    document.addEventListener('click', this.handleClick)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClick)
  },

  computed: {
    selection() {
      return this.value
    },
    dropdownList() {
      let optionList = (this.optionList || []).map(item => {
        // debugger
        let id = this.prop
        let disabledOptions = this.disabledOptions
        if (this.disabledOptions.includes(item[id])) {
          item.isDisabled = true
        } else {
          item.isDisabled = false
        }
        return {...item}
      })

      if (!this.groupBy) {
        return [
          {
            groupName: '',
            children: optionList || []
          }
        ]
      }

      let key = this.groupBy
      let bus = {}
      optionList.forEach(item => {
        let groupName = item[key]
        bus[groupName] = bus[groupName] || {}
        bus[groupName].groupName = item[key]
        bus[groupName].children = bus[groupName].children || []
        bus[groupName].children.push(item)
      })

      let result = Object.values(bus)
      return result
    }
  },

  methods: {
    handleSelect(option) {
      if (option.isDisabled) return
      // console.log('this.optionList', this.optionList, this.groupBy);
      this.optionShow = false
      this.$emit('input', option)
    },
    handleDropdown() {
      if (this.disabled) return (this.optionShow = false)
      this.optionShow = !this.optionShow
    }
  }
}
</script>

<template lang="html">
  <div class="csDropdown" :class="{'csDropdown-ghost': ghost, customClass}" :fingerprint="fingerprint">
    <div @click="handleDropdown()" class="wrapper">
      <input
        type="text"
        readonly
        :placeholder="placeholder"
        class="selection"
        :class="{'active': selection[prop], 'disabled': disabled}"
        :value="selection[label]"
      >
      <i :class="{'icon': true, 'up': optionShow}"></i>
      <div class="error-info" v-show="error">
        <slot name="errorInfo"></slot>
        错误信息
      </div>
    </div>
    <transition name="dropdown-fade">
      <ul class="options" v-if="optionShow">
        <li><slot></slot></li>
        <li class="group-item" v-for="group in dropdownList">
          <h4 class="group-title" v-if="group.groupName">{{group.groupName}}</h4>
          <ul class="option-wrapper">
            <li
              class="option"
              v-for="item in group.children"
              :class="{'selected': item[prop] === selection[prop], 'item-disabled': item.isDisabled}"
              :key="item[prop]"
              @click.prevent.stop="handleSelect(item)"
            >
              <slot name="option" :option="item">{{item[label]}}</slot>
            </li>
          </ul>
        </li>
        <li v-if="!optionList.length" class="no-data">暂无数据</li>
      </ul>
    </transition>
  </div>
</template>

<style lang="less">
::placeholder {
  color: #bec1c9;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  max-height: 0px;
  opacity: 0;
}

.csDropdown {
  color: #bec1c9;
  font-size: 14px;
  line-height: 20px;
  min-width: 120px;
  height: 32px;
  position: relative;
  background-color: #fff;
  display: inline-block;

  .icon {
    position: absolute;
    width: 32px;
    height: 100%;
    top: 0px;
    right: 0px;
    background-image: url(../images/arrow_down@2x.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 8px;
    transition: transform 0.25s ease-in-out;
  }
  .icon.up {
    transform: rotate(180deg);
  }

  .no-data {
    text-align: center;
    user-select: none;
    line-height: 32px;
  }
  .disabled {
    cursor: not-allowed !important;
    background-color: #f6f8fc !important;
    border-color: #e0e6ed !important;
    color: #bec1c9 !important;
    box-shadow: none !important;
  }

  .wrapper {
    height: 100%;
  }

  .selection {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #e0e6ed;
    border-radius: 2px;
    padding: 6px 42px 6px 10px;
    cursor: pointer;
    font-size: 14px;
    transition: border-color 0.25s ease-in-out;
    background-color: transparent;

    &:hover {
      border-color: #0074ff;
      box-shadow: 0 1px 6px 0 rgba(0, 116, 255, 0.3);
    }
    &:disabled:hover {
      box-shadow: none;
    }
  }
  .error-info {
    position: absolute;
    color: red;
    font-size: 12px;
    margin-top: 3px;
  }
  .options {
    position: absolute;
    z-index: 99;
    margin-top: 4px;
    padding-top: 10px;
    padding-bottom: 2px;
    top: 100%;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    width: 100%;
    max-height: 250px;
    overflow: auto;
    background-color: #fff;
    cursor: pointer;
    border-radius: 2px;
  }
  .option-wrapper {
    overflow: hidden;
  }
  .group-item {
    padding-bottom: 10px;

    .group-title {
      font-size: 12px;
      line-height: 16px;
      color: #283039;
      padding-left: 8px;
      cursor: default;
      font-weight: 400;
    }
  }
  .option {
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
    padding-right: 20px;
    color: #717580;

    &:hover {
      background-color: #f6f8fc;
    }
  }
  .option.item-disabled {
    color: #bec1c9;
    cursor: not-allowed;
  }
  .selected {
    color: #0074ff;
  }
  .active {
    color: #283039;
  }
}
.csDropdown-ghost{
  .selection {
    border: none;
  }
}
</style>
