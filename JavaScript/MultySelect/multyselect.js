/**
 * @author Anatoly Danilov, danilovonline@gmail.com, http://danilovonine.ru
 * 
 * @param {object HTMLSelectElement} my_select
 * @param {object HTMLSelectElement} result_select
 */
function multySelect(my_select, result_select) {
  var _this = this;
  this.my_select = my_select;
  this.result_select = result_select;
  
  init();
  
  function init() {
  	_this.my_select.ondblclick = function() {
  		_this.sendFromMyToResult();
  	}
  	
    _this.result_select.ondblclick = function() {
      _this.sendFromResultToMy();
    }
  	
  }
  
  this.sendAllFromMyToResult = function () {
    for (var i = 0; i < _this.my_select.options.length; i++) {
      _this.my_select.options[ i ].selected = true;
    }
    _this.sendFromMyToResult();	
  }
  
  this.sendAllFromResultToMy = function () {
    for (var i = 0; i < _this.result_select.options.length; i++) {
      _this.result_select.options[ i ].selected = true;
    }
    _this.sendFromResultToMy(); 
  }
  
  
  this.sendFromMyToResult = function () {
    for (var i = 0; i < _this.result_select.options.length; i++) {
    	_this.result_select.options[ i ].selected = false;
    }
  	
    for (var i = _this.my_select.options.length -1; i >= 0; i--) {
      if (_this.my_select.options[ i ].selected) {
      	  try {
           _this.result_select.add(_this.my_select.options[ i ], null); // standards compliant; doesn't work in IE
          } catch(ex) {
            var clone=_this.my_select.options[ i ].cloneNode(true);
            _this.my_select.options[ i ]=null;
            _this.result_select.appendChild(clone); // last option
            clone.selected = 'true';
          }
      }
      if (_this.my_select.options[ i ]) {
        _this.my_select.options[ i ].selected = false;
      }
    }
    _this.result_select.focus();
  }
  
  this.sendFromResultToMy = function() {
    for (var i = 0; i < _this.my_select.options.length; i++) {
      _this.my_select.options[ i ].selected = false;
    }
  	
    for (var i = _this.result_select.options.length - 1; i >= 0 ; i--) {    	
      if (_this.result_select.options[ i ].selected) {
          try {
           _this.my_select.add(_this.result_select.options[ i ], null); // standards compliant; doesn't work in IE
          } catch(ex) {
            var clone=_this.result_select.options[ i ].cloneNode(true);
            _this.result_select.options[ i ]=null;
            _this.my_select.appendChild(clone); // last option
            clone.selected = 'true';
          }
      }

      if (_this.result_select.options[ i ]) {
        _this.result_select.options[ i ].selected = false;
      }      

      
      j = _this.my_select.options.length-1;
      while(j > 0 && _this.my_select.options[j].value <  _this.my_select.options[j-1].value) {
        interchange(_this.my_select, j, j-1);
        _this.my_select.options[ j].selected = false; /*TODO: fix error (send from "result" to "my" group options with last from "my" - "my" no selected)*/
        
        if (j > 0) {
          _this.my_select.options[ j - 1].selected = true;
        }
        j --;
      }
    }
    _this.my_select.focus();
  }
  
  
  this.upOptionResult = function() {
  	upSelectedOption(_this.result_select);
  	_this.result_select.focus();
  }
  
  this.downOptionResult = function() {
    downSelectedOption(_this.result_select);
    _this.result_select.focus();
  }
  

  function upSelectedOption(s) {
    for (var i = 0; i < s.options.length; i++) {
      if (s.options[ i ].selected) {
      	if (i == 0) {
      		break;
      	}
        interchange(s, i, i-1);
        s.options[ i ].selected = false;
        s.options[ i-1 ].selected = true;
      }
    }
  }
  
  function downSelectedOption(s) {
    for (var i = s.options.length-1; i >= 0 ; i--) {
      if (s.options[ i ].selected) {
        if (i == s.options.length-1) {
          break;
        }
        interchange(s, i, i+1);
        s.options[ i ].selected = false;
        s.options[ i+1 ].selected = true;
      }
    }
  }
  
  
  function interchange(s, i1, i2) {
    var clone1 = s.options[i1].cloneNode(true);
    var clone2 = s.options[i2].cloneNode(true);
    
  	s.options[i1] = clone2;
    s.options[i2] = clone1;
  }
}