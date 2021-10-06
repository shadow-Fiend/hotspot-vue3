<template>
  <div ref="hotspotWrap" class="hotspot-wrap" :style="hotWrapStyle">
    <img
      v-show="isImageLoaded"
      class="hotspot-wrap__img"
      :src="image"
      @load="imageLoad"
    />
    <ul class="hotspot-wrap__area" v-add-item>
      <Zone
        class="hotspot-wrap__item"
        v-for="(zone, index) in zones"
        :key="zone.key"
        :index="index"
        :setting="zone"
        :minSize="minSize"
        :switchOptions="usingSwitchOptions"
        :styleOptions="usingStyleOptions"
        @delItem="removeItem($event)"
        @handleSelect="selectItem($event)"
        @changeInfo="changeInfo($event)"
      >
        <template v-slot:sign>
          <slot name="sign" :zone="zone" :index="index"></slot>
        </template>
        <template v-slot:delete>
          <slot name="delete" :zone="zone" :index="index"></slot>
        </template>
      </Zone>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  watch,
  PropType,
  ref
} from "vue";
import Zone from "./Zone.vue";
import addItem from "../directives/addItem";
import {
  ZoneType,
  ZonePositionType,
  ZonesInfoType,
  SwitchOptionsType,
  initialSwitchOptions,
  StyleOptionsType,
  initialStyleOptions
} from "../utils/consts";

export default defineComponent({
  name: "hotspot",
  directives: {
    addItem
  },
  components: {
    Zone
  },
  props: {
    image: String,
    zonesInit: {
      type: Array,
      default: () => [] as ZoneType[]
    },
    max: {
      type: Number,
      default: 0
    },
    types: String,
    switchOptions: {
      type: Object as PropType<SwitchOptionsType>,
      default: () => ({} as SwitchOptionsType)
    },
    styleOptions: {
      type: Object as PropType<StyleOptionsType>,
      default: () => ({} as StyleOptionsType)
    },
    minSize: Number
  },
  setup(props, context) {
    const hotspotWrap = ref();
    const state = reactive({
      zones: [] as ZoneType[],
      backup: [] as ZoneType[],
      hotWrapStyle: {
        width: "100%",
        height: "100%"
      },
      isImageLoaded: false
    });
    const usingSwitchOptions = computed(() => {
      return Object.assign(
        {},
        initialSwitchOptions,
        props.switchOptions
      ) as SwitchOptionsType;
    });
    const usingStyleOptions = computed(() => {
      return Object.assign(
        {},
        initialStyleOptions,
        props.styleOptions
      ) as StyleOptionsType;
    });
    const events = reactive({
      changeInfo(res: ZonesInfoType) {
        const { info, index } = res;
        events.changeItem(info, index);
      },
      addItem(setting: ZonePositionType) {
        events.hasChange();
        console.log("添加");
        context.emit("add", setting);
      },
      eraseItem(index = state.zones.length - 1) {
        console.log("index: ", index);
        events.removeItem(index);
        context.emit("erase", index);
      },
      isOverRange() {
        return props.max && state.zones.length > props.max;
      },
      overRange() {
        const index = state.zones.length - 1;

        events.removeItem(index);
        context.emit("overRange", index);
      },
      removeItem(index = state.zones.length - 1) {
        state.zones.splice(index, 1);
        context.emit("remove", index);
      },
      changeItem(info: ZonePositionType, index = state.zones.length - 1) {
        Object.assign(state.zones[index], info);
      },
      hasChange() {
        if (props.types === "btn") {
          if (events.isOverRange()) {
            events.overRange();
            return;
          }
        }
        context.emit("change", state.zones);
      },
      selectItem(index = state.zones.length - 1) {
        state.zones.map((item: ZoneType, itemIndex: number) => {
          item.active = false;
          if (itemIndex === index) {
            item.active = true;
          }
        });
      },
      imageLoad(e: any) {
        const designWrapWidth = hotspotWrap.value.parentNode.offsetWidth;
        const designWrapHeight = hotspotWrap.value.parentNode.offsetHeight;
        const aspectRatio = designWrapWidth / designWrapHeight;
        const imgRatio = e.path[0].naturalWidth / e.path[0].naturalHeight;
        if (imgRatio > aspectRatio) {
          state.hotWrapStyle = {
            width: "100%",
            height: `${(e.path[0].naturalHeight * designWrapWidth) /
              e.path[0].naturalWidth}px`
          };
        } else {
          state.hotWrapStyle = {
            height: "100%",
            width: `${(e.path[0].naturalWidth * designWrapHeight) /
              e.path[0].naturalHeight}px`
          };
        }
        state.isImageLoaded = true;
      }
    });
    watch(
      () => props.zonesInit,
      (val: ZoneType[]) => {
        state.zones = val;
        events.hasChange();
      },
      {
        deep: true,
        immediate: true
      }
    );
    return {
      hotspotWrap,
      usingSwitchOptions,
      usingStyleOptions,
      ...toRefs(state),
      ...toRefs(events)
    };
  }
});
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
