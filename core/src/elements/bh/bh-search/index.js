/*
 搜索组件
 */

//引入标签开发需要的一些公共类
import util from 'ons/util';
import autoStyle from 'ons/autostyle';
import ModifierUtil from 'ons/internal/modifier-util';
import BaseElement from 'ons/base-element';
import contentReady from 'ons/content-ready';

const space = {
    //该组件的根样式名
    rootClassName: 'bh-search',
    value: ''
};

//继承标签开发所需的类
class BhSearchElement extends BaseElement {

    // _setAttr(event) {
    //util.findParent(this, 'bh-input').setAttribute('value', this.value);
    //}

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        //const initValue = this.getAttribute('value');
        //if (initValue) {
        // space.value = initValue;
        //}

        // const label = this.getAttribute('label');


        const stepHtml = `
            <div class="${space.rootClassName}-wrap">
                <div class="${space.rootClassName}-box">
                    <i class="iconfont">&#xe895;</i>
                    <input class="${space.rootClassName}-input" value="${space.value}" type="text" />
                    <i class="iconfont">&#xe67a;</i>
                </div>
                <a href="javascript:;" class="${space.rootClassName}-cancel">取消</a>
            </div>
        `;

        this.innerHTML = stepHtml;

        //监听输入框变化,设置bh-input标签的value
        //this.querySelector('input').addEventListener('change', this._setAttr, false);
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhSearchElement = document.registerElement('bh-search', {
    prototype: BhSearchElement.prototype
});