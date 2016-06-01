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

    _clearValue() {
        const input = this.previousSibling.parentNode.querySelector('.bh-search-input');
        const clas = this.getAttribute('class');
        if (input.value != '') {

            if (clas == 'iconfont iconfont-search-cancel') {
                this.style.display = 'none';
            } else {
                this.previousSibling.parentNode.querySelector('.iconfont-search-cancel').style.display = 'none';
            }
            input.value = '';
            input.focus();
        }
    }
    _showClose() {
        let value = this.value;
        const cancel = this.parentNode.querySelector('.iconfont-search-cancel');
        if (value != '') {
            cancel.style.display = 'inline-block';
        } else {
            cancel.style.display = 'none';
        }
    }

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

        const contentHtml = `
            <div class="${space.rootClassName}-wrap">
                <div class="${space.rootClassName}-box">
                    <i class="iconfont iconfont-search">&#xe895;</i>
                    <input class="${space.rootClassName}-input" id="124" value="${space.value}" type="text" />
                    <i class = "iconfont iconfont-search-cancel">&#xe67a;</i>
                </div>
                <a href="javascript:;" class="bh-search-cancel">取消</a>
            </div>
        `;

        this.innerHTML = contentHtml;

        const cancel = this.querySelector('.bh-search-cancel');
        const close = this.querySelector('.iconfont-search-cancel');
        const Input = this.querySelector('.bh-search-input');
        cancel.addEventListener('click', this._clearValue, false);
        close.addEventListener('click', this._clearValue, false);
        Input.addEventListener('keyup', this._showClose, false);
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhSearchElement = document.registerElement('bh-search', {
    prototype: BhSearchElement.prototype
});