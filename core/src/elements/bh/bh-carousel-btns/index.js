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
    rootClassName: 'bh-carousel-btns'
};

//继承标签开发所需的类
class BhCarouselBtnsElement extends BaseElement {
    //设置高亮位置
    setActiveIndex(index){
        const btns = this.querySelectorAll('div');
        const btnsLen = btns.length;
        for(let i=0; i<btnsLen; i++){
            const item = btns[i];
            item.classList.remove('bh-active');
            if(index === i){
                item.classList.add('bh-active');
            }
        }
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        const count = parseInt(this.getAttribute('count'), 10);
        if(!count){
            return;
        }

        let activeIndex = parseInt(this.getAttribute('active-index'), 10);
        activeIndex = activeIndex ? activeIndex : 1;

        const btnHtml = `
            <div class="${space.rootClassName}-item @activeClass"></div>
        `;

        let contentHtml = '';

        for(var i=0; i<count; i++){
            let activeClass = '';
            if(i+1 === activeIndex){
                activeClass = 'bh-active';
            }
            contentHtml += btnHtml.replace('@activeClass', activeClass);
        }

        this.innerHTML = contentHtml;
    }
}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhCarouselBtnsElement = document.registerElement('bh-carousel-btns', {
    prototype: BhCarouselBtnsElement.prototype
});

