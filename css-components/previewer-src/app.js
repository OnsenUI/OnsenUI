import {createAppPageComponent} from './components/app-page';

function init() {
  const components = loadComponents();
  const categories = loadCategories(components);
  const themes = loadThemes();
  const patterns = loadPatterns();

  window.components = components;
  window.categories = categories;
  window.themes = themes;
  window.patterns = patterns;

  const app = new Vue(createAppPageComponent({
    components,
    categories
  }));
};

function loadCategories(components) {
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

function loadComponents() {
  return JSON.parse(document.querySelector('#data').getAttribute('data-components')).map(component => {
    component = component.annotation;
    component.id = component.name.toLowerCase().replace(/ /g, '_');
    return component;
  });
}

function loadThemes() {
  const themes = JSON.parse(document.querySelector('#data').getAttribute('data-themes')).map(theme => {
    return theme;
  }).filter(theme => {
    return theme !== 'onsen-css-components';
  });

  // デフォルトのテーマを先頭に追加
  themes.unshift('onsen-css-components');

  return themes;
}

function loadPatterns() {
  return JSON.parse(document.querySelector('#data').getAttribute('data-patterns')).map(pattern => {
    pattern.id = pattern.name.toLowerCase().replace(/ +/g, '_');

    return pattern;
  });
}

window.onload = init;

