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
    rootClassName: 'bh-linkage-select',
    data: {
        lv1: ['1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1','1-1'],
        lv2: ['2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1','2-1'],
        lv3: ['3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1','3-1']
    },
    positionData: {}
};

//继承标签开发所需的类
class BhLinkageSelectElement extends BaseElement {
    handleScroll(event){
        // window.console.log(event)
        const targetObj = event.target;
        const blockScrollTop = targetObj.scrollTop;
        util.findParent(targetObj, 'bh-linkage-select').resetItemClass(targetObj, blockScrollTop);
    }

    resetItemClass(blockObj, blockScrollTop){
        const blockIndex = util.getElementIndex(blockObj);
        const blockPositionData = space.positionData[blockIndex];
        const blockpositionDataLen = blockPositionData.length;
        let selectItemIndex = NaN;
        // window.console.log(blockPositionData);
        window.console.log('blockScrollTop='+blockScrollTop);
        for(let i=0; i<blockpositionDataLen; i++){
            const itemPosition = blockPositionData[i];
            if(itemPosition === blockScrollTop){
                selectItemIndex = i;
            }else if(itemPosition < blockScrollTop){
                if(blockPositionData[i + 1] > blockScrollTop){
                    selectItemIndex = i;
                }
            }else{
                if(itemPosition > blockScrollTop){
                    break;
                }
            }
        }
        window.console.log(selectItemIndex)
        if(!isNaN(selectItemIndex)){
            const rootObj = util.findParent(blockObj, 'bh-linkage-select');
            let itemList = blockObj.querySelectorAll('.bh-linkage-select-item');
            const itemListLen = itemList.length;

            for(let i=0; i<itemListLen; i++){
                rootObj.removeItem3DClass(itemList[i]);
                if(i === selectItemIndex - 5){
                    itemList[i].classList.add('bh-linkage-select-item-3dUp-5');
                }else if(i === selectItemIndex - 4){
                    itemList[i].classList.add('bh-linkage-select-item-3dUp-4');
                }else if(i === selectItemIndex - 3){
                    itemList[i].classList.add('bh-linkage-select-item-3dUp-3');
                }else if(i === selectItemIndex - 2){
                    itemList[i].classList.add('bh-linkage-select-item-3dUp-2');
                }else if(i === selectItemIndex - 1){
                    itemList[i].classList.add('bh-linkage-select-item-3dUp-1');
                }
                // }else if(i === selectItemIndex){
                // }
                else if(i === selectItemIndex + 1){
                    itemList[i].classList.add('bh-linkage-select-item-3dDown-1');
                }else if(i === selectItemIndex + 2){
                    itemList[i].classList.add('bh-linkage-select-item-3dDown-2');
                }else if(i === selectItemIndex + 3){
                    itemList[i].classList.add('bh-linkage-select-item-3dDown-3');
                }else if(i === selectItemIndex + 4){
                    itemList[i].classList.add('bh-linkage-select-item-3dDown-4');
                }else if(i === selectItemIndex + 5){
                    itemList[i].classList.add('bh-linkage-select-item-3dDown-5');
                }
            }
        }
    }

    removeItem3DClass(itemObj){
        let itemClass = itemObj.getAttribute('class');
        itemClass = itemClass.replace(/bh-linkage-select-item-3d(Up|Down)-\d/g, '');
        itemClass = util.trim(itemClass);
        itemObj.setAttribute('class', itemClass);
    }

    // checkScrollForItem

    getAndSaveItemPositionData(blockObjs){
        const blockObjLen = blockObjs.length;
        for(let i=0; i<blockObjLen; i++){
            const itemObjs = blockObjs[i].querySelectorAll('.bh-linkage-select-item');
            const itemObjLen = itemObjs.length;
            space.positionData[i] = [];
            let blockItemPositionData = space.positionData[i];
            for(let k=0; k<itemObjLen; k++){
                // window.console.log(itemObjs[k])
                // window.console.log(itemObjs[k].offsetTop)
                blockItemPositionData.push(itemObjs[k].offsetTop);
            }
        }
        // window.console.log(space.positionData)
    }


    //组件加载完毕的回调,相当于该组件的入口方法
    createdCallback() {
        contentReady(this, () => this._compile());
    }

    //初始化方法
    _compile() {
        const header = ``;
        const selectBlock = `<div class="${space.rootClassName}-block" style="width: 33.33%;"><div class="${space.rootClassName}-list">@content</div></div>`;
        const selectItem = `<div class="${space.rootClassName}-item" style="@itemStyle">@content</div>`;
        const transform = `transform-origin: center center -90px;
                            transform: translateZ(90px) rotateX(-@rotateXNumdeg);`;
        let contentHtml = '';

        const selectData = space.data;
        const rotateXStep = 20;
        for(const key in selectData){
            if (selectData.hasOwnProperty(key)) {
                const blockData = selectData[key];
                const blockLen = blockData.length;
                let itemsHtml = '';
                for(let i=0; i<blockLen; i++){
                    itemsHtml += selectItem.replace('@content', blockData[i]).replace('@itemStyle', transform.replace('@rotateXNum', rotateXStep * i));
                }
                contentHtml += selectBlock.replace('@content', itemsHtml);
            }
        }
        
        const selectLine = `<div class="${space.rootClassName}-split-line"></div>`;

        this.innerHTML = contentHtml + selectLine;
        const blockObjs = this.querySelectorAll('.bh-linkage-select-block');
        const blockObjLen = blockObjs.length;
        for(let i=0; i<blockObjLen; i++){
            // blockObjs[i].addEventListener('scroll', this.handleScroll, false);
        }

        this.getAndSaveItemPositionData(blockObjs);
    }
}

//注册该标签(用于浏览器不支持自定义标签的处理)
window.BhLinkageSelectElement = document.registerElement('bh-linkage-select', {
    prototype: BhLinkageSelectElement.prototype
});

