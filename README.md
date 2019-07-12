## 基于VUE的插件，实现无需输入框得情况下网页监听扫码枪扫码结果

## 原理

可以把扫码枪看成一个类似键盘的输入设备，能够同等触发按键事件，给document添加keypress事件，该事件可以获取到按键对应的keyCode，然后通过keyCode获取到对应的字符，最后拼接在一起就OK了！

### 全局安装
``` javascript
import scanner from './install';
Vue.use(scanner);
```

### 使用
``` javascript
export default {
  data () {
    return {
      items:[],             //扫码结果
      isStart:false         //是否开启扫码
    }
  },
  methods:{
    startScannerHandler(e){
      e.target.blur();      //按钮对象失去焦点，扫码会默认带一个Enter键，会再次触发click
      if(!this.isStart){
        this._scanner=this.$scanner({callback:v=>{
          this.items.push(v);
        }});
      }else{
        this._scanner.cancel();
      }
      this.isStart=!this.isStart;
    }
  }
}
```