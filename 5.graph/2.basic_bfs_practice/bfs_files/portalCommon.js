/**
 * 모든 페이지에 include 되는 기타 공통 function 들.
 * @author uchung
 * @title 기타 공통 JS function
 */
 
/**
 * 현 contextPath
 */
//var contextPath = document.location.pathname.substring(0, document.location.pathname.indexOf('/', 1));
//alert(contextPath);
var menusByDepth = [];
var menusByKey = {};
var menusById = {};
var menusByUrl = {};
var topLevelMenus = {};

var _openPageAddedParameters  = {};

/**
 * url 이 그냥 path 이면 현 contextPath 를 앞에 추가하고, full url (예 : http 로 시작하는 것)
 *   이면 그냥 return 함. 
 * @param {String} url contextPath 추가할 url
 * @return {String} url 에 contextPath 를 앞에 추가한 결과
 */
function addContextPath(url) {
  if (url == null || url.length == 0) return null;
  return url.charAt(0) == '/' ? contextPath + url : url;
}

/**
 * obj 의 absolute position 을 return 함.
 * absolute position 이라 함은 현 browser body 기준의 position
 * @param {DOMElement} obj absolute position 을 찾을 DOM element
 * @return {Object} absolute position. left 와 top field 가 있음
 */
function absolutePosition(obj) {
  var node = obj;
  var body = document.body;
  var x = 0;
  var y = 0;
  while (node != body) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.parentNode;
  }
  return {left:x, top:y};
}

/**
 * x 가 string 이면 number 로 변환 해 줌.
 * @param {Object/String} x 가 String 이면 number (점이 있느냐에 따라 int 혹은 float) 로 변환함.
 * @return {Object} string 이 Number 이었으면 String 에 해당되는 Number
 */
function convertString(x) {
  if (typeof x == "string") {
    if ("true"==x) return true;
    if ("false"==x) return false;
    // check to make sure x is a number
    var integerPattern=/^\d+$/;
    var floatPattern=/^\d+\.\d+$/;
    if (integerPattern.test(x)) {
      return parseInt(x);
    } else if (floatPattern.test(x)) {
      return parseFloat(x);
    } else {
      return x;
    }
  } else return x;
} 

/**
 * s 를 Map 으로 변경함. s 의 형식은 key=value&key1=value1&key2=value2... 임.
 * 주로 location.search 를 Map (JS object) 로 변환 할 때 사용함.
 * @param {String} s 변환할 search argument
 * @param {Object} out 만약 새로운 object 가 아닌 기존 object 에 key/value 들을 넣고 싶을 때...
 * @param {Boolean} autoConvert 반약 string 이 Number 이면 자동으로 Number type 으로 변경 하려면 true.
 * @return {Object} s 에 해당되는 Object (key/value)
 */
function stringToMap(s, out, autoConvert) {
  s = decodeURI(s);
  if (out == null) {
    out = {};
  }
  if (autoConvert == null) autoConvert = true;
  if (s == null || s.length==0) return out;
  if (s.charAt(0) == '?') s = s.substring(1);
  var split = s.split('&');
  for (var i = 0; i < split.length; i++) {
    var keyValue = split[i];
    var idx = keyValue.indexOf('=');
    if (idx != -1) {
      var key = keyValue.substring(0, idx);
      var value = keyValue.substring(idx+1);
      out[key] = autoConvert?convertString(value):value;
    }
  }
  return out;
}

/**
 * 메뉴관련 paramter를 해당 URL에 자동으로 붙어서 화면을 이동하는 기능
 * @param url
 * @param args
 * @param target
 */
function _openPage(url, args, target) {
  if (typeof openPage == "function") {
    if (args != null) {
      var l = [];
      for (var k in args) l.push(k +"=" + args[k]);
      if (l.length > 0) {
        var sep = url.indexOf('?')==-1?'?':'&';
        url += sep + l.join("&");
      }
    }
    openPage(url, null, target);
  } else {
    var menuId = args==null?null:args._menuId;
    url = addContextPath(addTemplateParameter(url, menuId));
    
    url += "&_menuF=" + (args==null?null:args._menuF);
    if (target == null) {
      document.location.href = url;
    } else {
      window.open(url, target);
    }
  }
}
/**
 * 해당 기능은 parameter로 받은 URL에 대한 parameter를 cookie로 담아서 뒤로 가기를했을경우 다시 
 * 조회한 paramter를 계속 유지 시키기 위함이다.
 * @param url
 */
