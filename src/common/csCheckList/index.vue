<script>
/**
 * 单选,复选框和单选,复选框组
 * 当v-model绑定的值为'string','object'时,为单选框,
 * 当v-model绑定的值为'array'时,为复选框
 * 支持slot
 */
/**
    // 字符串类型的选项
    <csCheckList v-model="checked" :checkList="checkList">
      <!-- <template slot-scope="slotProps">
        {{slotProps.item.id}}{{slotProps.checked}}
      </template> -->
    </csCheckList>

    data () {
      return {
        // 单选-radio
        checked: '选项1',
        checkedList: ['选项1', '选项2'] || '选项1'

        // 复选-checkbox
        checked: ['选项1'],
        checkedList: ['选项1', '选项2'] || '选项1'
      }
    }

    // 对象类型的选项, 支持prop和label
    <csCheckList v-model="checked" :checkList="checkList">
      <!-- <template slot-scope="slotProps">
        {{slotProps.item.id}}{{slotProps.checked}}
      </template> -->
    </csCheckList>

    data () {
      return {
        // 单选-radio
        checked: {
          id: '选项1',
          name: '选项1'
        },
        checkedList: [
          {
            id: '选项1',
            name: '选项1'
          },
          {
            id: '选项2',
            name: '选项2'
          },
        ]

        // 复选-checkbox
        checked: [
          {
            id: '选项1',
            name: '选项1'
          },
          {
            id: '选项2',
            name: '选项2'
          },
        ],
        checkedList: [
          {
            id: '选项1',
            name: '选项1'
          },
          {
            id: '选项2',
            name: '选项2'
          },
        ]
      }
    }

 */
export default {
  name: 'csCheckList',

  props: {
    value: {
      type: [Array, Object, String],
      default () {
        console.warn('csCheckbox: 正在使用模拟数据,请添加`v-model`属性.')
        return []
      }
    },
    checkList: {
      type: [Array, Object, String],
      default () {
        console.warn('csCheckbox: 正在使用模拟数据,请添加`checkList`属性.')
        return [
          {
            id: 'checkItem1',
            label: '选项1'
          },
          {
            id: 'checkItem2',
            label: '选项2'
          },
          {
            id: 'checkItem3',
            label: '选项3'
          },
        ]
      }
    },
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
  },

  data () {
    return {
      checkListItemType: 'object',
      checkedItemType: 'object',
    }
  },

  computed: {
    renderList () {
      let {wrappered, itemType} = this.wrapperToArr(this.checkList)
      this.checkListItemType = itemType
      return wrappered
    },
    renderChecked () {
      let {wrappered, itemType} = this.wrapperToArr(this.value)
      this.checkedItemType = itemType
      return wrappered
    },
    isRadio () {
      let checkedType = this.toString(this.value)
      let result = checkedType === 'Object' || checkedType === 'String'
      return result
    }
  },

  mounted () {
    if (this.checkListItemType !== this.checkedItemType) throw new Error('v-model和checkList的数据类型不匹配')
  },

  methods: {
    toString (any) {
      return Object.prototype.toString.call(any).slice(8, -1)
    },
    wrapperToArr (any) {
      let itemType
      let type = this.toString(any)
      if (type === 'Object') {
        return {
          wrappered: [any],
          itemType: 'object'
        }
      } else if (type === 'String') {
        let wrappered = [
          {
            id: any,
            label: any
          }
        ]
        return {
          itemType: 'string',
          wrappered,
        }
      }

      let result = any.map(item => {
        if (this.toString(item) === 'String') {
          itemType = 'string'
          return {
            id: item,
            label: item
          }
        } else {
          itemType = 'object'
          return item
        }
      })

      return {
        wrappered: result,
        itemType
      }
    },
    isChecked (id) {
      let isChecked = this.renderChecked.some(item => {
        return item[this.prop] === id
      })
      return isChecked
    },
    handleChange (item, $event) {
      let before = this.value
      let isChecked = $event.target.checked
      let itemType = this.checkedItemType  // 'object' || 'string'
      let payload

      // 单选框
      if (this.isRadio) {
        if (itemType === 'object') {
          payload = isChecked ? item : {}
        } else {
          payload = isChecked ? item[this.prop] : ''
        }
        this.$emit('input', payload)
        return
      }

      // 复选框
      if (isChecked) {
        let val = itemType === 'object' ? item : item[this.prop]
        payload = [
          ...before,
          val
        ]
      } else {
        if (itemType === 'object') {
          payload = before.filter(checkedItem => checkedItem[this.prop] !== item[this.prop])
        } else {
          payload = before.filter(checkedItem => checkedItem !== item[this.prop])
        }
      }
      this.$emit('input', payload)
    }
  },

}
</script>

<template lang="html">
  <div class="csCheckList">
    <label class="csCheckbox" v-for="(item, index) in renderList">
      <input type="checkbox" :checked="isChecked(item[prop])" :disabled="item.disabled" class="hidden" @change="handleChange(item, $event)">
      <slot :item="item" :isChecked="isChecked(item[prop])">
        <span class="checkbox-content">
          <i class="icon" :class="{'isChecked': isChecked(item[prop]), 'isRadio': isRadio}"></i>
          <span>{{item[label]}}</span>
        </span>
      </slot>
    </label>
  </div>
</template>

<style lang="less">
.csCheckList {

  .csCheckbox{
    color: #283039;
    line-height: 16px;
    position: relative;
  }
  .checkbox-content{
    padding-left: 25px;
    margin-right: 20px;
    &:hover .icon{
      background-image: url(./checkbox2.png);
    }
    &:hover .isRadio{
      background-image: url(./radio2.png);
    }

    &:hover .icon.isChecked{
      background-image: url(./checkbox3.png);
    }
    &:hover .isRadio.isChecked{
      background-image: url(./radio3.png);
    }
  }

  .icon {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 14px;
    height: 14px;

    // border: 1px solid #bec1ca;
    // border-radius: 2px;
    // background-color: #ffffff;
    // transition: background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px;

    background-image: url(./checkbox1.png);


  }
  .isRadio{
    background-image: url(./radio1.png);
  }
  .hidden {
    display: none !important;
  }
  .icon.isChecked {
    background-image: url(./checkbox3.png);
  }
  .isRadio.isChecked {
    background-image: url(./radio3.png);
  }
  input[disabled] + .checkbox-content {
    color: #bec1c9;
    .icon{
      background-image: url(./checkbox4.png)!important;
    }
    .isRadio {
      background-image: url(./radio4.png)!important;

    }
  }


  .isRadio{

  }
}
</style>
