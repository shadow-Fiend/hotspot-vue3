import _ from "../utils/index";

export default {
  beforeMount: function(el: any, binding: any) {
    function handleMouseDown(e: any) {
      e && e.stopPropagation();
      const zoneWidth = parseFloat(binding.instance.zoneWidth) / 100;
      const zoneHeight = parseFloat(binding.instance.zoneHeight) / 100;
      const zoneLeft = parseFloat(binding.instance.zoneLeft) / 100;
      const zoneTop = parseFloat(binding.instance.zoneTop) / 100;
      const container = _.getOffset(el.parentNode);
      const preX = _.getPageX(e);
      const preY = _.getPageY(e);
      const isOverlap = binding.instance.switchOptions.isOverlap;
      let topPer: number;
      let leftPer: number;
      let flag: boolean;
      let timer: any;
      let time = 0;
      let overlap = false;

      function handleChange(e: any) {
        timer = setInterval(() => {
          time++;
        }, 50);
        if (time <= 1) {
          return;
        }
        e && e.preventDefault();
        flag = true;
        // Hide the info displayed by hover
        binding.instance.handlehideZone(true);

        const setting = binding.instance.setting;
        let moveX = _.getPageX(e) - preX;
        let moveY = _.getPageY(e) - preY;

        setting.topPer = setting.topPer || 0;
        setting.leftPer = setting.leftPer || 0;
        topPer = _.decimalPoint(moveY / container.height + setting.topPer);
        leftPer = _.decimalPoint(moveX / container.width + setting.leftPer);

        // Hotzone moving boundary processing
        if (topPer < 0) {
          topPer = 0;
          moveY = -container.height * setting.topPer;
        }

        if (leftPer < 0) {
          leftPer = 0;
          moveX = -container.width * setting.leftPer;
        }

        if (topPer + setting.heightPer > 1) {
          topPer = 1 - setting.heightPer;
          moveY = container.height * (topPer - setting.topPer);
        }

        if (leftPer + setting.widthPer > 1) {
          leftPer = 1 - setting.widthPer;
          moveX = container.width * (leftPer - setting.leftPer);
        }

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      window.addEventListener("mousemove", handleChange);

      function handleMouseUp() {
        if (!isOverlap) {
          const othersZones = binding.instance.$parent.zones.filter(
            (item, index) => index !== binding.instance.index
          );
          overlap = _.determineOverlap(othersZones, {
            leftPer,
            topPer,
            widthPer: zoneWidth,
            heightPer: zoneHeight
          });
        }
        clearInterval(timer);
        if (flag) {
          if (overlap) {
            el.style.transform = "translate(0, 0)";
            binding.instance.changeInfo({
              zoneLeft,
              zoneTop
            });
            overlap = false;
          } else {
            flag = false;
            el.style.transform = "translate(0, 0)";
            binding.instance.changeInfo({
              topPer,
              leftPer
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