function onGoToMenu(url) {
	setCookie("search_arguments_data", "");
	setCookie("search_arguments_path", "");
}
/**
 * 위의 onGoToMenu(url)과 같은 기능이지만 2단계 메뉴에 링크가 걸릴경우에 사용한다.
 * @param target
 */
function onGoToMenuBySpan(target) {
	setCookie("search_arguments_data", "");
	setCookie("search_arguments_path", "");
	var url = $(target).attr("href");
	if(url.length  >= 6 && url.substring(0, 5) == "http:"){
		window.open(url , "_blank");
	}else{
		location.href=url;
	}
}

function goToMenu(menu) {
  if (menu == null) return;
  menu = typeof menu == "number" ? menus[menu] : menu;
  var url = menu.url;
  if (url == null) {
    var menuWithUrl = findMenuWithUrl(menu);
    if (menuWithUrl != null) {
      menu.url = menuWithUrl.url;
      url = menu.url;
      menu.urlMenuId = menuWithUrl.id;
    }
  }
  
  if (url != null) {
  	if (onGoToMenu(url) != false) {
      _openPage(url, {_menuId:menu.urlMenuId, _menuF:true }, menu.target);
  	}
  } else {
    alert("No url defined for " + menu.labels[language] + "," + menu.id);
  }
}
function goToMenuKey(key) {
  goToMenu(menusByKey[key]);
}

function addTemplateParameter(url, menuId) {
  if (url == null) return null;
  if (url.indexOf("_template=")==-1) {
    var searchMap = stringToMap(document.location.search, null, false);
    var idx = url.indexOf('?');
    var sep = idx == -1 ? '?' : '&';
    return url + sep + "_menuId=" + menuId; 
  } else {
    return url;
  }
}
function tabGroupCheck(url , tabGroupKey){
	var returnURL = url;
	if(tabGroupKey !=null && tabGroupKey !='' && tabGroupKey !='null'){
		var idx = url.indexOf('?');
	    var sep = idx == -1 ? '?' : '&';
	    returnURL = url + sep + "_tabGroup=" + tabGroupKey; 
	}
	return returnURL;
}
function isInTopMenu(menu) {
  var parent = menu;
  while (parent != null && parent.depth > 1) {
    parent = parent.parent;
  }
  if (parent != null) {
    var l = parent.name.toLowerCase();
    for (var i = 0; i < firstMenus.length; i++) {
    	if (firstMenus[i] == l) {
    		return true;
    	}
    }
  }
  return false;
}

function makeLink(menu, isSelected) {
  var url = "#";
  if (menu != null) { 
    url = menu.url;
    var menuId = menu.id;
    if (url == null) {
      var menuWithUrl = findMenuWithUrl(menu);
      if (menuWithUrl != null) {
        menu.url = menuWithUrl.url;
        url = menu.url;
        menuId = menuWithUrl.id;
      }
    }
    url = addContextPath(addTemplateParameter(url, menuId)) + "&_menuF=true";    
  }
  var onclick = "";
  if (menu.onclick != null) {
  	onclick = menu.onclick.replace('"', '&quote;');
  }
  
  if(url.length  >= 6 && url.substring(0, 5) == "http:"){
	  return "<a href='" + url + "' target='_blank'" + 
	    (isSelected ? "class='on'" : "") + " onclick=\"var _r =  onGoToMenu(this.href); if (_r == false) return false;" + onclick +
	    "\">"+ menu.labels[language] + "</a>";
  }else{
	  return "<a href='" + url + "'" + 
	    (menu.target == null ? "" : " target='" + menu.target + "' ")+
	    (isSelected ? "class='on'" : "") + " onclick=\"var _r =  onGoToMenu(this.href); if (_r == false) return false;" + onclick +
	    "\">"+ menu.labels[language] + "</a>";
  }
  
}


