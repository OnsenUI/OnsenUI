import ons from 'onsenui';

ons.ready(function(){
  // new Vue() should be called after ons.ready.
  // Otherwise something will be broken.
  new Vue({
    el: '#app',
    template: `
      <div>
        {{message}}
      </div>
    `,
    data: {
      message: 'Hello'
    }
  });
});
