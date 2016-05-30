/*
 步进组件
 */

//引入标签开发需要的一些公共类
import util from 'ons/util';
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import contentReady from 'ons/content-ready';

const space = {
    //该组件的根样式名
    rootClassName: 'bh-stepping',
    value: 1,
    //缓存标签对象
    rootObj: null
};

//继承标签开发所需的类
class BhSteppingElement extends BaseElement {

    //定义获取input元素的方法
    get inputDom() {
        return util.findChild(this, 'input');
    }

    //定义设置input值的方法
    setStep(value){
        this.inputDom.value = value;
    }

    //获取input的当前值
    get currentStep(){
        let num = parseInt(this.inputDom.value, 10);
        if(!num){
            num = 0;
        }
        return num;
    }

    //步进加1
    _add(){
        const num = space.rootObj.currentStep;
        space.rootObj.setStep(num + 1);
    }

    //步进减一
    _down(){
        let num = space.rootObj.currentStep;
        num--;
        //最小值是1
        if(num < 1){
            num = 1;
        }
        space.rootObj.setStep(num);
    }

    _iconActiveHandle(event){
        this.classList.toggle('bh-active');
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        space.rootObj = this;
        autoStyle.prepare(this);
        //添加样式
        this.classList.add(space.rootClassName);

        const initValue = this.getAttribute('value');
        if(initValue){
            space.value = initValue;
        }

        const stepHtml = `
            <div class="${space.rootClassName}-icon bh-left"><i class="iconfont icon-remove"></i></div>
            <input class="${space.rootClassName}-input" value="${space.value}" type="number" />
            <div class="${space.rootClassName}-icon bh-right"><i class="iconfont icon-add"></i></div>
        `;

        this.innerHTML = stepHtml;

        //监听该组件的事件
        const leftIcon = util.findChild(this, '.bh-left');
        const rightIcon = util.findChild(this, '.bh-right');
        leftIcon.addEventListener('click', this._down, false);
        leftIcon.addEventListener('touchstart', this._iconActiveHandle, false);
        leftIcon.addEventListener('touchend', this._iconActiveHandle, false);

        rightIcon.addEventListener('click', this._add, false);
        rightIcon.addEventListener('touchstart', this._iconActiveHandle, false);
        rightIcon.addEventListener('touchend', this._iconActiveHandle, false);
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhSteppingElement = document.registerElement('bh-stepping', {
    prototype: BhSteppingElement.prototype
});

