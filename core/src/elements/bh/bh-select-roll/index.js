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
    rootClassName: 'bh-select-roll',
    touchStartData: {},
    dataCount: 0,
    rotateXstep: 20,
    activeIndex: 0
};

const data = [
    '浮动',
    '发的',
    '让我',
    '浩特',
    '后台',
    '计划',
    '联合国',
    '特务',
    '换肤',
    '问过',
    '月儿',
    '愉快',
    '聊天',
    '评价',
    '确认'
];

//继承标签开发所需的类
class BhSelectRollElement extends BaseElement {
    _touchStartHandle(event){
        space.touchStartData.timeStamp = event.timeStamp;
        space.touchStartData.pageY = event.touches[0].pageY;
        this._resetItemActive('hide');
    }

    _touchMoveHandle(event){
        const pageY = event.touches[0].pageY;
        const diff = space.touchStartData.pageY - pageY;
        const ulObj = this.querySelector('ul');
        const ulTransform = ulObj.style.transform;
        const rotateX = ulTransform.match(/rotateX\(\-?\d*\.+\d*deg\)|rotateX\(\-?\d*deg\)/);
        const rotateXNum = Number(rotateX[0].replace(/[^\-\.0-9]*/g, ''));
        const newRotateXNum = rotateXNum + diff;
        const newTransform = ulTransform.replace(/rotateX\(.+deg\)/, `rotateX(${newRotateXNum}deg)`);
        const index = Math.round(newRotateXNum / space.rotateXstep);

        // window.console.log(index)
        if(index >= 0 && index < space.dataCount){
            space.activeIndex = index;
        }else{
            if(index < 0){
                space.activeIndex = 0;
                if(index < -1){
                    return;
                }
            }else{
                space.activeIndex = space.dataCount - 1;
                if(index > space.dataCount){
                    return;
                }
            }
        }

        ulObj.style.transform = newTransform;
        space.touchStartData.pageY = pageY;

        this._resetItemVisible(index);
    }

    _resetItemVisible(index){
        const liList = this.querySelectorAll('li');
        // this.querySelector('.bh-active').classList.remove('bh-active');
        const liLen = liList.length;
        for(let i=0; i<liLen; i++){
            if(i > index - 5 && i < index + 5){
                liList[i].classList.add('bh-visible');
            }else{
                liList[i].classList.remove('bh-visible');
            }
        }
    }

    _touchEndHandle(event){
        // window.console.log(space.activeIndex)
        space.touchStartData = {};
        this._resetItemActive('show');
        const ulObj = this.querySelector('ul');
        ulObj.style.transform = `perspective(1000px) rotateY(0deg) rotateX(${space.activeIndex * space.rotateXstep}deg)`;
    }

    _resetItemActive(type){
        const ulObj = this.querySelector('ul');
        const liList = ulObj.querySelectorAll('li');
        if(type === 'hide'){
            liList[space.activeIndex].classList.remove('bh-active');
        }else{
            liList[space.activeIndex].classList.add('bh-active');
        }
    }

    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        const dataLen = data.length;
        space.dataCount = dataLen;
        let listHtml = '';
        const itemStyle = `transform-origin: center center -7rem; transform: translateZ(7rem) rotateX(@rotateXNumdeg);`;
        for(let i=0; i<dataLen; i++){
            let itemClass = '';
            if(i < 4){
                if(i !== 0){
                    itemClass = 'bh-visible';
                }else{
                    itemClass = 'bh-active bh-visible';
                }
            }
            listHtml += `<li class="${itemClass}" style="${itemStyle.replace('@rotateXNum', -(i * space.rotateXstep))}">${data[i]}</li>`;
        }

        const contentHtml = `
            <div class="${space.rootClassName}-body">
                <div class="${space.rootClassName}-box"></div>
                <ul class="bh-select-roll-list" style="transform:perspective(1000px) rotateY(0deg) rotateX(0deg);">${listHtml}</ul>
            </div>
        `;

        this.innerHTML = contentHtml;

        //监听该组件的事件
        this.addEventListener('touchstart', this._touchStartHandle, false);
        this.addEventListener('touchmove', this._touchMoveHandle, false);
        this.addEventListener('touchend', this._touchEndHandle, false);
    }

}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhSelectRollElement = document.registerElement('bh-select-roll', {
    prototype: BhSelectRollElement.prototype
});

