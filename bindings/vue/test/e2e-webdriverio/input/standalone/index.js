import ons from 'onsenui';

ons.ready(function(){
  // new Vue() should be called after ons.ready.
  // Otherwise something will be broken.
  new Vue({
    el: '#app',
    template: `
      <div>
        <span id="is-mounted"></span>

        <h2>No attributes</h2>
        <v-ons-input id="no-attributes"></v-ons-input><br>

        <h2>Props</h2>

        <h3>type</h3>
        <!-- listed in https://developers.whatwg.org/the-input-element.html -->
        <v-ons-input type="hidden"></v-ons-input> type="hidden"<br>
        <v-ons-input type="text"></v-ons-input> type="text"<br>
        <v-ons-input type="search"></v-ons-input> type="search"<br>
        <v-ons-input type="tel"></v-ons-input> type="tel"<br>
        <v-ons-input type="url"></v-ons-input> type="url"<br>
        <v-ons-input type="email"></v-ons-input> type="email"<br>
        <v-ons-input type="password"></v-ons-input> type="password"<br>
        <v-ons-input type="datetime"></v-ons-input> type="datetime"<br>
        <v-ons-input type="date"></v-ons-input> type="date"<br>
        <v-ons-input type="month"></v-ons-input> type="month"<br>
        <v-ons-input type="week"></v-ons-input> type="week"<br>
        <v-ons-input type="time"></v-ons-input> type="time"<br>
        <v-ons-input type="datetime-local"></v-ons-input> type="datetime-local"<br>
        <v-ons-input type="number"></v-ons-input> type="number"<br>
        <v-ons-input type="range"></v-ons-input> type="range"<br>
        <v-ons-input type="color"></v-ons-input> type="color"<br>
        <v-ons-input type="file"></v-ons-input> type="file"<br>
        <v-ons-input type="submit"></v-ons-input> type="submit"<br>
        <v-ons-input type="image"></v-ons-input> type="image"<br>
        <v-ons-input type="reset"></v-ons-input> type="reset"<br>
        <v-ons-input type="button"></v-ons-input> type="button"<br>

        <h3>value</h3>
        <v-ons-input type="hidden" value="hoge"></v-ons-input><br>
        <v-ons-input type="text" value="hoge"></v-ons-input><br>
        <v-ons-input type="search" value="hoge"></v-ons-input><br>
        <v-ons-input type="tel" value="hoge"></v-ons-input><br>
        <v-ons-input type="url" value="hoge"></v-ons-input><br>
        <v-ons-input type="email" value="hoge"></v-ons-input><br>
        <v-ons-input type="password" value="hoge"></v-ons-input><br>
        <v-ons-input type="datetime" value="hoge"></v-ons-input><br>
        <v-ons-input type="date" value="hoge"></v-ons-input><br>
        <v-ons-input type="month" value="hoge"></v-ons-input><br>
        <v-ons-input type="week" value="hoge"></v-ons-input><br>
        <v-ons-input type="time" value="hoge"></v-ons-input><br>
        <v-ons-input type="datetime-local" value="hoge"></v-ons-input><br>
        <v-ons-input type="number" value="hoge"></v-ons-input><br>
        <v-ons-input type="range" value="hoge"></v-ons-input><br>
        <v-ons-input type="color" value="hoge"></v-ons-input><br>
        <v-ons-input type="file" value="hoge"></v-ons-input><br>
        <v-ons-input type="submit" value="hoge"></v-ons-input><br>
        <v-ons-input type="image" value="hoge"></v-ons-input><br>
        <v-ons-input type="reset" value="hoge"></v-ons-input><br>
        <v-ons-input type="button" value="hoge"></v-ons-input><br>

        <h3>placeholder</h3>
        <v-ons-input type="hidden" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="text" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="search" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="tel" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="url" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="email" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="password" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="datetime" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="date" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="month" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="week" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="time" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="datetime-local" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="number" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="range" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="color" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="file" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="submit" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="image" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="reset" placeholder="piyo"></v-ons-input><br>
        <v-ons-input type="button" placeholder="piyo"></v-ons-input><br>

        <h3>float</h3>
        <v-ons-input type="hidden" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="text" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="search" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="tel" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="url" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="email" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="password" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="datetime" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="date" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="month" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="week" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="time" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="datetime-local" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="number" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="range" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="color" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="file" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="submit" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="image" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="reset" placeholder="piyo" float modifier="material"></v-ons-input><br>
        <v-ons-input type="button" placeholder="piyo" float modifier="material"></v-ons-input><br>

        <h3>input-id</h3>
        <label for="foo">Label: <label><v-ons-input type="text" input-id="foo"></v-ons-input><br>

        <h2>Events</h2>

        <h3>click</h3>
        <v-ons-input type="button" value="push me" @click="onClick()"></v-ons-input><br>

        <h2>Two-way data binding</h2>
        <v-ons-input type="hidden" v-model="hiddenValue"></v-ons-input> {{hiddenValue}}<br>
        <v-ons-input type="text" v-model="textValue"></v-ons-input> {{textValue}}<br>
        <v-ons-input type="search" v-model="searchValue"></v-ons-input> {{searchValue}}<br>
        <v-ons-input type="tel" v-model="telValue"></v-ons-input> {{telValue}}<br>
        <v-ons-input type="url" v-model="urlValue"></v-ons-input> {{urlValue}}<br>
        <v-ons-input type="email" v-model="emailValue"></v-ons-input> {{emailValue}}<br>
        <v-ons-input type="password" v-model="passwordValue"></v-ons-input> {{passwordValue}}<br>
        <v-ons-input type="datetime" v-model="datetimeValue"></v-ons-input> {{datetimeValue}}<br>
        <v-ons-input type="date" v-model="dateValue"></v-ons-input> {{dateValue}}<br>
        <v-ons-input type="month" v-model="monthValue"></v-ons-input> {{monthValue}}<br>
        <v-ons-input type="week" v-model="weekValue"></v-ons-input> {{weekValue}}<br>
        <v-ons-input type="time" v-model="timeValue"></v-ons-input> {{timeValue}}<br>
        <v-ons-input type="datetime-local" v-model="datetimeLocalValue"></v-ons-input> {{datetimeLocalValue}}<br>
        <v-ons-input type="number" v-model="numberValue"></v-ons-input> {{numberValue}}<br>
        <v-ons-input type="range" v-model="rangeValue"></v-ons-input> {{rangeValue}}<br>
        <v-ons-input type="color" v-model="colorValue"></v-ons-input> {{colorValue}}<br>
        <!-- Vue.js blocks use of v-model directive in <input type="file"> -->
        <!--<v-ons-input type="file" v-model="fileValue"></v-ons-input> {{fileValue}}<br>-->
        <v-ons-input type="submit" v-model="submitValue"></v-ons-input> {{submitValue}}<br>
        <v-ons-input type="image" v-model="imageValue"></v-ons-input> {{imageValue}}<br>
        <v-ons-input type="reset" v-model="resetValue"></v-ons-input> {{resetValue}}<br>
        <v-ons-input type="button" v-model="buttonValue"></v-ons-input> {{buttonValue}}<br>
      </div>
    `,
    data: {
      hiddenValue: null,
      textValue: null,
      searchValue: null,
      telValue: null,
      urlValue: null,
      emailValue: null,
      passwordValue: null,
      datetimeValue: null,
      dateValue: null,
      monthValue: null,
      weekValue: null,
      timeValue: null,
      datetimeLocalValue: null,
      numberValue: null,
      rangeValue: null,
      colorValue: '#ffffff', // Suppress warning from <input type="color">
      fileValue: null,
      submitValue: null,
      imageValue: null,
      resetValue: null,
      buttonValue: null,
    },
    methods: {
      onClick() {
        alert('clicked');
      }
    }
  });
});
