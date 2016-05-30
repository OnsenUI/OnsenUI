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
    rootClassName: 'bh-input',
    value: ''
};

//继承标签开发所需的类
class BhInputElement extends BaseElement {

    //提供给外部获取值的方法
    value(){
        return util.findChild(this, 'input').value;
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        const initValue = this.getAttribute('value');
        if(initValue){
            space.value = initValue;
        }

        const label = this.getAttribute('label');


        const stepHtml = `
            <div class="${space.rootClassName}-label">${label}</div>
            <input class="${space.rootClassName}" value="${space.value}" type="text" />
        `;

        this.innerHTML = stepHtml;
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhInputElement = document.registerElement('bh-input', {
    prototype: BhInputElement.prototype
});