function makeLinkBySpan(menu, isSelect , classText , viewText) {
	  var url = "#";
	  var label = menu.labels[language];
	  
	  if(viewText != null && typeof(viewText) != 'undefined'){
		  label = viewText;
	  }
	  if (menu != null) { 
	    url = menu.url;
	    var menuId = menu.id;
	    if (url == null) {
	      var menuWithUrl = findMenuWithUrl(menu);
	      if (menuWithUrl != null) {
	        menu.url = menuWithUrl.url;
	        url = menu.url;
	        menuId = menuWithUrl.id;
	      }
	    }
	    url = addContextPath(addTemplateParameter(url, menuId)) + "&_menuF=true";    
	  }
//	  var styleStr = "cursor:pointer;padding-top:4px;padding-bottom:4px";
//	  if(isSelected){
//		  styleStr = styleStr + ";" + "color:#046fb4;font-weight:bold";
//	  }else{
//		  styleStr = styleStr + ";" + "color:#454545;font-weight:bold";
//	  }
	  
//	  return "<span style='"+styleStr+"'"+(isSelected ? "class='on'" : "")+" href='" + url + "'" + 
//	    (menu.target == null ? "" : " target='" + menu.target + "' ")+
//	    (isSelected ? "class='on'" : "") + " onclick='return onGoToMenuBySpan(this)' " +
//	    ">"+ label + "</span>";
	  var linkStr = "";
	  if(url.length  >= 6 && url.substring(0, 5) == "http:"){
		  linkStr = "<a class='"+classText+"' href='" + url + "' target='_blank'>"+ label +"</a>";
	  }else{
		  linkStr = "<a class='"+classText+"' href='" + url + "'" + (menu.target == null ? "" : " target='" + menu.target + "' ")+ ">"+ label +"</a>";
	  }
	  if(classText == 'dir'){
		  linkStr = linkStr + "<img src='"+contextPath+"/images/common/btn_snb_"+(isSelect?"collaspe" : "expand")+".png' onclick='changeMenuModeByImg(\""+menu.id+"\");' "+ (isSelect ? "class='on'" : "") +"/>"; 
	  }
	  return linkStr;
	  
	}

function makeLinkWithoutChild(menu,idx) {
  var url = "#";
  if (menu != null) { 
    url = menu.url;
    var menuId = menu.id;
    if (url == null) {
      var menuWithUrl = findMenuWithUrl(menu);
      if (menuWithUrl != null) {
        menu.url = menuWithUrl.url;
        url = menu.url;
        menuId = menuWithUrl.id;
      }
    }
    url = addContextPath(addTemplateParameter(url, menuId)) + "&_menuF=true";    
  }
  
  return "<a href='" + url + "'" + (menu.target == null ? "" : " target='" + menu.target + "'") + " onclick='selectLeftMenu(" + idx + ");'>"+ menu.labels[language] + "</a>"
}


function findMenuWithUrl(menu) {

  if (menu == null) return null;
  var url = menu.url;
  if (url != null && url.length > 0) {
    return menu;
  }
  var children = menu.children;
  if (children != null) {
    for (var i = 0,len=children.length; i < len; i++) {
      var child = children[i];
      if (menu == child) continue;
      var childMenu = findMenuWithUrl(child);
      if (childMenu != null && childMenu.url != null && childMenu.url.length > 0) {
        return childMenu;
      }
    }
  }
  return null;
}

function updateUrls(menus) {
  for (var i = 0, len=menus.length; i < len; i++) {
    var m = menus[i];
    if ((m.url == null || m.url.length == 0) && m.depth > 1) {
      try {
        var menuWithUrl = findMenuWithUrl(m);
        if (menuWithUrl != null) {
          m.url = menuWithUrl.url;
          m.urlMenuId = menuWithUrl.id;
        }
      } catch (e) {
        msgBox("", m.labels[language] + " : " + e);
      }
    }
  }
}

function indexMenus(menus) {
  for (var i = 0, len=menus.length; i < len; i++) {
    var m = menus[i];
    menusById[m.id] = m;
    m.urlMenuId = m.id;
    // 타 언어 label 이 없는 경우 undefined 안나오게 하려고...
    if (m.name == null) {
      m.name = {};
    }
    if (m.labels[language] == null) {
      m.labels[language] = m.label;
    }
  }
  for (var i = 0, len=menus.length; i < len; i++) {
    var m = menus[i];
    m.i = i;
    if (m.parentId != null) {
      var parent = menusById[m.parentId];
      if (parent != null) {
        m.parent = parent;
        if (parent.children == null) {
          parent.children = [];
        }
        parent.children.push(m);
      }
      delete m.parentId;
    }
    
    if (m.depth == 1) {
      topLevelMenus[m.id] = m;
      
    }
  }
  for (var i = 0, len=menus.length; i < len; i++) {
    var m = menus[i];
    menusByKey[m.key] = m;

    var l = menusByDepth[m.depth];
    if (l == null) {
      menusByDepth[m.depth] = l = [];
    }
    l.push(m);
  }  
  
  
}
 
