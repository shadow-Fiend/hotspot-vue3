<template>
  <li
    v-drag-item
    :style="{
      top: zoneTop,
      left: zoneLeft,
      width: zoneWidth,
      height: zoneHeight
    }"
    @click="handleSelect"
  >
    <ul
      v-change-size
      :class="{
        'hotspot-wrap__box': true,
        'hotspot-hidden': tooSmall,
        'hotspot-active': setting.active
      }"
      :style="boxStyle"
    >
      <slot name="sign">
        <li
          v-if="switchOptions.isShowSign"
          class="hotspot-wrap__box__index"
          :title="`热区${index + 1}`"
        >
          {{ index + 1 }}
        </li>
      </slot>
      <li
        title="删除该热区"
        v-show="!hideZone && switchOptions.isShowDelete"
        class="hotspot-wrap__box__close hotspot-wrap__box__icon"
        @click.stop="delItem(index)"
      >
        <slot name="delete"> x </slot>
      </li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-tl"
        data-pointer="dealTL"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-tc"
        data-pointer="dealTC"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-tr"
        data-pointer="dealTR"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-cl"
        data-pointer="dealCL"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-cr"
        data-pointer="dealCR"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-bl"
        data-pointer="dealBL"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-bc"
        data-pointer="dealBC"
      ></li>
      <li
        class="hotspot-wrap__box__square hotspot-wrap__box__square-br"
        data-pointer="dealBR"
      ></li>
    </ul>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  PropType,
  computed
} from "vue";
import { ZoneType, SwitchOptionsType, StyleOptionsType } from "../utils/consts";
import changeSize from "../directives/changeSize";
import dragItem from "../directives/dragItem";

export default defineComponent({
  name: "zone",
  props: {
    index: Number,
    minSize: Number,
    setting: {
      type: Object as PropType<ZoneType>,
      default: () => ({} as ZoneType)
    },
    switchOptions: Object as PropType<SwitchOptionsType>,
    styleOptions: Object as PropType<StyleOptionsType>
  },
  directives: {
    changeSize,
    dragItem
  },
  setup(props, context) {
    const state = reactive({
      zoneTop: "",
      zoneLeft: "",
      zoneWidth: "",
      zoneHeight: "",
      hideZone: false,
      tooSmall: false,
      boxStyle: {}
    });
    const events = reactive({
      setZoneInfo(val: ZoneType) {
        state.zoneTop = events.getZoneStyle(val.topPer);
        state.zoneLeft = events.getZoneStyle(val.leftPer);
        state.zoneWidth = events.getZoneStyle(val.widthPer);
        state.zoneHeight = events.getZoneStyle(val.heightPer);
        state.tooSmall = val.widthPer < 0.01 && val.heightPer < 0.01;
      },
      handlehideZone(isHide = true) {
        if (state.hideZone === isHide) {
          return;
        }

        state.hideZone = isHide;
      },
      changeInfo(info = {}) {
        context.emit("changeInfo", {
          info,
          index: props.index
        });
      },
      delItem(index: number) {
        context.emit("delItem", index);
      },
      getZoneStyle(val: undefined | number) {
        return `${(val || 0) * 100}%`;
      },
      // 选中高亮操作
      handleSelect() {
        if (!props.switchOptions.isShowActive) return;
        context.emit("handleSelect", props.index);
      }
    });
    const calcBoxStyle = (
      active?: boolean,
      zoneBorderColor?: string,
      zoneActiveBgColor?: string,
      zoneBgColor?: string
    ) => {
      state.boxStyle = {
        "border-color": zoneBorderColor || props.styleOptions.zoneBorderColor,
        "background-color":
          active || props.setting.active
            ? zoneActiveBgColor || props.styleOptions.zoneActiveBgColor
            : zoneBgColor || props.styleOptions.zoneBgColor
      };
    };
    calcBoxStyle();
    watch(
      props.setting,
      (val: ZoneType, oldVal: ZoneType) => {
        events.setZoneInfo(val);
        calcBoxStyle(val.active);
      },
      {
        deep: true,
        immediate: true
      }
    );
    watch(
      () => props.styleOptions,
      (val: StyleOptionsType) => {
        if (val) {
          calcBoxStyle(
            undefined,
            val.zoneBorderColor,
            val.zoneActiveBgColor,
            val.zoneBgColor
          );
        }
      },
      {
        deep: true
      }
    );
    return {
      ...toRefs(state),
      ...toRefs(events)
    };
  }
});
</script>
