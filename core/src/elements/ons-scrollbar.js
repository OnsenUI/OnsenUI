
import util from 'ons/util';
import BaseElement from 'ons/base-element';

class ScrollbarElement extends BaseElement {

  createdCallback() {
    if (!this.hasAttribute('_compiled')) {
      this._compile();
    } else {
      this._scroll = this.getElementsByClassName('scrollbar')[0];
    }
    this._timeout = false;
    this._visibility = 'auto';
    this._limitReached = 0;
    this._limitCallback = () => {
      this._limitReached = 1;
      this.onInfiniteScroll && this.onInfiniteScroll(() => {
        this._limitReached = 0;
        this.updateScrollbarHeight();
        this.updateScrollbarLocation();
      });
    };
    this.onInfiniteScrollLimit = 0.9;
    this.onInfiniteScroll = (done) => {
      this._content.innerHTML += Array(100).join('koko ');
      console.log('genkai da!');
      setTimeout(done, 500);
    };

    this._boundOnDragStart = this._onDragStart.bind(this);
    this._boundOnScroll = this._onScroll.bind(this);

    ['visibility'].forEach(e => {
      this.attributeChangedCallback(e, null, this.getAttribute(e));
    });
  }

  _compile() {
    this.classList.add('scrollbar-container');
    this._scroll = util.createElement(`<div class="scrollbar"><div class="scrollbar-touch"></div></div>`);
    this.appendChild(this._scroll);
    this.setAttribute('_compiled', '');
  }

  _attach() {
    this._content = util.createElement(`<div class="content"></div>`);
    Array.prototype.slice.call(this.parentNode.childNodes).forEach(e => {
      if (e != this) {
        this._content.appendChild(e);
      }
    });
    this.parentNode.insertBefore(this._content, this);
    this.setAttribute('_attached', '');
  }

  _onScroll(e) {
    this.updateScrollbarHeight();
    this.updateScrollbarLocation();

    if (this._visibility === 'autohide') {
      this._updateAutohide();
    }
    if (!this._limitReached && this._overLimit()) {
      this._limitReached = 1;
      this.onInfiniteScroll && this.onInfiniteScroll.call(this._content, () => {
        this.updateScrollbarHeight();
        this._limitReached = 0;
      });
    }
  }

  _updateAutohide(){
    if (!this._scrolling) {
      this._scrolling = true;
      this._scroll.classList.add('scrollbar-autohide-visible');
    }
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._scrolling = false;
      this._scroll.classList.remove('scrollbar-autohide-visible');
    }, 200);
  }

  _overLimit(e){
    var c = this._content;
    return (c.scrollTop + c.clientHeight) / c.scrollHeight >= this.onInfiniteScrollLimit;
  }

  updateScrollbarHeight() {
    var [content, scroll, container] = [this._content, this._scroll, this];

    if (this._visibility === 'auto' && content.clientHeight >= content.scrollHeight) {
      scroll.style.height = '0px';
    } else {
      scroll.style.height = Math.round(container.clientHeight * content.clientHeight / content.scrollHeight) + 'px';
    }

    this._contentMax = content.scrollHeight - content.clientHeight;
    this._scrollMax = container.clientHeight - scroll.clientHeight;
  }

  updateScrollbarLocation(){
    this._scroll.style.top = Math.round(this._scrollMax * this._content.scrollTop / this._contentMax) + 'px';
  }

  _onDragStart(e) {
    this.updateScrollbarHeight();
    var startY = this._scroll.offsetTop;
    var onMove = (e) => {
      var progress = Math.min(1, Math.max(0, (startY + e.gesture.deltaY) / this._scrollMax));
      this._content.scrollTop = this._contentMax * progress;
      this._onDrag(startY, e.gesture.deltaY);
    };
    document.addEventListener('drag', onMove);
    document.addEventListener('release', () => {
      document.removeEventListener('drag', onMove);
    });
  }

  _onTouchStart(e) {
    e.preventDefault();
  }

  attachedCallback() {
    if (!this.hasAttribute('_attached')) {
      this._attach();
    } else {
      this._content = this.parentNode.querySelector('.content');
    }
    var styles = window.getComputedStyle(this.parentNode);
    if (styles.getPropertyValue('position') == 'static') {
      this.parentNode.style.position = 'relative';
    }
    if (styles.getPropertyValue('overflow') == 'scroll') {
      this.parentNode.style.overflow = 'scroll';
    }

    window.oncontextmenu = (e) => {
      e.buttons == 3 && e.preventDefault();
    };
    window.q = new ons.GestureDetector(this);

    this._content.addEventListener('scroll', this._boundOnScroll);
    this._onScroll();

    if (this._visibility === 'visible' || this._visibility === 'auto') {
      this._scroll.addEventListener('dragstart', this._boundOnDragStart);
      this._scroll.addEventListener('touchstart', this._onTouchStart);
    }
  }


  detachedCallback() {
    this._content.removeEventListener('scroll', this._boundOnScroll);
    this._scroll.removeEventListener('dragstart', this._boundOnDragStart);
    this._scroll.removeEventListener('touchstart', this._onTouchStart);
    this._timeout && clearTimeout(this._timeout);
  }


  attributeChangedCallback(name, last, current) {
    if (name === 'visibility') {
      if (last === 'hidden' || last === 'autohide' && current !== 'hidden' && current !== 'autohide') {
        this._scroll.addEventListener('dragstart', this._boundOnDragStart);
        this._scroll.addEventListener('touchstart', this._onTouchStart);
      }
      this._visibility = current || 'auto';
    }
  }

}

window.OnsScrollbarElement = document.registerElement('ons-scrollbar', {
  prototype: ScrollbarElement.prototype
});