function trim(str) {
  return str==null?null:str.replace(/^\s*|\s*$/g,"");
}

function showTab(me, selectedCls, unselectedCls, bodies, inline) {
  function showMe(c) {
    c.style.display = (inline == null ? (c.tagName!="DIV") : inline) ? "inline" : "block";
  }
  var tabLabels = me.parentNode.childNodes;
  var selectedIdx = -1;
  var j = 0;
  for (var i = 0; i < tabLabels.length; i++) {
    if (tabLabels[i].tagName != "SPAN" && tabLabels[i].tagName != "DIV") continue;
    if (tabLabels[i].ignoreMe == "true") continue;
    if (me == tabLabels[i]) {
      selectedIdx = j;
      me.className = selectedCls;
    } else {
      tabLabels[i].className = unselectedCls;
    }
    j++;
  }
  var tabBodies = me.parentNode.nextSibling.childNodes;
  for (var i = 0; i < tabBodies.length; i++) {
    if (i == selectedIdx) {
      showMe(tabBodies[i]);
    } else {
      tabBodies[i].style.display = "none";
    }
  }
}

function _changeLanguage(newLanguage) {
  jQuery.ajax({
    url : contextPath + "/portal/changeLanguage.do?lang="+newLanguage,
    method : 'GET',
    data:{language:newLanguage},
    error : function () {alert("언어 변경 실패.");},
    success: function () {
      location.reload();
    },
    scope : this
  });
}

function showDialog(path, width, height, title) {
  if (path.substring(0, 5) != "http:") {
    path = contextPath + path;
  }
  showModelessDialog(path, null, 'dialogWidth:' + width + 'px;dialogHeight:' + height + "px");  
  return false;
}
function showDialog2(contents, width, height, title) {
  
  
  var win = showModelessDialog("empty.html", null, 'dialogWidth:' + width + 'px;dialogHeight:' + height + "px");
  win.document.open();
  win.document.write(contents);
  win.document.close();
  
  return false;
}
function showPopup(path, width, height, title, target, options) {
  var addPadding = false;
  if (path.substring(0, 5) != "http:") {
    path = contextPath + path;
    addPadding = true;
  }
  if (addPadding) {
    window.popupCustomStyles = "padding:10 10 10 10 !important;";
  }
  var windowOptions = {width:width, height:height,
    top:((screen.height - height) / 2)|0, left:((screen.width - width) / 2)|0, menubar:"no",
    location:"no",resizable:"yes",status:"no",scrollbars:"yes"
  }
  if (options != null) {
    for (var k in options) windowOptions[k] = options[k];
  }
  var optionsList = [];
  for (var k in windowOptions) optionsList.push(k + "=" + windowOptions[k]);
  var win = window.open(path, target==null?"_blank":target, optionsList.join());
  if (addPadding) {
    // Popup 에는 무조건 여백을 조금 주게.
    if (win.document.body != null) { // 벌써 loading 완료 된 경우
      win.document.body.style.padding = "10 10 10 10 !important;";
    } else {
      win.attachEvent("onload", function () { // loading 이 조금 느린 경우
        win.document.body.style.padding = "10 10 10 10 !important;";
      });
    }
  }
  return false;
}

 
var beforeClass ="";
var selectedMenu ;
function onMenuMouseOver(c) {

	var temp = c;
  if (typeof c == "string") {
    c = document.getElementById(c);
  } 
  beforeClass = c.className;
  c.className=  "on";
  selectedMenu = c;
}

