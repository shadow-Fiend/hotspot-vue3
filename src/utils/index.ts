import { ZoneType, ZonePositionType } from "./consts";

interface OffsetInfo {
  width: number;
  height: number;
}

interface InitPositionInfo {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

interface PositionInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface UtilsInfo {
  MIN_LIMIT: number;
  DECIMAL_PLACES: number;
  getMultiple: (decimalPlaces?: number) => number;
  decimalPoint: (num?: number) => number;
  getOffset: (element: HTMLElement) => OffsetInfo;
  getPageX: (e: MouseEvent | TouchEvent) => number;
  getPageY: (e: MouseEvent | TouchEvent) => number;
  getDistanceX: (e: MouseEvent | TouchEvent, container: Element) => number;
  getDistanceY: (e: MouseEvent | TouchEvent, container: Element) => number;
  dealEdgeValue: (
    itemInfo: PositionInfo,
    styleInfo: InitPositionInfo,
    container: OffsetInfo
  ) => PositionInfo;
  dealTL: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealTC: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealTR: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealCL: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealCR: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealBL: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealBC: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  dealBR: (
    itemInfo: PositionInfo,
    moveX: number,
    moveY: number,
    minLimit?: number
  ) => PositionInfo;
  judgemerge: (
    targetMin: number,
    targetMax: number,
    cMin: number,
    cMax: number
  ) => boolean;
  determineOverlap: (
    othersZones: ZoneType[],
    currentZone: ZonePositionType
  ) => boolean;
}

const _ = {
  MIN_LIMIT: 24, // Min size of zone
  DECIMAL_PLACES: 4, // Hotzone positioning decimal point limit number of digits

  /**
   * Get a power result of 10 for the power of the constant
   * @return {Number}
   */
  getMultiple(decimalPlaces = _.DECIMAL_PLACES) {
    return Math.pow(10, decimalPlaces);
  },

  /**
   * Limit decimal places
   * @param  {Number} num
   * @return {Number}
   */
  decimalPoint(val = 0) {
    return Math.round(val * this.getMultiple()) / this.getMultiple() || 0;
  },

  /**
   * Get element width and height
   * @param  {Object} elem
   * @return {Object}
   */
  getOffset(elem) {
    return {
      width: elem.clientWidth || 0,
      height: elem.clientHeight || 0
    };
  },

  /**
   * Get pageX
   * @param  {Object} e
   * @return {Number}
   */
  getPageX(e) {
    return "pageX" in e ? e.pageX : e.touches[0].pageX;
  },

  /**
   * Get pageY
   * @param  {Object} e
   * @return {Number}
   */
  getPageY(e) {
    return "pageY" in e ? e.pageY : e.touches[0].pageY;
  },

  /**
   * Gets the abscissa value of the mouse click relative to the target node
   * @param  {Object} e
   * @param  {Object} container
   * @return {Number}
   */
  getDistanceX(e, container) {
    return (
      this.getPageX(e) -
      (container.getBoundingClientRect().left + window.pageXOffset)
    );
  },

  /**
   * Gets the ordinate value of the mouse click relative to the target node
   * @param  {Object} e
   * @param  {Object} container
   * @return {Number}
   */
  getDistanceY(e, container) {
    return (
      this.getPageY(e) -
      (container.getBoundingClientRect().top + window.pageYOffset)
    );
  },

  /**
   * Treatment of boundary conditions when changing the size of the hotzone
   * @param {Object} itemInfo
   * @param {Object} styleInfo
   * @param {Object} container
   */
  dealEdgeValue(itemInfo, styleInfo, container) {
    if (styleInfo.left && styleInfo.left < 0) {
      styleInfo.left = 0;
      styleInfo.width = itemInfo.width + itemInfo.left;
    }

    if (styleInfo.top && styleInfo.top < 0) {
      styleInfo.top = 0;
      styleInfo.height = itemInfo.height + itemInfo.top;
    }

    if (
      !Object.prototype.hasOwnProperty.call(styleInfo, "left") &&
      styleInfo.width
    ) {
      if (itemInfo.left + styleInfo.width > container.width) {
        styleInfo.width = container.width - itemInfo.left;
      }
    }

    if (
      !Object.prototype.hasOwnProperty.call(styleInfo, "top") &&
      styleInfo.height
    ) {
      if (itemInfo.top + styleInfo.height > container.height) {
        styleInfo.height = container.height - itemInfo.top;
      }
    }

    return Object.assign(itemInfo, styleInfo);
  },

  /**
   * Handle different drag points, capital letters mean: T-top，L-left，C-center，R-right，B-bottom
   * @param  {Object} itemInfo
   * @param  {Number} moveX
   * @param  {Number} moveY
   * @return {Object}
   */
  dealTL(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width - moveX;
    const height = itemInfo.height - moveY;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width,
        left: itemInfo.left + moveX
      });
    }

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height,
        top: itemInfo.top + moveY
      });
    }

    return styleInfo;
  },

  dealTC(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const height = itemInfo.height - moveY;

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height,
        top: itemInfo.top + moveY
      });
    }

    return styleInfo;
  },

  dealTR(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width + moveX;
    const height = itemInfo.height - moveY;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width
      });
    }

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height,
        top: itemInfo.top + moveY
      });
    }

    return styleInfo;
  },

  dealCL(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width - moveX;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width,
        left: itemInfo.left + moveX
      });
    }

    return styleInfo;
  },

  dealCR(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width + moveX;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width
      });
    }

    return styleInfo;
  },

  dealBL(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width - moveX;
    const height = itemInfo.height + moveY;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width,
        left: itemInfo.left + moveX
      });
    }

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height
      });
    }

    return styleInfo;
  },

  dealBC(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const height = itemInfo.height + moveY;

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height
      });
    }

    return styleInfo;
  },

  dealBR(itemInfo, moveX, moveY, minLimit = _.MIN_LIMIT) {
    const styleInfo = {};
    const width = itemInfo.width + moveX;
    const height = itemInfo.height + moveY;

    if (width >= Math.min(minLimit, itemInfo.width)) {
      Object.assign(styleInfo, {
        width
      });
    }

    if (height >= Math.min(minLimit, itemInfo.height)) {
      Object.assign(styleInfo, {
        height
      });
    }

    return styleInfo;
  },
  // 判断重叠算法，需传入目标元素的x/y坐标范围及当前元素x/y坐标范围
  judgemerge(targetMin: number, targetMax: number, cMin: number, cMax: number) {
    if (cMin >= targetMin && cMin <= targetMax) {
      // 最小值是否在目标元素坐标范围内
      return true;
    } else if (cMax >= targetMin && cMax <= targetMax) {
      // 最大值是否在目标元素坐标范围内
      return true;
    } else if (
      cMin <= targetMin &&
      cMin <= targetMax &&
      cMax >= targetMin &&
      cMax >= targetMax
    ) {
      // 当前元素坐标范围是否包含目标元素坐标范围
      return true;
    } else {
      return false;
    }
  },
  // 判断热区之间是否存在交集
  determineOverlap(othersZones, currentZone) {
    let overlap = false;
    if (othersZones.length) {
      for (let k = 0; k < othersZones.length; k++) {
        const xmerge = _.judgemerge(
          currentZone.leftPer,
          currentZone.leftPer + currentZone.widthPer,
          othersZones[k].leftPer,
          othersZones[k].leftPer + othersZones[k].widthPer
        );
        const ymerge = _.judgemerge(
          currentZone.topPer,
          currentZone.topPer + currentZone.heightPer,
          othersZones[k].topPer,
          othersZones[k].topPer + othersZones[k].heightPer
        );
        if (xmerge && ymerge) {
          overlap = true;
          break;
        }
      }
    }
    return overlap;
  }
} as UtilsInfo;

export default _;

// 深拷贝
const deepClone = (obj: any): any => {
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  const newObj = Array.isArray(obj) ? [...obj] : ({ ...obj } as any);
  Reflect.ownKeys(obj).forEach((o: any) => {
    if (obj[o] && typeof obj[o] === "object") {
      newObj[o] = deepClone(obj[o]);
    } else {
      newObj[o] = obj[o];
    }
  });
  return newObj;
};

export { deepClone };
