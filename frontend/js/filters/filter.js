// JavaScript Document
myApp.filter('myFilter', function () {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function (input, optional1, optional2) {

    var output;

    // Do filter work here
    return output;
  };

});
myApp.filter('checkimage', function () {
  return function (input) {
    console.log(input);
    return _.split(input, '.')[1];
  }
});
myApp.filter('isReadDefault', function () {
  return function (input) {
    console.log("---->",input);
    return input;
  }
});
myApp.filter('uploadpath', function () {
  return function (input, width, height, style) {
    console.log(input);
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});

myApp.filter('indianCurrency', function () {
  return function (getNumber) {
    if (!isNaN(getNumber)) {
      var numberArr = getNumber.toString().split('.');
      var lastThreeDigits = numberArr[0].substring(numberArr[0].length - 3);
      var otherDigits = numberArr[0].substring(0, numberArr[0].length - 3);
      if (otherDigits != '') {
        lastThreeDigits = ',' + lastThreeDigits;
      }
      var finalNumber = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
      if (numberArr.length > 1) {
        var getRoundedDecimal = parseInt(numberArr[1].substring(0, 2)) + 1;
        finalNumber += "." + getRoundedDecimal;
      }
      // return '₹' + finalNumber;
      return finalNumber;
    }
  }
});

myApp.filter('serverimage', function () {
  return function (image) {
    if (image) {
      if (image.indexOf('https://') == -1) {
        return imgpath + "?file=" + image;
      } else {
        return image;
      }
    } else {
      return "/img/noImage.png";
    }

  }
});