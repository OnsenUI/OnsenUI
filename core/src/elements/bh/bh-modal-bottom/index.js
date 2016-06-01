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
    rootClassName: 'bh-modal-bottom'
};

//继承标签开发所需的类
class BhModalBottomElement extends BaseElement {

    show(options = {}){
        options = util.extend(
            options || {}
        );

        this.classList.remove('bh-animate-out-bottom');
        this.classList.add('bh-animate-into-bottom');
        this.style.display = 'block';

        if(typeof options.callback !='undefined' && options.callback instanceof Function){
            //执行的回调
            options.callback();
        }
    }
    hide(options = {}){
        options = util.extend(
            options || {}
        );

        this.classList.remove('bh-animate-into-bottom');
        this.classList.add('bh-animate-out-bottom');

        if(typeof options.callback !='undefined' && options.callback instanceof Function){
            //执行的回调
            options.callback();
        }
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        this.style.display = 'none';
        this.classList.add('bh-animated');
        this.classList.add('bh-animate-into-bottom');

        let bottom = this.getAttribute('bottom');
        let bottomNum = parseInt(bottom, 10);
        if(bottomNum){
            let offsetBottom = '';
            if(!/rem$/.test(bottom)){
                offsetBottom = (bottomNum/20) + 'rem';
            }
            this.style.bottom = offsetBottom;
        }
    }
}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhModalBottomElement = document.registerElement('bh-modal-bottom', {
    prototype: BhModalBottomElement.prototype
});

