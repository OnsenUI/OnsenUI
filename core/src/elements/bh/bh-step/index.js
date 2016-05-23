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
    rootClassName: 'bh-step'
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
        const num = this.currentStep;
        this.setStep(num + 1);
    }

    //步进减一
    _down(){
        let num = this.currentStep;
        num--;
        //最小值是1
        if(num < 1){
            num = 1;
        }
        this.setStep(num);
    }

    //点击加减按钮的处理
    _stepAction(event){
        const target = event.target;

        if(util.hasClass(target, 'bh-right')){
            this._add();
        }else if(util.hasClass(target, 'bh-left')){
            this._down();
        }
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        autoStyle.prepare(this);
        //添加样式
        this.classList.add(space.rootClassName);

        //创建标签,添加样式
        const leftIcon = document.createElement('div');
        leftIcon.classList.add(space.rootClassName+'-icon');
        leftIcon.classList.add('bh-left');

        const rightIcon = document.createElement('div');
        rightIcon.classList.add(space.rootClassName+'-icon');
        rightIcon.classList.add('bh-right');

        const input = document.createElement('input');
        input.classList.add(space.rootClassName+'-input');

        //将创建的标签添加到组件里
        this.appendChild(leftIcon);
        this.appendChild(input);
        this.appendChild(rightIcon);

        //监听该组件的事件
        this.addEventListener('click', this._stepAction, false);
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhSteppingElement = document.registerElement('bh-stepping', {
    prototype: BhSteppingElement.prototype
});

