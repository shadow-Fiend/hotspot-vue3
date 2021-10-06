import { PropType } from "vue";
import { ZoneType, ZonePositionType, ZonesInfoType, SwitchOptionsType, StyleOptionsType } from "../utils/consts";
declare const _default: import("vue").DefineComponent<{
    image: StringConstructor;
    zonesInit: {
        type: ArrayConstructor;
        default: () => ZoneType[];
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    types: StringConstructor;
    switchOptions: {
        type: PropType<SwitchOptionsType>;
        default: () => SwitchOptionsType;
    };
    styleOptions: {
        type: PropType<StyleOptionsType>;
        default: () => StyleOptionsType;
    };
    minSize: NumberConstructor;
}, {
    changeInfo: import("vue").Ref<(res: ZonesInfoType) => void>;
    addItem: import("vue").Ref<(setting: ZonePositionType) => void>;
    eraseItem: import("vue").Ref<(index?: number) => void>;
    isOverRange: import("vue").Ref<() => boolean>;
    overRange: import("vue").Ref<() => void>;
    removeItem: import("vue").Ref<(index?: number) => void>;
    changeItem: import("vue").Ref<(info: ZonePositionType, index?: number) => void>;
    hasChange: import("vue").Ref<() => void>;
    selectItem: import("vue").Ref<(index?: number) => void>;
    imageLoad: import("vue").Ref<(e: any) => void>;
    zones: import("vue").Ref<{
        topPer: number;
        leftPer: number;
        widthPer: number;
        heightPer: number;
        url?: any;
        active?: boolean;
        key?: string;
    }[]>;
    backup: import("vue").Ref<{
        topPer: number;
        leftPer: number;
        widthPer: number;
        heightPer: number;
        url?: any;
        active?: boolean;
        key?: string;
    }[]>;
    hotWrapStyle: import("vue").Ref<{
        width: string;
        height: string;
    }>;
    isImageLoaded: import("vue").Ref<boolean>;
    hotspotWrap: import("vue").Ref<any>;
    usingSwitchOptions: import("vue").ComputedRef<SwitchOptionsType>;
    usingStyleOptions: import("vue").ComputedRef<StyleOptionsType>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    switchOptions: SwitchOptionsType;
    styleOptions: StyleOptionsType;
    zonesInit: unknown[];
    max: number;
} & {
    minSize?: number;
    image?: string;
    types?: string;
}>, {
    switchOptions: SwitchOptionsType;
    styleOptions: StyleOptionsType;
    zonesInit: unknown[];
    max: number;
}>;
export default _default;
