
window.onload = init;

function init() {
  var components = JSON.parse(document.querySelector('#components-data').textContent);
  components = components.map(function(component) {
    component = component.annotation;
    component.preview = true;
    return component;
  });

  var app = new Vue({
    el: '#app',
    data: {
      components: components,
      platform: getPlatform()
    }
  });
};

function getPlatform() {
  var platform = getQueryParams()['platform'];
  if (platform === 'android' || platform === 'ios') {
    return platform;
  }
  return 'all';
}

function getPlatformFilter(platform) {
  if (platform === 'android') {
    return component => component.annotation.name.match(/Material/);
  }
  
  if (platform === 'ios') {
    return component => !component.annotation.name.match(/Material/);
  }

  return () => true;
}

function makeComponentModel(component) {
  component.annotation = makeAnnotationModel(component.annotation);
  return component;
}

function makeAnnotationModel(annotation) {
  annotation.preview = ko.observable(true);
  annotation.togglePreview = function() {
    annotation.preview(!annotation.preview());
  };
  return annotation;
}

function getQueryParams() {
  var params = [];
  var pairs = window.location.search.slice(1).split('&');    
  var pair;
  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i].split('=');
    params[pair[0]] = pair[1];
  }

  return params;
}