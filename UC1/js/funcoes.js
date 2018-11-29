function AddEvent(el, ev, fn) {
  if(el.addEventListener) el.addEventListener(ev, fn, false);
  else el.attachEvent('on'+ev, function(){ //IE8-
   // set the this pointer same as addEventListener when fn is called
   return(fn.call(el, window.event));
  });
}
function popup(url,params) {
  if(typeof params=='undefined') params={};
  if(typeof params['win_name']=='undefined') params['win_name']='jan_pop';
  if(typeof params['w']=='undefined') params['w']=810;
  if(typeof params['h']=='undefined') params['h']=screen.height-55;
  if(typeof params['scroll']=='undefined') params['scroll']='yes';
  if(typeof params['resizable']=='undefined') params['resizable']='yes';
  params['win']=window.open(url,params['win_name'],'scrollbars='+params['scroll']
   +',resizable='+params['resizable']+',toolbar=no,location=no,directories=no,'
   +'menubar=no,status=yes,top=0,left='
   +((screen.width-params['w'])/2)+',width='+params['w']+',height='+params['h']);
  params['win'].focus();
}
function flash(arquivo,flash_vars,largura,altura,bgcolor) {
  if(typeof flash_vars=='undefined') flash_vars='';
  if(typeof largura=='undefined') largura='100%';
  if(typeof altura=='undefined') altura='100%';
  if(typeof bgcolor=='undefined') bgcolor='#ffffff';
  return('<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+largura+'" height="'+altura+'" align="top">\n'
   +'  <param name="movie" value="'+arquivo+'">\n'
   +'  <param name="quality" value="high">\n'
   +'  <param name="allowScriptAccess" value="sameDomain">\n'
   +'  <param name="bgcolor" value="'+bgcolor+'">\n'
   +'  <param name="wmode" value="transparent">\n'
   +'  <param name="scale" value="showall">\n'
   +(flash_vars?'  <param name="FlashVars" value="'+flash_vars+'">\n':'')
   +'  <embed src="'+arquivo+(flash_vars?'" FlashVars="'+flash_vars:'')+'" quality="high" scale="showall" bgcolor="'+bgcolor+'" wmode="transparent" allowScriptAccess="sameDomain" width="'+largura+'" height="'+altura+'" name="flash" align="top" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_br">\n'
   +'<\/object>\n');
}
function get_window_inner_size() {
  var vet={'w':0,'h':0};
  if(typeof window.innerWidth!='undefined') {
    vet['w'] = window.innerWidth;
    vet['h'] = window.innerHeight;
  } else if(typeof document.documentElement!='undefined'
   && typeof document.documentElement.clientWidth!='undefined') {
    vet['w'] = document.documentElement.clientWidth;
    vet['h'] = document.documentElement.clientHeight;
  } else {
    vet['w'] = document.body.clientWidth;
    vet['h'] = document.body.clientHeight;
  }
  return vet;
}
function getUrlVars() {
  var i,vars={},hash,hashes,str=window.location.href;
  var ini=str.indexOf('?'),fim=str.indexOf('#');

  if(ini>=0) {
    hashes=str.substring(ini+1,(fim>0?fim:str.length)).split('&');
    for(i=0; i<hashes.length; i++) {
      hash=hashes[i].split('=');
      if('[]'!=hash[0].substring(hash[0].length-2)) vars[hash[0]]=hash[1];
      else {
        hash[0]=hash[0].substring(0,hash[0].length-2);
        if(typeof vars[hash[0]]=='undefined') vars[hash[0]]=new Array();
        vars[hash[0]].push(hash[1]);
      }
    }
  }
  return vars;
}
function load_css_file(nome_arq) {
  var obj=document.createElement('link');
  obj.type='text/css';
  obj.rel='stylesheet';
  obj.href=nome_arq;
  document.getElementsByTagName('head')[0].appendChild(obj);
}
function load_js_file(nome_arq,async,cb) {
  if(!async) {
    jQuery.ajax({async:false,cache:true,type:'GET',url:nome_arq,success:cb,dataType:'script'});
  } else {
    var obj=document.createElement('script');
    obj.type='text/javascript';
    if(typeof cb=='function') {
      if(typeof obj.onreadystatechange=='undefined') obj.onload=cb; // browsers
      else obj.onreadystatechange=function() { // ie
        if(/loaded|complete/.test(obj.readyState)) {
          obj.onreadystatechange=null;
          cb();
        }
      };
    }
    obj.src=nome_arq;
    document.getElementsByTagName('head')[0].appendChild(obj);
  }
}

