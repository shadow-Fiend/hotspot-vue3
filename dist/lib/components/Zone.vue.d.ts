import { PropType } from "vue";
import { ZoneType, SwitchOptionsType, StyleOptionsType } from "../utils/consts";
declare const _default: import("vue").DefineComponent<{
    index: NumberConstructor;
    minSize: NumberConstructor;
    setting: {
        type: PropType<ZoneType>;
        default: () => ZoneType;
    };
    switchOptions: PropType<SwitchOptionsType>;
    styleOptions: PropType<StyleOptionsType>;
}, {
    setZoneInfo: import("vue").Ref<(val: ZoneType) => void>;
    handlehideZone: import("vue").Ref<(isHide?: boolean) => void>;
    changeInfo: import("vue").Ref<(info?: {}) => void>;
    delItem: import("vue").Ref<(index: number) => void>;
    getZoneStyle: import("vue").Ref<(val: undefined | number) => string>;
    handleSelect: import("vue").Ref<() => void>;
    zoneTop: import("vue").Ref<string>;
    zoneLeft: import("vue").Ref<string>;
    zoneWidth: import("vue").Ref<string>;
    zoneHeight: import("vue").Ref<string>;
    hideZone: import("vue").Ref<boolean>;
    tooSmall: import("vue").Ref<boolean>;
    boxStyle: import("vue").Ref<{}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    setting: ZoneType;
} & {
    index?: number;
    minSize?: number;
    switchOptions?: SwitchOptionsType;
    styleOptions?: StyleOptionsType;
}>, {
    setting: ZoneType;
}>;
export default _default;
