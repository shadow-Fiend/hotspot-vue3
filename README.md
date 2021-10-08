# hotspot-vue3 · [![npm](https://img.shields.io/badge/npm-v1.1.1-2081C1)](https://www.npmjs.com/package/hotspot-vue3) [![yarn](https://img.shields.io/badge/yarn-v1.1.1-F37E42)](https://yarnpkg.com/package/hotspot-vue3) [![github](https://img.shields.io/badge/GitHub-depositary-9A9A9A)](https://github.com/shadow-Fiend/hotspot-vue3) [![](https://img.shields.io/github/issues/shadow-Fiend/hotspot-vue3)](https://github.com/shadow-Fiend/hotspot-vue3/issues) [![](https://img.shields.io/github/forks/shadow-Fiend/hotspot-vue3)](https://github.com/shadow-Fiend/hotspot-vue3/network/members) [![](https://img.shields.io/github/stars/shadow-Fiend/hotspot-vue3)](https://github.com/shadow-Fiend/hotspot-vue3/stargazers)

A hot zone generation tool for VUE3 + TS projects

![image](https://github.com/shadow-Fiend/readme_image/blob/master/hotspot-vue3.png)

## 插件安装

```bash
yarn add hotspot-vue3

# or

npm install hotspot-vue3 --save
```

## 插件使用

- 在业务组件文件中引入

```javascript
import Hotspot from "hotspot-vue3";
```

- 在你的业务代码中，按正常组件使用即可

```vue
<template>
  <div class="hotapp">
    <hotspot
      :image="image"
      :zonesInit="zones"
      :types="types"
      :minSize="52"
      :switchOptions="{
        isShowSign: true,
        isShowDelete: true,
        isOverlap: false,
        isShowActive: true
      }"
      :styleOptions="{}"
      @add="handleAdd"
    >
      <!-- <template #sign="{ zone, index }">
        {{ zone }}
        {{ index }}
      </template>
      <template #delete="{ index }">
        {{ index }}
      </template> -->
    </hotspot>
    <div class="hotapp__display">
      <button type="primary" @click="handleAdd">添加热区</button>
      <input
        type="text"
        v-for="(zone, index) in zones"
        :key="index"
        v-model="zone.url"
        :placeholder="`Area ${index + 1} url`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Hotspot from "hotspot-vue3";

type MoreUrl = {
  [key in string | number]: string;
};
interface ZoneType {
  topPer: number;
  leftPer: number;
  widthPer: number;
  heightPer: number;
  url?: string | MoreUrl;
  active?: boolean;
  key?: string;
}

@Options({
  components: {
    Hotspot
  }
})
export default class App extends Vue {
  image =
    "https://github.com/shadow-Fiend/readme_image/blob/master/big_fish.jpeg";
  zones = [] as ZoneType[];
  types = "move";

  handleAdd(zon: ZoneType) {
    let zone: ZoneType;
    if (zon.topPer) {
      // 存在此参数,则通过拖动创建热区
      zone = zon;
      zone.url = "https://github.com/shadow-Fiend";
      this.types = "move"; // 存在max热区时，验证通过拖动或点击达到max
    } else {
      //通过按钮创建热区
      zone = {
        heightPer: 0.2027, //20.27%
        leftPer: 0.2027,
        topPer: 0.2027,
        widthPer: 0.1027,
        url: "https://github.com/shadow-Fiend",
        key: String(Math.random())
      } as ZoneType;
      this.types = "btn"; // 存在max热区时，验证通过拖动或点击达到max
    }
    this.zones.push(zone); // 热区数据
  }
}
</script>

<style lang="scss" scoped>
.hotapp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 555px;
  min-width: 1000px;

  &__display {
    margin-top: 24px;

    > input {
      margin-left: 10px;
    }
  }
}
</style>
```

### 参数说明

如示例代码所示，直接引入该组件，其他的功能全部通过属性来进行控制即可。

接下来就跟大家讲下每个属性的意义：

#### Hotspot Attributes

| 属性          | 描述                                         |  类型  |                      可接受的参数                      | 默认值 |
| :------------ | :------------------------------------------- | :----: | :----------------------------------------------------: | :----: |
| image         | 热区底图 url 地址                            | String |                                                        |        |
| zonesInit     | 热区内容, 为数组形式                         | Array  | topPer、leftPer、widthPer、heightPer、url、active、key |        |
| max           | 即当前热区最大显示数量，不设置则可以无限新增 | Number |                                                        |        |
| types         | 新增热区的方式                               | String |   move: 通过鼠标拖动生成, btn 通过自定义按钮点击生成   |        |
| switchOptions | 热区开关属性                                 | Object |   isShowSign、isShowDelete、isOverlap、isShowActive    |        |
| styleOptions  | 热曲展示的一些色值属性                       | Object |    zoneBorderColor、zoneBgColor、zoneActiveBgColor     |        |
| max           | 即当前热区最大显示数量，不设置则可以无限新增 | Number |                                                        |        |
| max           | 即当前热区最大显示数量，不设置则可以无限新增 | Number |                                                        |        |

#### ZonesInit Atributes

| 属性      | 描述                                         |        类型         | 可接受的参数 |      默认值       |
| :-------- | :------------------------------------------- | :-----------------: | :----------: | :---------------: |
| topPer    | 距离顶部占整体区域百分比                     |       Number        |              |                   |
| leftPer   | 距离左侧占整体区域百分比                     |       Number        |              |                   |
| widthPer  | 热区宽度占整体区域百分比                     |       Number        |              |                   |
| heightPer | 热区高度占整体区域百分比                     |       Number        |              |                   |
| url       | 热区链接地址, 可以自己定义对象保存更多的参数 |    String / any     |              |                   |
| active    | 热区激活状态                                 | Boolean / undefined |              | false / undefined |
| key       | 热区 key, 用来做唯一标识                     |       String        |              |   Math.random()   |

#### SwitchOptions Atributes

| 属性         | 描述                     |  类型   | 可接受的参数 | 默认值 |
| :----------- | :----------------------- | :-----: | :----------: | :----: |
| isShowSign   | 是否展示热区标识         | Boolean |              |  true  |
| isShowDelete | 是否展示热区删除标识     | Boolean |              |  true  |
| isOverlap    | 热区之间是否允许覆盖     | Boolean |              | false  |
| isShowActive | 点击热区是否展示激活状态 | Boolean |              |  true  |

#### StyleOptions Atributes

| 属性              | 描述                                                         |  类型  | 可接受的参数 |         默认值          |
| :---------------- | :----------------------------------------------------------- | :----: | :----------: | :---------------------: |
| zoneBorderColor   | 热区边框颜色                                                 | String |              |         #507bfb         |
| zoneBgColor       | 热区背景颜色                                                 | String |              | rgba(80, 123, 251, 0.1) |
| zoneActiveBgColor | 激活状态下热区背景颜色, 只有 isShowActive 属性为 true 时生效 | String |              | rgba(80, 123, 251, 0.4) |

## 写在最后

至此，插件的所有使用方法就介绍完了。

该插件仅支持 Vue3.x 的项目。。。

想进一步了解插件源码的请移步插件的 GitHub 仓库：[hotspot-vue3](https://github.com/shadow-Fiend/hotspot-vue3)
