<style lang="less">
  .incre_dropdown {
    .csDropdown {
      width: 380px;
    }
  }
  .operate {
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      position: relative;
      top: -2px;
      margin-left: 14px;
      .icon {
        float: left;
        width: 16px;
        height: 16px;
        margin: 8px 0;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px;
      }
      .del {
        background-image: url(../../../../images/del1.png);
        &:hover {
          background-image: url(../../../../images/del2.png);
        }
      }
      .add-button {
        width: 32px;
        height: 32px;
        border: 1px dashed #e0e6ed;
        border-radius: 2px;
        font-size: 16px;
        color: #bec1c9;
        margin-left: 17px;
        cursor: pointer;
        font-weight: bold;
        background-color: #fff;
      }
    }
</style>
<template>
  <div class="incre_dropdown">
    <csDropdown 
     v-model="selectedEventTime" 
     prop="id" 
     label="label" 
     :optionList="timeFieldList"
     :disabledOptions="disabledOptions"
    ></csDropdown>
    <div class="operate">
      <i class="icon del" @click="handleDelItem()" v-show="curIndex!==0 || totalNum!==1"></i>
      <button type="button" name="button" class="add-button" @click="handleAddItem()" v-show="curIndex+1===totalNum">+</button>
    </div>
  </div>
</template>
<script>
  import csDropdown from '@/common/csDropdown'
  import { createNamespacedHelpers } from 'vuex'
  import _ from 'lodash'
  
  const { mapMutations, mapGetters } = createNamespacedHelpers('sourceEdit')
  const TIME = 500

  export default {
    components: {
      csDropdown
    },
    props: {
      curIndex: {
        type: Number,
        default: 0
      },
      totalNum: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        currentPage: 'getPageInfo',
        getItemByIndex: 'getItemByIndex'
      }),
      disabledOptions () {
        let eventId = this.itemData.eventTime.id
        // console.log('disabledId:::' + eventId)
        return [ eventId ]
      },
      itemData () {
        let item = this.getItemByIndex('selectedTimeFields', this.curIndex)
        return {
          ...item
        }
      },
      selectedEventTime: {
        get () {
          let item = this.itemData
          // console.log(JSON.stringify({...item}))
          // console.log(item.eventTime.id + ' , ' + item.eventTime.label)
          return {
            ...item,
            id: item.eventTime.id,
            label: item.eventTime.label
          }
        },
        set (val) {
          let payload = {
            index: this.curIndex,
            key: 'selectedTimeFields',
            val: {
              eventTime: val
            }
          }
          this.updateItemByIndex(payload)
        }
      },
      timeFieldList () {
        return this.itemData.fieldList
      }
    },
    methods: {
      ...mapMutations({
        updateModule: 'updateModule',
        addItem: 'addItem',
        delItemByIndex: 'delItemByIndex',
        updateItemByIndex: 'updateItemByIndex'
      }),
      handleAddItem: _.throttle(function () {
        let item = this.itemData
        let payload = {
          key: 'selectedTimeFields',
          val: {
            ...item
          }
        }
        this.addItem(payload)
      }, TIME),
      handleDelItem: _.throttle(function () {
        let payload = {
          key: 'selectedTimeFields',
          index: this.index
        }
        this.delItemByIndex(payload)
      }, TIME),
    }
  }
</script>

