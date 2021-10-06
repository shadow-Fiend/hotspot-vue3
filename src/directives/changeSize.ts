import _ from "../utils/index";

export default {
  beforeMount: function(el: any, binding: any) {
    const MIN_LIMIT = binding.instance.minSize || _.MIN_LIMIT;
    const isOverlap = binding.instance.switchOptions.isOverlap;
    function handleMouseDown(e: any) {
      const pointer = e.target.dataset.pointer;
      if (!pointer) {
        return;
      }
      e && e.stopPropagation();
      let overlap = false;
      const zoneWidth = parseFloat(binding.instance.zoneWidth) / 100;
      const zoneHeight = parseFloat(binding.instance.zoneHeight) / 100;
      const zoneLeft = parseFloat(binding.instance.zoneLeft) / 100;
      const zoneTop = parseFloat(binding.instance.zoneTop) / 100;
      const zone = el.parentNode;
      const setting = binding.instance.setting;
      const container = _.getOffset(zone.parentNode);
      let itemInfo = {
        width: _.getOffset(zone).width || 0,
        height: _.getOffset(zone).height || 0,
        top: setting.topPer * container.height || 0,
        left: setting.leftPer * container.width || 0
      };
      let preX = _.getPageX(e);
      let preY = _.getPageY(e);
      let flag: boolean;

      // Hide the info displayed by hover
      binding.instance.handlehideZone(true);

      function handleChange(e: any) {
        e && e.preventDefault();
        flag = true;

        const moveX = _.getPageX(e) - preX;
        const moveY = _.getPageY(e) - preY;

        preX = _.getPageX(e);
        preY = _.getPageY(e);

        // Handling the situation when different dragging points are selected
        const styleInfo = (_ as any)[pointer](
          itemInfo,
          moveX,
          moveY,
          MIN_LIMIT
        );

        // Boundary value processing
        itemInfo = _.dealEdgeValue(itemInfo, styleInfo, container);

        Object.assign(zone.style, {
          top: `${itemInfo.top}px`,
          left: `${itemInfo.left}px`,
          width: `${itemInfo.width}px`,
          height: `${itemInfo.height}px`
        });
      }

      window.addEventListener("mousemove", handleChange);

      function handleMouseUp() {
        if (!isOverlap) {
          const othersZones = binding.instance.$parent.zones.filter(
            (item, index) => index !== binding.instance.index
          );
          overlap = _.determineOverlap(othersZones, {
            leftPer: itemInfo.left / container.width,
            topPer: itemInfo.top / container.height,
            widthPer: itemInfo.width / container.width,
            heightPer: itemInfo.height / container.height
          });
        }
        if (flag) {
          if (overlap) {
            overlap = false;
            const perInfo = {
              topPer: zoneTop,
              leftPer: zoneLeft,
              widthPer: zoneWidth,
              heightPer: zoneHeight
            };
            binding.instance.changeInfo(perInfo);
          } else {
            flag = false;
            const perInfo = {
              topPer: _.decimalPoint(itemInfo.top / container.height),
              leftPer: _.decimalPoint(itemInfo.left / container.width),
              widthPer: _.decimalPoint(itemInfo.width / container.width),
              heightPer: _.decimalPoint(itemInfo.height / container.height)
            };
            binding.instance.changeInfo(perInfo);

            // 兼容数据无变更情况下导致 computed 不更新，数据仍为 px 时 resize 出现的问题
            Object.assign(zone.style, {
              top: `${itemInfo.top}px`,
              left: `${itemInfo.left}px`,
              width: `${itemInfo.width}px`,
              height: `${itemInfo.height}px`
            });
          }
        }
        // Show the info
        binding.instance.handlehideZone(false);

        window.removeEventListener("mousemove", handleChange);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      window.addEventListener("mouseup", handleMouseUp);
    }
    el.addEventListener("mousedown", handleMouseDown);

    el.$destroy = () => el.removeEventListener("mousedown", handleMouseDown);
  },
  unmounted: function(el: any) {
    el.$destroy();
  }
};
