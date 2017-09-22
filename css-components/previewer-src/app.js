import {createAppComponent} from './components/app';

function init() {
  const components = makeComponents();
  const categories = makeCategories(components);
  const themes = getThemes();

  window.components = components;
  window.categories = categories;
  window.themes = themes;

  var app = new Vue(createAppComponent({components, categories}));
};

function makeCategories(components) {
  const set = new Set();
  components.forEach(component => {
    set.add(component.category);
  });

  return [...set.values()].map(value => {
    return {
      name: value,
      hash: value.toLowerCase().replace(/ /g, '_')
    };
  });
}

function makeComponents() {
  return JSON.parse(document.querySelector('#data').getAttribute('data-components')).map(component => {
    component = component.annotation;
    component.id = component.name.toLowerCase().replace(/ /g, '_');
    return component;
  });
}

function getThemes() {
  const themes = JSON.parse(document.querySelector('#data').getAttribute('data-themes')).map(theme => {
    return theme;
  }).filter(theme => {
    return theme !== 'onsen-css-components';
  });

  // 先頭に追加
  themes.unshift('onsen-css-components');

  return themes;
}

window.onload = init;