var b64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function base64_encode(data) {
  var o1, o2, o3, h1, h2, h3, h4, bits, i=0, ac=0, tmp_arr=[], enc='';
  if(!data) return data;
  do { // pack three octets into four hexets
    o1=data.charCodeAt(i++);
    o2=data.charCodeAt(i++);
    o3=data.charCodeAt(i++);
    bits=o1<<16|o2<<8|o3;
    h1=bits>>18&0x3f;
    h2=bits>>12&0x3f;
    h3=bits>>6&0x3f;
    h4=bits&0x3f;
    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);
  } while(i<data.length);
  enc=tmp_arr.join('');
  var r=data.length % 3;
  return(r?enc.slice(0,r-3):enc)+'==='.slice(r||3);
}
function base64_decode(data) {
  var o1, o2, o3, h1, h2, h3, h4, bits, i=0, ac=0, tmp_arr=[], dec='';
  if(!data) return data;
  data+='';
  do { // unpack four hexets into three octets using index points in b64
    h1=b64.indexOf(data.charAt(i++));
    h2=b64.indexOf(data.charAt(i++));
    h3=b64.indexOf(data.charAt(i++));
    h4=b64.indexOf(data.charAt(i++));
    bits=h1<<18|h2<<12|h3<<6|h4;
    o1=bits>>16&0xff;
    o2=bits>>8&0xff;
    o3=bits&0xff;
    if(h3==64) tmp_arr[ac++]=String.fromCharCode(o1);
    else if(h4==64) tmp_arr[ac++]=String.fromCharCode(o1,o2);
    else tmp_arr[ac++] = String.fromCharCode(o1,o2,o3);
  } while(i<data.length);
  dec=tmp_arr.join('');
  return dec;
}

/** cbpFWTabs.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops */
(function(window) {
  'use strict';

  function extend(a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key))
        a[key]=b[key];
    }
    return a;
  }
  function CBPFWTabs(el, options) {
    this.el = el;
    this.options = extend({},this.options);
      extend(this.options, options);
      this._init();
  }
  CBPFWTabs.prototype.options = { start:0 };
  CBPFWTabs.prototype._init = function() {
   this.tabs = this.el.querySelectorAll('nav > ul > li');
   this.items = this.el.querySelectorAll('.content-tabs > section');
   this.current = -1; // current index
   this._show(); // show current content item
   this._initEvents();
  };
  CBPFWTabs.prototype._initEvents = function() {
   var x, self=this;
   for(x=this.tabs.length-1; x>=0; x--) {
     AddEvent(self.tabs[x],'click',function(ev) {
      if(ev.preventDefault) ev.preventDefault();
      else ev.returnValue = false; // IE8-
      for(var t=self.tabs.length-1; t>=0; t--) {
        if(self.tabs[t]==this) {
          self._show(t);
          break;
        }
      }
     });
   }
  };
  CBPFWTabs.prototype._show = function(idx) {
   if(this.current >= 0)
     this.tabs[this.current].className = this.items[this.current].className='';
   this.current = typeof idx!='undefined'? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
   var oNav=this.tabs[this.current].parentNode.parentNode;
   var vert=oNav.parentNode.className.lastIndexOf('vertical')>0; // <section class="tabs vertical">
   if(vert) oNav.style.minHeight='0px';
   this.tabs[this.current].className='tabCurrent';
   this.items[this.current].className='contentCurrent';
   if(vert) oNav.style.minHeight=$(oNav.parentNode).height()+'px';
  };
  window.CBPFWTabs = CBPFWTabs; // add to global namespace
})(window);