function onMenuMouseOut() {

  if(selectedMenu != null){  
    for(var i = 0 ; i < firstMenus.length ; i++){
        c = document.getElementById(firstMenus[i]);
        if (selectedMenu != c) {
          childElements(document.getElementById(firstMenus[i]), "A")[0].className = '';
        } else {
          showMenu(firstMenus[i], false);
        }  //원래 선택되어있던  메뉴의 하위메뉴를 보여준다.
    }
  }
  
  if(_selectedTopMenu){
    childElements(document.getElementById(selectedTopMenu.name.toLowerCase()), "A")[0].className = 'on';
  }
}
function onMenuMouseMenuOut(c) {
	var temp;
  for(var i = 0 ; i < firstMenus.length ; i++){
      if(c = firstMenus[i]) selectedMenu = c;
  }
  
  for (var i = 0 ; i < firstMenus.length ; i++){  
    if (temp != firstMenus[i]  ){
      c = document.getElementById(firstMenus[i]);
      var a = childElements(document.getElementById(firstMenus[i]), "A")[0];
      if (selectedMenu != c){
        //a.className = "";
      }
    }
  }  
}

function onTopMenuMouseOut(c){
	if(_selectedTopMenu != null){
		if(_selectedTopMenu.id != _selectedTopMenuId ){
			var a = childElements(document.getElementById(c), "A")[0];  
			a.className = "";
		}
	}else{
		var a = childElements(document.getElementById(c), "A")[0];  
		a.className = "";
	}
	document.getElementById("topMenus").style.display = "none";
}

function childElements(obj, tagName) {
  var childNodes = obj.childNodes;
  var result = [];
  for (var i = 0; i < childNodes.length; i++) {
    if (childNodes[i].tagName == tagName) {
      result.push(childNodes[i]);
    }
  }
  return result;
}

function hasCSSClass(obj, clsName) {
  var clsNames = obj.className.split(" ");
  for (var i = 0; i < clsNames.length; i++) {
    if (clsNames[i] == clsName) {
      return true;
    }
  }
  return false;
}

function addCSSClass(obj, clsName) {
  if (!hasCSSClass(obj, clsName)) {
    obj.className += " " + clsName;
  }
}

function setCookie(c_name,value,path,expiredays,expirehours)
{
  var exdate=new Date();
  if (expiredays != null) {
    exdate.setDate(exdate.getDate()+expiredays);
  }
  if (expirehours != null) {
    exdate.setHour(exdate.getHour() + expirehours);
  }
  document.cookie=c_name+ "=" +escape(value) +
    ((expiredays==null&&expirehours==null) ? "" : ";expires="+exdate.toGMTString()) +
    (path==null?"" : (";path=" + path + ";"));
}

function getCookie( name ) {  
   var nameOfCookie = name + "=";  
   var x = 0;  
   while ( x <= document.cookie.length )  
   {  
       var y = (x+nameOfCookie.length);  
       if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
           if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )  
               endOfCookie = document.cookie.length;  
           return unescape( document.cookie.substring( y, endOfCookie ) );  
       }  
       x = document.cookie.indexOf( " ", x ) + 1;  
       if ( x == 0 )  
           break;  
   }  
   return "";  
}  

function openPageUrl(url, params, blockAdded, doNotAddContextPath) {
  if (url.charAt(0) == '/' && doNotAddContextPath != true)
    url = contextPath + url;
 
  if (blockAdded)
    return url;
  for (var k in _openPageAddedParameters) {
    var v = _openPageAddedParameters[k]
    if (params != null && params[k] != null)
      v = params[k];
    if (url.indexOf(k + "=") == -1) {
      var p = k + "=" + v;
      var sep = url.indexOf('?') == -1 ? '?' : '&';
      url += sep + p;
    }
  }
  return url;
}

function openPage(url){
  document.location.href = openPageUrl(url);
}
function setFormAction(form, url, doNotAddContextPath) {
	  form.action = openPageUrl(url, null, null, doNotAddContextPath);
	}

function addOpenPageParameter(key, value) {
	  _openPageAddedParameters[key] = value;
	}


//URL에 메뉴ID 및 LAYOUT 구분자를 URL에 추가한다.
function getActionURL(frmObj,url,layout) {
	var $obj 	= $(frmObj);
	var _layout = $('input[name='+layout+']',$obj).val();
	var _menuId = $('input[name=_menuId]',$obj).val();
	
	//remove form element
	$('input[name='+layout+']',$obj).remove();
	$('input[name=_menuId]',$obj).remove();
	
	if(url.indexOf('?')!=-1) {
		url +='&'+layout+'='+_layout
			 +'&_menuId='+_menuId;
	} else {
		url +='?'+layout+'='+_layout
			 +'&_menuId='+_menuId;
	}
	
	return url;
}

function decodeHTMLEntities(str) {
	var txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}