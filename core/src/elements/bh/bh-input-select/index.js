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
    rootClassName: 'bh-input-select'
};

//继承标签开发所需的类
class BhInputSelectElement extends BaseElement {

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        this.classList.add('bh-clearfix-child');
        const label = this.getAttribute('label');
        const caption = this.getAttribute('caption');
        const icon = this.getAttribute('icon');
        let iconClass = icon ? icon : 'keyboardarrowright';
        iconClass = iconClass.replace(/^icon-/, '');

        const contentHtml = `
            <div class="${space.rootClassName}-label">${label}</div>
            <div class="${space.rootClassName}-caption">
                <span class="${space.rootClassName}-caption-text">${caption}</span>
                <i class="iconfont icon-${iconClass}"></i>
            </div>
        `;

        this.innerHTML = contentHtml;
    }
}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhInputSelectElement = document.registerElement('bh-input-select', {
    prototype: BhInputSelectElement.prototype
});

