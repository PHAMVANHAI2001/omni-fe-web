import { write } from '@popperjs/core';
import Vue from 'vue';
var numeral = require("numeral");

Vue.filter('vndformat', function (value) {
    if (!value) return 0+'đ';
    value = numberWithCommas(value.toString());
    return value + ' đ';
});

Vue.filter('hideprice', function (value) {
    if (!value || value.length < 4) return 0+'đ';
    const stringArray = [...value]; // convert to array/
    stringArray[1]='●';
    stringArray[2]= '●';
    return stringArray.join('');
});

Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });

Vue.filter("formatPhone", function (value) {
    value = formatPhone(value);
    return value; 
  });

function formatPhone(x) {
   x = x.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
 return !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Vue.filter('truncate', function (value, limit) {
    if (value && (value.length > limit)) {
        value = value.substring(0, (limit - 3)) + '...';
    }

    return value
})

Vue.filter('two_digits', (value) => {
    if (value < 0) {
      return '00';
    }
    if (value.toString().length <= 1) {
      return `0${value}`;
    }
    return value;
  });


