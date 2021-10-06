import _ from "../utils/index";

export default {
  beforeMount: function(el: any, binding: any) {
    const MIN_LIMIT = binding.instance.minSize || _.MIN_LIMIT;
    const isOverlap = binding.instance.switchOptions.isOverlap;
    console.log("MIN_LIMIT: ", MIN_LIMIT);
    function handleMouseDown(e: any) {
      e && e.preventDefault();
      let overlap = false;
      let itemInfo = {
        top: _.getDistanceY(e, el),
        left: _.getDistanceX(e, el),
        width: 0,
        height: 0
      };
      const container = _.getOffset(el);
      // Only used once at the beginning of init
      const setting = {
        topPer: _.decimalPoint(itemInfo.top / container.height),
        leftPer: _.decimalPoint(itemInfo.left / container.width),
        widthPer: 0,
        heightPer: 0
      };
      let preX = _.getPageX(e);
      let preY = _.getPageY(e);

      binding.instance.addItem(setting);

      function handleChange(e: any) {
        e && e.preventDefault();

        const moveX = _.getPageX(e) - preX;
        const moveY = _.getPageY(e) - preY;
        preX = _.getPageX(e);
        preY = _.getPageY(e);

        // Not consider the direction of movement first, consider only the lower right drag point
        const styleInfo = _.dealBR(itemInfo, moveX, moveY, MIN_LIMIT);

        // Boundary value processing
        itemInfo = _.dealEdgeValue(itemInfo, styleInfo, container);

        Object.assign(el.lastElementChild.style, {
          top: `${itemInfo.top}px`,
          left: `${itemInfo.left}px`,
          width: `${itemInfo.width}px`,
          height: `${itemInfo.height}px`
        });
      }

      window.addEventListener("mousemove", handleChange);

      function handleMouseUp() {
        if (!isOverlap) {
          // 已有热区
          const othersZones = binding.instance.zones.slice(0, -1);
          overlap = _.determineOverlap(othersZones, {
            leftPer: itemInfo.left / container.width,
            topPer: itemInfo.top / container.height,
            widthPer: itemInfo.width / container.width,
            heightPer: itemInfo.height / container.height
          });
          if (overlap) {
            binding.instance.removeItem(binding.instance.zones.length - 1);
            window.removeEventListener("mousemove", handleChange);
            window.removeEventListener("mouseup", handleMouseUp);
            return;
          }
        }
        const perInfo = {
          topPer: _.decimalPoint(itemInfo.top / container.height),
          leftPer: _.decimalPoint(itemInfo.left / container.width),
          widthPer: _.decimalPoint(itemInfo.width / container.width),
          heightPer: _.decimalPoint(itemInfo.height / container.height),
          key: String(Math.random())
        };
        if (binding.instance.isOverRange()) {
          binding.instance.overRange();
        } else if (container.height < MIN_LIMIT && itemInfo.width > MIN_LIMIT) {
          binding.instance.changeItem(
            Object.assign(perInfo, {
              topPer: 0,
              heightPer: 1
            })
          );
        } else if (container.width < MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          binding.instance.changeItem(
            Object.assign(perInfo, {
              leftper: 0,
              widthPer: 1
            })
          );
        } else if (itemInfo.width > MIN_LIMIT && itemInfo.height > MIN_LIMIT) {
          binding.instance.changeItem(perInfo);
        } else {
          binding.instance.eraseItem();
        }

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
