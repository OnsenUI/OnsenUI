/*
 底部弹框组件
 */

//引入标签开发需要的一些公共类
import util from 'ons/util';

const space = {
    //该组件的根样式名
    rootClassName: 'bh-modal-bottom',
    animateTime: 450
};

//继承组件开发所需的类
class BhModalBottom {
    //初始化并显示弹框
    show(options = {}){
        const defaultOptions = {
            cover: true, //是否显示遮罩层,默认true显示, false不显示
            closeIcon: true //是否显示关闭按钮, 默认true显示, false不显示
        };
        //合并参数
        options = util.extend({}, defaultOptions, options);
        //初始化处理
        this._compile(options);
    }
    hide(options = {}){
        options = util.extend(
            options || {}
        );

        const rootObj = document.querySelector('.'+space.rootClassName);
        const contentObj = util.findChild(rootObj, '.'+space.rootClassName+'-content');
        const coverObj = util.findChild(rootObj, '.'+space.rootClassName+'-cover');

        if(coverObj){
            coverObj.classList.remove('bh-animate-fadeIn');
            coverObj.classList.add('bh-animate-out-fadeOut');
        }
        contentObj.classList.remove('bh-animate-into-bottom');
        contentObj.classList.add('bh-animate-out-bottom');

        setTimeout(function () {
            rootObj.remove();
        }, space.animateTime);

        if(typeof options.callback !='undefined' && options.callback instanceof Function){
            //执行的回调
            options.callback();
        }
    }

    //初始化方法
    _compile(options) {
        const self = this;
        //创建根节点
        const rootObj = util.create('.'+space.rootClassName);
        //对根节点设置上下左右值,默认使用rem单位,否则会将px或数字转换成rem
        const offset = options.offset;
        if(offset){
            if(offset.top){
                rootObj.style.top = util.pxToRem(offset.top);
            }
            if(offset.bottom){
                rootObj.style.bottom = util.pxToRem(offset.bottom);
            }
            if(offset.left){
                rootObj.style.left = util.pxToRem(offset.left);
            }
            if(offset.right){
                rootObj.style.right = util.pxToRem(offset.right);
            }
        }

        //创建内容块
        const contentObj = util.create('.'+space.rootClassName+'-content');
        //添加动画类
        contentObj.classList.add('bh-animated');
        contentObj.classList.add('bh-animate-into-bottom');

        //插入内容
        const content = options.content;
        contentObj.innerHTML = content;

        //判断显示关闭按钮
        if(options.closeIcon){
            const closeIcon = util.create('i');
            closeIcon.classList.add('iconfont');
            closeIcon.classList.add('icon-close');
            contentObj.appendChild(closeIcon);

            //监听关闭按钮事件
            closeIcon.addEventListener('click', function () {
                //执行关闭回调
                self.hide({'callback': options.close});
            }, false);
        }

        //判断显示遮罩层
        if(options.cover){
            const cover = util.create('.'+space.rootClassName+'-cover');
            //给遮罩层添加动画
            cover.classList.add('bh-animated');
            cover.classList.add('bh-animate-fadeIn');
            rootObj.appendChild(cover);
        }

        //将创建的节点加入页面
        rootObj.appendChild(contentObj);
        document.querySelector('body').appendChild(rootObj);

        //初始化并显示完成后,执行回调
        if(typeof options.ready !='undefined' && options.ready instanceof Function){
            //执行的回调
            setTimeout(function () {
                options.ready();
            }, space.animateTime);
        }
    }
}

//注册组件
(function (BH, undefined) {
    BH.bhModalBottom = BhModalBottom.prototype;
})(window.BH = window.BH || {});

