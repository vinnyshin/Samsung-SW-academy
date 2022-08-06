//*************************************************************************************
//******************** Constant 변수들, 버튼 및 메시지 관련 메소드 *************************
//*************************************************************************************
var BUTTON_DESIGNS = {
  search:'<a href="#" class="btn_srch"><span>' + msg('sdp.common.label.search') + '</span></a>',
  confirm:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.confirm') + '</span></a>',
  save:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.save') + '</span></a>',
  register: '<a href="#" class="btn_page"><span>' + msg('sdp.common.label.register') + '</span></a>',
  cancel:'<a href="#" class="btn_page_gr"><span>' + msg('sdp.common.label.cancel') + '</span></a>',
  close:'<a href="#" class="btn_page_gr"><span>' + msg('sdp.common.label.close') + '</span></a>',
  add:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.add') + '</span></a>',
  select:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.selectButton') + '</span></a>',
  "delete":'<a href="#" class="btn_page_gr"><span>' + msg('sdp.common.label.delete') + '</span></a>',
  edit:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.edit') + '</span></a>',  
  list:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.list') + '</span></a>',
  reset:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.reset') + '</span></a>',
  print:'<a href="#" class="btn_page"><span>' + msg('sdp.common.label.print') + '</span></a>',  
  formDelete:'<a href="#" class="btn_page_gr"><span>' + msg('sdp.common.label.delete') + '</span></a>',
  listinline:'<a href="#" class="btn_list_inline"><span></span></a>',  
  listAdd:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.add') + '</span></a>',
  listDelete:'<a href="#" class="btn_list_gr"><span>' + msg('sdp.common.label.delete') + '</span></a>',
  listCancel:'<a href="#" class="btn_list_gr"><span>' + msg('sdp.common.label.cancel') + '</span></a>',
  listClose:'<a href="#" class="btn_list_gr"><span>' + msg('sdp.common.label.close') + '</span></a>',
  listEdit:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.edit') + '</span></a>',
  listConfirm:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.confirm') + '</span></a>',
  listRegister:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.register') + '</span></a>',
  listSave:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.save') + '</span></a>',
  listMail:'<a href="#" class="btn_list"><span>' + msg('common.mail') + '</span></a>',
  listPrint:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.print') + '</span></a>',
  listList:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.list') + '</span></a>',
  listDownload:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.download') + '</span></a>',
  listUpload:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.upload') + '</span></a>',
  listConfig:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.config') + '</span></a>',
  listHelp:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.help') + '</span></a>',
  listGuide:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.guide') + '</span></a>',  
  listExcelDownload:'<a href="#" class="btn_list_gr"><span>' + msg('sdp.common.label.excelDownload') + '</span></a>',
  listExcelUpload:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.excelUpload') + '</span></a>',
  fileAttachment:'<span class="btn_list_sm"><a href="#"><span>' + msg('sdp.common.label.attachments') + '</span></a>',
  deleteFile:'<span class="btn_list_sm"><a href="#"><span>' + msg('sdp.common.label.delete') + '</span></a></span>',
  listCheckAdd:'<a href="#" class="btn_list"><span>' + msg('sdp.common.label.add') + '</span></a>',
  listCheckDelete:'<a href="#" class="btn_list_gr"><span>' + msg('sdp.common.label.delete') + '</span></a>'
};  
function msg(key, doNotUseKeyIfNotFound) {
	var defaultValue = typeof doNotUseKeyIfNotFound == "boolean" ? null : doNotUseKeyIfNotFound;
	if (typeof _messages === "undefined") return defaultValue==null?key:defaultValue;
	if (key == null) return _messages;    
	var out = _messages[key];
	if (out == null && doNotUseKeyIfNotFound != true) {
		return defaultValue==null?key:defaultValue;
	}
	return out;
}
$(function () {
	init();
	$('.authorization').each(processAuthorization);

	$("button[class]").each(processButtons);
	
	$("span.deleteFileAttachment a").click(function () {
		
		var attachedFileNode = $($(this).parents(".fileAttachments")[0]).find(".fileAttachmentSelector[checked]").parent();
		var fileAttachments = attachedFileNode.parents(".fileAttachments");

		attachedFileNode.remove();

		function _onFileRemove() {
			var onFileRemove = fileAttachments.attr("onfileremove");
			if (onFileRemove != null) {
				eval(onFileRemove);
			}
		}
		_onFileRemove.call(fileAttachments[0]);
	});

	$("input.toggleAttachmentCheckbox").click(function () {
		$($(this).parents(".fileAttachments")[0]).find(".fileAttachmentSelector").attr("checked", this.checked);
	});

	$("form").each(function () {
		var onsubmit = this.onsubmit;
		this.onsubmit = submitHandler;
		this.autocomplete = "off";
		if (typeof onsubmit == "function") {
			$(this).submit(function () {
				var result = onsubmit.call(this);
				if (result === false) {
					window.event.cancelBubble = true;
				}

				return result;
			});
		}
	});
	
});

function submitHandler(){
	var form = this;
	
	form.action = openPageUrl(form.action);
	
	var hiddenHTMLEditors = $("input.htmlEditorHidden");
	for (var i = 0; i < hiddenHTMLEditors.length; i++) {
		var obj = hiddenHTMLEditors[i];
		
		obj.value = $(obj).next()[0].MimeValue;
	}
}

function init(){
	var now = new Date();
	if(contextPath == undefined)
		var contextPath;
	$("input.calendar:not([readOnly]):not(:disabled)")
	.addClass("date")
	.addClass("text_calendar")
	.each(function () {
		var startOffsetYear = this.startOffsetYear == null ? -10 : parseInt(this.startOffsetYear);
		var endOffsetYear = this.endOffsetYear == null ? 3 : parseInt(this.endOffsetYear);
		$(this).datepicker({duration:"fast",dateFormat:"yy-mm-dd", yearRange: (now.getYear()+startOffsetYear) + ':' + (now.getYear()+endOffsetYear), changeYear:true});
		if (this.value.length > 0 && this.value.indexOf('-')==-1 && this.value.indexOf('/')==-1 && this.value.indexOf('.')==-1) {
			var dateValue = parseFloat(this.value);
			this.value = dateFormat(dateValue, "yyyy-MM-dd");
		}
		$(this).change(function(){
			if(!_dateValidation(this.value)){
				alert(msg('sdp.common.message.dateValid'));
				this.value="";
			}
		});
	})
	.after('<img src="'+contextPath+'/images/common/ico_date.png" onClick="$(this).prev().datepicker(\'show\')" alt="date">');

	$("div.fileAttachments").each(function () {
		var uploadPath = $(this).attr("uploadPath") == null ? "/common/fileupload.do" : $(this).attr("uploadPath");
		var readOnly = $(this).attr("readOnlyValue") === true || $(this).attr("readOnlyValue")== "true";
		var thisObj = $(this);
		var attachmentsClearInput = "";
		var downloadType  = $(this).attr("downloadType") == null ? "": $(this).attr("downloadType");
		
		thisObj.html(attachmentsClearInput +
				(readOnly?"":"<div class='attach_check'><form action='" + contextPath + uploadPath + "' enctype='multipart/form-data' method='post' class='fileupload' style='width:100%' noTemplate='true'> "+
						"<label><input type='checkbox' class='toggleAttachmentCheckbox' /></label> " +
						(downloadType == "" ? "" : ("<input type='hidden' name='downloadType' value='" + downloadType + "'>")) +
						"<input type='hidden' name='returnType' value='text/html'/>" + 
						"<input class='fileBtn' type='file' name='anyFile' value='Upload' " +
						"  onchange='if (_attachmentCheck(this)==false) return false; AIM.submit(this.form, {onComplete: _completeAttachmentCallback});this.form.submit();' style='cursor:pointer; text-align: right; -moz-opacity:0 ; filter:alpha(opacity: 0); opacity: 0; z-index: 2;position:absolute; font-size:6px !important;width:45px !important;height:15px !important; top:3px; left:20px;'>" +
						"<span class='btn_list_sm'><a href='#'>" + msg('sdp.common.label.attachments') + "</a></span>&nbsp;<span class='btn_list_sm deleteFileAttachment'><a href='#'>" + msg('sdp.common.label.delete') + "</a></span>" +
						"" +
						""+
				"</form></div>") +
				"<div id='commonFileTable"+downloadType+"' class='attach_file'><ul>" +this.innerHTML+"</ul></div>");
	});
	_attachedFile();

	$("INPUT[type=text],TEXTAREA").each(processTextFields);

}

function _dateValidation(value) {
	var check = false;
	var re = /^\d{1,4}-\d{1,2}-\d{2}$/;
	if( re.test(value)){
		var adata = value.split('-');
		var gg = parseInt(adata[2],10);
		var mm = parseInt(adata[1],10);
		var aaaa = parseInt(adata[0],10);
		var xdata = new Date(aaaa,mm-1,gg);
		if ( ( xdata.getFullYear() == aaaa ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == gg ) )
			check = true;
		else
			check = false;
	} else
		check = false;
	return check;
}

function processTextFields() {
	var thisObj = $(this);
	var newClass = "text";
	if (thisObj.hasClass("text_calendar")) {
		thisObj.removeClass("text_calendar");
		newClass = "text_calendar";
	} else if (this.tagName == "TEXTAREA") {
		newClass = "text_area";
	} else if (thisObj.hasClass("search")) {
		thisObj.removeClass("search");
		newClass = "text_search";
	}
	newClass += this.disabled ? "_disable" : (this.readOnly ? "_readonly" : "");
	if (thisObj.hasClass("full")) newClass += "_full";
	if (thisObj.hasClass("hidden")) newClass += "_hidden";
	thisObj.addClass(newClass);
}


function sdpLoading() {
	showLoading(false, contextPath+"/images/common/loading5.gif", 90, 84);
}

function showLoading(maskBody, image, width, height) {
	var docWidth =$(document).width();
	//var docHeight = document.body.clientHeight;

	//스크롤이 있는 화면이 submit 될경우 clientHeight 보다 커서 화면 일부분이 보여 져서 수정함.
	var clientHeight = document.documentElement.clientHeight;
	var offsetHeight = document.documentElement.offsetHeight;
	var scrollTop = document.documentElement.scrollTop;
	var srcollHeight = document.documentElement.scrollHeight;

	clientHeight = $(document).height() + scrollTop;

	var innerHTML;
	width = width == null ? 100 : width;
	height = height == null ? 100 : height;
	innerHTML = '<img src="' + image + '" />';
	$("body").prepend('<table id="__loading__" style="table-layout:fixed;position:absolute;left:0px;top:0px;z-index:100000;' +
			'width:' + docWidth + 'px;height:' + srcollHeight + 'px;' +
			(maskBody?"background-color:white;":"") +
			'"><tr><td style="vertical-align:bottom;text-align:center;padding-bottom:350px;">' +
			innerHTML + '</td></tr></table>');
	$(window).resize(onLoadingResize);
}

function hideLoading() {
	$(window).unbind("resize", onLoadingResize);
	$("#__loading__").remove();
}

function onLoadingResize(event) {
	var width = document.body.clientWidth;
	if (getInternetExplorerVersion() == 6) {
		width -= document.documentElement.clientWidth-diff;
	}

	$("#__loading__").width(width);
	$("#__loading__").height(document.documentElement.clientHeight);
}

function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

function _completeAttachmentCallback(response, form) {
	
	var r = $.trim(response);
	if (r.charAt(0) == '{') {
		var data = eval("(" + r + ")");
		if (data.success) {
			var formParentTable = $("#commonFileTable"+data.downloadType+" UL");
			if (data.fileId != null) {
				formParentTable.append("<div class='attachedFile' fileId='" + data.fileId + "' fileSize='" + data.size + "' newAttachment='true'>" + data.originalName + "</div>");
			} else {
				formParentTable.append("<div class='attachedFile' resourceId='" + data.resourceId + "' fileSize='" + data.size + "' newAttachment='true'>" + data.originalName + "</div>");
			}
			_processAttachedFile.call(formParentTable.children(":last")[0], true);
		} else {
			alert(data.message);
		}
	} else {
		$("BODY").append("<div style='display:none' id='_attachmentMessage'></div>");
		var msgObj = document.getElementById("_attachmentMessage");
		msgObj.innerHTML = r;
		var msg = msgObj.innerText;
		$(msgObj).remove();
		alert(msg);
	}
}

AIM = {

		frame : function(c, f) {

			var n = 'f' + Math.floor(Math.random() * 99999);
			var d = document.createElement('DIV');
			d.innerHTML = '<iframe style="display:none" src="about:blank" id="'+n+'" name="'+n+'" onload="AIM.loaded(\''+n+'\')"></iframe>';
			document.body.appendChild(d);

			var i = document.getElementById(n);
			if (c && typeof(c.onComplete) == 'function') {
				i.onComplete = c.onComplete;
				i.form = f;
			}

			return n;
		},

		form : function(f, name) {
			f.setAttribute('target', name);
		},

		submit : function(f, c, p) {
			sdpLoading();
			AIM.form(f, AIM.frame(c, f));
			if (c && typeof(c.onStart) == 'function') {
				return c.onStart();
			} else {
				return true;
			}
		},

		loaded : function(id) {
			var i = document.getElementById(id);
			var d = i.contentWindow.document;
			hideLoading();
			if (d.location.href == "about:blank") return;
			i.form.reset();
			if (typeof(i.onComplete) == 'function') {
				var form = i.form;
				i.form = null;
				i.onComplete(d.body.innerHTML, form);
			}
		}

};

var _attachmentCheck = function(file) {
	// TODO check duplicates in the future
	return true;
};


function _attachedFile() {
	$(".attachedFile").each(_processAttachedFile);
}

function fileSize(size) {
	if (size < 2048) {
		return size+" byte";
	} else if (size < 2048 * 1024) {
		return (size/1024).numberFormat("#,##0.0") + "KB";
	} else {
		return (size/1024/1024).numberFormat("#,##0.0") + "MB";
	}
}

function _processAttachedFile(fireAddEvent) {
	
	var thisObj = $(this);
	var fileAttachments = thisObj.parents(".fileAttachments");
	var readOnly = fileAttachments.attr("readOnlyValue");
	var fieldName = fileAttachments.attr("fieldName");
	fieldName = fieldName == null ? "attachments" : fieldName;

	readOnly = readOnly == true || readOnly == "true";
	var extraAttributes = fileAttachments.attr("extraAttributes");
	extraAttributes = extraAttributes == null ? [] : extraAttributes.split(",");
	var newHTML = ["<li><label>"];
	
	newHTML.push(readOnly?"":"<input type='checkbox' class='checkbox fileAttachmentSelector'/>");
	
	var attachmentId = $(this).attr("fileId") == null ? $(this).attr("resourceId") : $(this).attr("fileId");
	newHTML.push("<input type='hidden' class='autoIncrement' name='" + fieldName + "[].fileId' value='" + attachmentId + "'/>");
	for (var i = 0; i < extraAttributes.length; i++) {
		var attr = extraAttributes[i]; 
		newHTML.push("<input type='hidden' class='autoIncrement' name='" + fieldName + "[]." + attr + "' value='" + fileAttachments.attr(attr) + "'/>"); 
	}
	
	if ($(this).attr("objectId") != null) {
		newHTML.push("<a ");

		var fileName = this.innerText;
		var lastDotIdx = fileName.indexOf('.');
		var fileExtension = lastDotIdx==-1?"":fileName.substring(lastDotIdx);
		if (fileExtension == ".html" || fileExtension==".htm") {
			newHTML.push("target='_blank' ");
		}

		newHTML.push("href='" + contextPath + "/common/fileDownload.do?downloadType=");
		newHTML.push($(this).attr("downloadType") + "&id=" + $(this).attr("objectId") + "&fileId=" + $(this).attr("fileId") + "&fileName=" + encodeURIComponent(fileName) + "&_forceDownload=true'>");

	}
	newHTML.push(this.innerHTML);
	if (this.objectId != null) {
		newHTML.push("</a>");
	}
	newHTML.push("</label>");
	newHTML.push("<div class='file_size'>" + fileSize($(this).attr("fileSize")) + "</div>");
	newHTML.push("</li>");
	$(this).remove();
	$(fileAttachments).find("UL").append(newHTML.join(""));
	if (fireAddEvent === true) {
		function _onfileadd() {
			var onFileAdd = fileAttachments.attr("onfileadd");
			if (onFileAdd != null) {
				eval(onFileAdd);
			}
		}
		_onfileadd.call(fileAttachments[0]);
	}
}

function processAuthorization(){
	if (this.className == null || this.className.length == 0) return;
	var hsaAuthorization = false;
	for(var i = 0; i < CURRENT_MENU_AUTHORIZATION.length;i++){
		if(this.className.indexOf(CURRENT_MENU_AUTHORIZATION[i].toLowerCase()) != -1 ){
			hsaAuthorization = true;
		}
	}

	if(!hsaAuthorization){
		if(this.tagName.toUpperCase() == 'A'){
			var innerHTML = this.innerHTML;
			var parent = this.parentNode;
			parent.innerHTML = innerHTML;
		}
		
		$(this).remove();
	}
}

function processButtons() {
	if (this.className == null || this.className.length == 0) return;
	var idx = this.className.indexOf(' ');
	var className = idx == -1 ? this.className : this.className.substring(0, idx);
	if (className == null || className.length == 0 || BUTTON_DESIGNS[className] == null) return;

	$(this).after(BUTTON_DESIGNS[className]);
	var next = $(this).next();
	var a = next[0].tagName=='A'?next:next.find("a");
	if (this.href != null) {
		a.attr("href", this.href);
		if (this.target != null) a.attr("target", this.target);
	}
	if (this.innerHTML!=null && this.innerHTML.length > 0) {
		var span='';
		if(a.find('SPAN')[0]!=null){
			a.find('SPAN')[0].innerHTML = this.innerHTML;
			span = a.find('SPAN')[0].outerHTML;
			a.html(span);
		}else{
			a.text(this.innerHTML);
		}
		
	}
	var onclick = null;
	if (this.onclick != null) {

		if (this.onclick.length > 0) {
			eval("onclick = function () { " + this.onclick + ";}");
		} else if (typeof this.onclick == "function") {
			onclick = this.onclick;
		}     
	}
	
	if (this.type != "submit") {
		$(a[0]).click(this.onclick);
	}else if(this.onclick != null) {
		$(a[0]).click(this.onclick);
	}
	if (this.onmousedown != null) a[0].onmousedown = this.onmousedown;
	if (this.onmouseup != null) a[0].onmouseup = this.onmouseup;
	if (this.id != null && this.id.length > 0) next[0].id = this.id;
	if (this.title != null && this.title.length > 0) next[0].title = this.title;
	var parent = $(this).parent();
	next.addClass(this.className);
	if (this.newClass != null) {
		next.addClass(this.newClass);
	}

	if (this.type == "submit") {
		var parents = $(this).parents("FORM");
		if (parents.length > 0) {
			a.click(function (event) {
				if (onclick == null || onclick() != false) {
					parents.submit();
				}
			});
		}
	}
	
	$(this).remove();
}

var dateFormat = function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	timezoneClip = /[^-+\dA-Z]/g,
	pad = function (val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len) val = "0" + val;
		return val;
	};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) {
			throw SyntaxError("invalid date");
		}

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
						flags = {
						d:    d,
						dd:   pad(d),
						ddd:  dF.i18n.dayNames[D],
						dddd: dF.i18n.dayNames[D + 7],
						M:    m + 1,
						MM:   pad(m + 1),
						MMM:  dF.i18n.monthNames[m],
						MMMM: dF.i18n.monthNames[m + 12],
						yy:   String(y).slice(2),
						yyyy: y,
						h:    H % 12 || 12,
						hh:   pad(H % 12 || 12),
						H:    H,
						HH:   pad(H),
						m:    M,
						mm:   pad(M),
						s:    s,
						ss:   pad(s),
						SSS:    pad(L, 3),
						S:    pad(L > 99 ? Math.round(L / 10) : L),
						a:    H < 12 ? "A"  : "P",
								T:   date.getTime(),
								Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
										o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
										S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

dateFormat.masks = {
		"default":      "ddd MMM dd yyyy HH:mm:ss",
		shortDate:      "M/d/yy",
		mediumDate:     "MMM d, yyyy",
		longDate:       "MMMM d, yyyy",
		fullDate:       "dddd, MMMM d, yyyy",
		shortTime:      "h:mm TT",
		mediumTime:     "h:mm:ss TT",
		longTime:       "h:mm:ss TT Z",
		isoDate:        "yyyy-MM-dd",
		isoTime:        "HH:mm:ss",
		isoDateTime:    "yyyy-MM-dd'T'HH:mm:ss",
		isoUtcDateTime: "UTC:yyyy-MM-dd'T'HH:mm:ss'Z'",
		date:           "yyyy-MM-dd",
		timestamp:      "yyyy-MM-dd'T'HH:mm",
		datetime:       "yyyy-MM-dd'T'HH:mm",
		timestamp2:     "yyyy-MM-dd'T'HH:mm:ss",
		datetime2:      "yyyy-MM-dd'T'HH:mm:ss",
		time:           "HH:mm",
		time2:          "HH:mm:ss"
};

//Internationalization strings
dateFormat.i18n = {
		dayNames: [
		           "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		           "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		           ],
		           monthNames: [
		                        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		                        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		                        ]
};

function onFaile(res){
	try{
		var ret = eval("("+res.responseText+")");
		alert(ret.message);
	}catch(e){
		alert(e.description);
	}
}

function retStrongText(txt){
	return "<strong>"+txt+"</strong>";
}

function ajaxSession(data){
	if(data != null && data.errorCode == 9999 ){
		alert(data.message);
		top.location.replace(contextPath+"/identity/logout.do");
	}
}

function makeSearchConditon(url , f){
	
	
	var form = f;
	var inputObjs = $(form).find("INPUT");
	for(var i = 0 ; i  < inputObjs.length ; i++){
		var tmpObj = inputObjs[i];
		var tmpName = tmpObj.name;
		var tmpValue = $(tmpObj).val();
		var seq = url.indexOf('?') == -1 ? '?' : '&';
		url = url+seq+tmpName+"="+encodeURIComponent(tmpValue);
	}
	
	var selectObjs = $(form).find("SELECT");
	for(var i = 0 ; i  < selectObjs.length ; i++){
		var tmpObj = selectObjs[i];
		var tmpName = tmpObj.name;
		var tmpValue = $(tmpObj).val();
		var seq = url.indexOf('?') == -1 ? '?' : '&';
		url = url+seq+tmpName+"="+encodeURIComponent(tmpValue);
	}
	
	return url;
	
}

//****************************************
//Open Close
//****************************************
function Opentop(historyLength) 
{ 
   document.getElementById('count_open').style.display='none'; 
   document.getElementById('count_close').style.display='';
   for (var i = 0; i < historyLength; i++) {
  	 document.getElementById('submitHistory'+i).style.display=''; 
	}
} 

function Closetop(historyLength) 
{ 
   document.getElementById('count_close').style.display='none'; 
   document.getElementById('count_open').style.display=''; 
   for (var i = 1; i < historyLength; i++) {
  	 document.getElementById('submitHistory'+i).style.display='none'; 
	}
} 

//****************************************
//Open2 Close2
//****************************************
function Openbot() 
{ 
   document.getElementById('count_open2').style.display='none'; 
   document.getElementById('count_close2').style.display=''; 
} 
function Closebot() 
{ 
   document.getElementById('count_close2').style.display='none'; 
   document.getElementById('count_open2').style.display=''; 
} 


//****************************************
//  select box
//****************************************
function setSelectBox(){
	$(".selectbox > span").filter('[class=selecttext]').bind("click",function(){

		if($(this).parent().find("div").hasClass("showMenu")){
			$(this).parent().find("div").removeClass("showMenu");
			$(this).parent().css({"z-index": 10});
			return;
		}else{
			$(this).parent().find("li").click(function(event){
				$(this).parent().find("li").removeClass("selectMnu");
				$(this).addClass("selectMnu");
				$(this).parent().parent().prev().html($(this).text()).next().removeClass("showMenu");				
				$(this).parent().parent().parent().css({"z-index": 10});
				event.stopImmediatePropagation();
				return false;
			});	
			$(this).parent().find("div").addClass("showMenu");			
			$(this).parent().css({"z-index": 30});
		}
	});
	$(".selectbox").bind("mouseleave",function(){
		$(this).find("div").removeClass("showMenu");
		$(this).css({"z-index": 10});
	});
}

function tab(){	
	$(".tab .tabmenu li").click(function(){
		$(this).parent().parent().find(".tabcont").hide();
		$(this).parent().parent().find(".tabcont").eq($(this).index()).show();
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
}

function tab2(){	
	$(".tab2 .tabsubmenu li").click(function(){
		$(this).parent().parent().find(".tabsubcont").hide();
		$(this).parent().parent().find(".tabsubcont").eq($(this).index()).show();
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
}

$(document).ready(function(){
	setSelectBox();
	tab();
	tab2();
});


//********************************************
// fakeselect
//셀렉트 박스에 디자인을 입히기 위한 대체 스크립트
//옵션설정
//*********************************************

fakeselect.initialize=function(){
	/*fakeselect({
		targetclassname : '',
		ignoreclassname : '',
		usemultiple : true,
		title : {
			classname : 'selectbox_title',
			activeclassname : 'selectbox_title_active',
			focusclassname : 'selectbox_title_focus',
			disabledclassname : 'selectbox_title_disabled',
			innerhtml : '<strong></strong>'
		},
		option : {
			classname : 'selectbox_option',
			innerhtml : '<div class="scroll"></div>',
			position : -1,
			upperposition : 1,
			zindex : 10,
			maxitems : 5,
			onclassname : 'on'
		},
		multiple : {
			defaultsize : 5,
			classname : 'selectbox_multiple',
			focusclassname : 'selectbox_multiple_focus',
			disabledclassname : 'selectbox_multiple_disabled',
			innerhtml : '<div class="scroll"></div>',
			onclassname : 'on'
		}
	});*/
}

function fakeselect(v){

	var isie=(/msie/i).test(navigator.userAgent);
	var isie8=(/msie 8/i).test(navigator.userAgent);
	var isie9=(/msie 9/i).test(navigator.userAgent);
	var isfirefox=(/firefox/i).test(navigator.userAgent);
	var isapple=(/applewebkit/i).test(navigator.userAgent);
	var isopera=(/opera/i).test(navigator.userAgent);
	var ismobile=(/(iphone|ipod|android)/i).test(navigator.userAgent);
	if((/msie 9/i).test(navigator.userAgent)) isie=false;

	if(!v.title.defaultwidth) v.title.defaultwidth=75;
	if(!v.option.position) v.option.position=-1;
	if(!v.option.upperposition) v.option.upperposition=1;
	if(!v.option.zindex) v.option.zindex=1;

	var sels=document.getElementsByTagName('select');
	for(var i=0,max=sels.length; i<max; i++){
		if(v.ignoreclassname && (new RegExp('\\b'+v.ignoreclassname+'\\b')).test(sels[i].className)) continue;
		if(!v.targetclassname || (new RegExp('\\b'+v.targetclassname+'\\b')).test(sels[i].className)){
			if(sels[i].multiple && !v.usemultiple) continue;
			if(!sels[i].ac){
				sels[i].ac=create(sels[i]);
				sels[i].change=function(){
					this.ac.ckdisable();
					if(this.ac.opt) this.ac.tg.innerHTML=(this.options.length)? this.options[this.selectedIndex].text : '';
					else this.ac.setselected();
				}
				sels[i].sf_change=sels[i].onchange;
				sels[i].sf_mouseover=sels[i].onmouseover;
				sels[i].sf_mouseout=sels[i].onmouseout;
				sels[i].sf_click=sels[i].onclick;
				sels[i].onchange=function(){
					this.change();
					if(this.sf_change) this.sf_change();
				}
			}else sels[i].reset();
		}
	}

	function rc(sel,v,f){
		sel.noww=getwidth(sel);
		if(v.widthminus==undefined){
			v.widthminus=0;
			var t=document.createElement((f=='option')? 'div' : 'span');
			t.className=v.classname;
			with(t.style){
				position='absolute';
				left='-100000px';
				top=0;
			}
			document.body.appendChild(t);
			var cklist=['paddingLeft','paddingRight','borderLeftWidth','borderRightWidth'];
			for(var i=0; i<4; i++) v.widthminus+=parseInt(getstyle(t,cklist[i]));
			document.body.removeChild(t);
		}
		var tagname,style,width=sel.noww-v.widthminus;
		if(f=='option'){
			tagname='div';
			if(sel.className){
				var ck=sel.className.match(/\b(selectbox-option-width\:([0-9]+)(px)?)\b/i);
				if(ck){
					width=sel.optionwidth=ck[2]-v.widthminus;
					sel.className=sel.className.replace(/\bselectbox-option-width\:[0-9]+(px)?\b/i,'');
				}
			}
			style='position:absolute;width:'+width+'px;display:none;z-index:'+v.zindex;
		}else{
			sel.style.position='absolute';
			sel.style.left='-100000px';
			tagname='span';
			style='width:'+width+'px;vertical-align:middle;display:';
			if(((sel.style.display)? sel.style.display : getstyle(sel,'display'))=='none'){
				style+='none;';
				sel.style.display='none';
			}else style+='inline-block;';
			style+=(f=='multiple')? 'cursor:default;' : 'cursor:pointer;';
		}
		var rv, occk=true;
		if(isie){
			try{
				occk=false;
				rv=document.createElement('<'+tagname+' class="'+((v.classname)? (sel.className)? v.classname+' '+sel.className : v.classname : '')+'" style="'+style+'">');
			}catch(e){
				occk=true;
			}
		}
		if(occk){
			rv=document.createElement(tagname);
			if(v.classname) rv.setAttribute('class',(sel.className)? v.classname+' '+sel.className : v.classname);
			rv.setAttribute('style',style);
		}
		if(v.innerhtml){
			rv.innerHTML=v.innerhtml;
			rv.tg=rv.childNodes[0];
			for(var i=0; i<1; i++){
				if((f=='option' || f=='multiple') && rv.tg.className=='scroll') rv.scrobj=rv.tg;
				if(rv.tg.childNodes[0]){
					rv.tg=rv.tg.childNodes[0];
					i--;
				}
			}
		}else rv.tg=rv;
		rv.onselectstart=function(){
			return false;
		}
		return rv;
	}

	function create(sel){

		var ac;

		if(!sel.multiple){//normal

			ac=rc(sel,v.title);
			if(sel.length) ac.tg.innerHTML=sel.options[sel.selectedIndex].text;
			ac.onclick=function(){
				if(sel.disabled) return false;
				if(ismobile){
					sel.focus();
					return false;
				}
				if(this.opt.style.display=='block'){
					optclose();
					sel.focus();
					return false;
				}
				this.className+=' '+v.title.activeclassname;
				setoptions();
				var opts=(this.opt.tg)? ac.opt.tg.getElementsByTagName('a') : this.opt.getElementsByTagName('a');
				for(var i=0,max=opts.length; i<max; i++) opts[i].className=(i==sel.selectedIndex)? v.option.onclassname : '';
				this.opt.style.left=this.opt.style.top='-100000px';
				this.opt.style.display='block';
				if(this.opt.scrobj){
					if(sel.scroll){
						var sto=this.opt.getElementsByTagName('li')[0];
						this.opt.scrobj.style.height=sto.offsetHeight*v.option.maxitems+'px';
						this.opt.scrobj.scrollTop=sto.offsetHeight*sel.selectedIndex;
						this.opt.scrobj.style.overflow='auto';
						this.opt.scrobj.style.overflowX='hidden';
					}else{
						this.opt.scrobj.style.height='auto';
						this.opt.scrobj.style.overflow='hidden';
					}
				}
				var scl=(isapple)? document.body.scrollLeft : document.documentElement.scrollLeft;
				var sct=(isapple)? document.body.scrollTop : document.documentElement.scrollTop;
				var bcr=this.getBoundingClientRect();
				var left=bcr.left+scl-document.documentElement.clientLeft;
				var top=bcr.top+sct-document.documentElement.clientTop;
				var isupper=((top+this.offsetHeight+this.opt.offsetHeight)>(document.documentElement.clientHeight+sct));
				if(sel.optionwidth && (left+this.opt.offsetWidth)>(document.documentElement.clientWidth+scl)){
					left=left-(this.opt.offsetWidth-sel.noww);
				}
				this.opt.style.left=left+'px';
				this.opt.style.top=(isupper)? (top-this.opt.offsetHeight+v.option.upperposition)+'px' : (top+this.offsetHeight+v.option.position)+'px';
				if(sel.sf_click) sel.sf_click();
				return false;
			}

			function setoptions(){
				var max=sel.options.length;
				sel.scroll=(v.option.maxitems && (max>v.option.maxitems));
				var inhtml='<ul>';
				for(var i=0; i<max; i++) inhtml+='<li><a href="#">'+sel.options[i].text+'</a></li>';
				inhtml+='</ul>';
				if(ac.opt.tg){
					ac.opt.tg.innerHTML=inhtml;
					var opts=ac.opt.tg.getElementsByTagName('a');
				}else{
					ac.opt.innerHTML=inhtml;
					var opts=ac.opt.getElementsByTagName('a');
				}
				for(var i=0,max=opts.length; i<max; i++){
					opts[i].i=i;
					opts[i].onclick=function(){
						optclose();
						ac.tg.innerHTML=sel.options[this.i].text;
						sel.options[this.i].selected='selected';
						sel.onchange();
						sel.focus();
						return false;
					}
				}
			}

			function setselected(f){
				var changed=false;
				if(f=='up' && sel.selectedIndex>0){
					sel.options[sel.selectedIndex-1].selected='selected';
					changed=true;
				}else if(f=='down' && sel.selectedIndex<(sel.options.length-1)){
					sel.options[sel.selectedIndex+1].selected='selected';
					changed=true;
				}
				if(changed && ac.opt.scrobj && sel.scroll){
					var sto=ac.opt.getElementsByTagName('li')[0];
					ac.opt.scrobj.scrollTop=sto.offsetHeight*sel.selectedIndex;
				}
				sel.onchange();
			}

			if(!isie && !isopera){
				sel.onkeydown=function(e){
					var kc=e.keyCode;
					if(kc==38){
						setselected('up');
						return false;
					}else if(kc==40){
						setselected('down');
						return false;
					}
				}
			}

			function wheelaction(e){
				if(isie) e=window.event;
				if(sel.options.length>1){
					var wv=(e.wheelDelta)? e.wheelDelta : e.detail;
					wv=(isfirefox)? (wv<0)? 'up' : 'down' : (wv>0)? 'up' : 'down';
					setselected(wv);
				}
				if(e.preventDefault) e.preventDefault();
				return false;
			}

			ac.opt=rc(sel,v.option,'option');

			function optwheelaction(e){
				if(!sel.scroll) return false;
				if(isie) e=window.event;
				var wv=(e.wheelDelta)? e.wheelDelta : e.detail;
				wv=(isfirefox)? (wv<0)? 'up' : 'down' : (wv>0)? 'up' : 'down';
				var mv=this.getElementsByTagName('li')[0].offsetHeight*((v.option.maxitems>2)? 2 : 1);
				this.scrobj.scrollTop+=(wv=='up')? -mv : mv;
				if(e.preventDefault) e.preventDefault();
				return false;
			}

			if(isie) ac.opt.onmousewheel=optwheelaction;
			else ac.opt.addEventListener(((isfirefox)? 'DOMMouseScroll' : 'mousewheel'),optwheelaction,false);

			if(ac.opt.scrobj){
				ac.opt.scrobj.onscroll=function(){
					var stoh=this.getElementsByTagName('li')[0].offsetHeight;
					this.scrollTop=Math.round(this.scrollTop/stoh)*stoh;
				}
			}

			var optclosetimer=null;
			ac.opt.onmouseover=function(){
				clearTimeout(optclosetimer);
			}
			ac.opt.onmouseout=function(){
				optclosetimer=setTimeout(optclose,100);
			}
			function optclose(){
				if(ac.opt.style.display=='block'){
					ac.opt.style.display='none';
					ac.className=ac.className.replace(' '+v.title.activeclassname, '');
					sel.focus();
				}
			}

		}else{//multiple

			ac=rc(sel,v.multiple,'multiple');

			ac.setoptions=function(){
				ac.tg.innerHTML='';
				var inhtml='<ul>';
				for(var i=0,max=sel.options.length; i<max; i++) inhtml+='<li>'+sel.options[i].text+'</li>';
				inhtml+='</ul>';
				ac.tg.innerHTML=inhtml;
				sel.parentNode.insertBefore(ac,sel);
				sel.size=(sel.size)? sel.size : v.multiple.defaultsize;
				sel.scroll=max>sel.size;
				ac.opts=ac.tg.getElementsByTagName('li');
				if(!ac.opts[0]) ac.tg.innerHTML='<ul><li>&nbsp;</li></ul>';
				ac.scrobj.style.height=(sel.size*ac.opts[0].offsetHeight)+'px';
				var last;
				for(var i=0,max=sel.options.length; i<max; i++){
					ac.opts[i].i=i;
					if(sel.options[i].selected) last=i;
					ac.opts[i].className=(sel.options[i].selected)? v.multiple.onclassname : '';
					ac.opts[i].onmousedown=mousedown;
				}
				ac.clickindex=sel.options.selectedIndex;
				var tnb=gettnbindex();
				if(last>tnb[1]) ac.scrobj.scrollTop=ac.scrobj.scrollTop+((last-tnb[1])*ac.opts[0].offsetHeight);
			}

			ac.setselected=function(){
				for(var i=0,max=sel.options.length; i<max; i++){
					ac.opts[i].className=(sel.options[i].selected)? v.multiple.onclassname : '';
				}
			}

			function mousedown(e){
				if(sel.disabled) return false;
				clearTimeout(ac.bluringtimer);
				if(!e) e=window.event;
				if(e.shiftKey && ac.clickindex>-1) multiselect(ac.clickindex,this.i);
				else{
					if(e.ctrlKey) this.className=(this.className=='on')? '' : v.multiple.onclassname;
					else{
						for(var i=0,max=ac.opts.length; i<max; i++){
							ac.opts[i].className=(i==this.i)? v.multiple.onclassname : '';
						}
					}
					ac.clickindex=this.i;
				}
				ac.clicky=e.clientY-((e.layerY)? e.layerY : e.offsetY);
				ac.fmy=ac.clicky;
				ac.mode=true;
				if(sel.scroll){
					ac.scrolly=ac.scrobj.scrollTop;
					var tnb=gettnbindex();
					ac.gap=[tnb[0]-ac.clickindex,tnb[1]-ac.clickindex];
				}
				addevent(document.documentElement,'mousemove',mousemove);
				addevent(document.documentElement,'mouseup',mouseup);
				sel.focus();
				return false;
			}

			function mousemove(e){
				if(isie8){
					ac.onselectstart=function(){
						return false;
					}
				}
				clearTimeout(ac.bluringtimer);
				if(!ac.mode) return false;
				if(!e) e.window.event;
				var y=e.clientY;
				var nindex=ac.clickindex+(Math.ceil((y-ac.fmy)/ac.opts[0].offsetHeight)-1);
				if(0>nindex) nindex=0;
				if(nindex>ac.opts.length-1) nindex=ac.opts.length-1;
				multiselect(ac.clickindex,nindex);
				if(sel.scroll){
					if(nindex>-1 || ac.opts.length-1>nindex){
						var tnb=gettnbindex();
						if(tnb[0]>nindex || nindex>tnb[1]){
							var cv=(nindex-ac.clickindex-((tnb[0]>nindex)? ac.gap[0] : ac.gap[1]))*ac.opts[0].offsetHeight;
							ac.scrobj.scrollTop=ac.scrolly+cv;
							ac.fmy=ac.clicky-cv;
						}
					}
				}
			}

			function gettnbindex(){
				var top=Math.ceil(ac.scrobj.scrollTop/ac.opts[0].offsetHeight);
				return [top,top+sel.size-1];
			}

			function multiselect(v1,v2){
				var imin=Math.min(v1,v2);
				var imax=Math.max(v1,v2);
				for(var i=0,max=ac.opts.length; i<max; i++){
					ac.opts[i].className=(imin<=i && imax>=i)? v.multiple.onclassname : '';
				}
			}

			function mouseup(e){
				if(!ac.mode) return false;
				for(var i=0,max=ac.opts.length; i<max; i++){
					sel.options[i].selected=(ac.opts[i].className)? 'selected' : false;
				}
				ac.mode=false;
				removeevent(document.documentElement,'mousemove',mousemove);
				removeevent(document.documentElement,'mouseup',mouseup);
				sel.focus();
			}

			function mwheelaction(e){
				if(sel.disabled || !sel.scroll) return false;
				clearTimeout(ac.bluringtimer);
				if(isie) e=window.event;
				var wv=(e.wheelDelta)? e.wheelDelta : e.detail;
				wv=(isfirefox)? (wv<0)? 'up' : 'down' : (wv>0)? 'up' : 'down';
				var mv=ac.opts[0].offsetHeight*((v.option.maxitems>2 && sel.size>1)? 2 : 1);
				this.scrollTop+=(wv=='up')? -mv : mv;
				if(e.preventDefault) e.preventDefault();
				return false;
			}

			if(isie) ac.scrobj.onmousewheel=mwheelaction;
			else ac.scrobj.addEventListener(((isfirefox)? 'DOMMouseScroll' : 'mousewheel'),mwheelaction,false);

			ac.scrobj.onscroll=function(){
				clearTimeout(ac.bluringtimer);
				var stoh=ac.opts[0].offsetHeight;
				this.scrollTop=Math.round(this.scrollTop/stoh)*stoh;
			}

			sel.onkeydown=function(e){
				if(!this.scroll) return;
				clearTimeout(ac.bluringtimer);
				if(!e) e=window.event;
				var f;
				if(!ac.clickindex) ac.clickindex=this.options.selectedIndex;
				if(e.keyCode==40 || e.keyCode==38){
					if(e.keyCode==40){
						f=='down';
						ac.clickindex=(ac.clickindex==ac.opts.length-1)? ac.opts.length-1 : (this.options.selectedIndex==-1)? (isie)? 1 : 0 : ac.clickindex+1;
					}else if(e.keyCode==38){
						f=='up';
						ac.clickindex=(ac.clickindex==0)? 0 : ac.clickindex-1;
					}
					var tnb=gettnbindex();
					var sv=(tnb[0]>ac.clickindex)? ac.clickindex-tnb[0] : (ac.clickindex>tnb[1])? ac.clickindex-tnb[1] : 0;
					this.ac.scrobj.scrollTop=this.ac.scrobj.scrollTop+(sv*this.ac.opts[0].offsetHeight);
				}
			}

			ac.setoptions();

		}

		ac.ckdisable=function(){
			if(sel.disabled){
				if(!sel.multiple && v.title.disabledclassname) this.className+=' '+v.title.disabledclassname;
				else if(sel.multiple && v.multiple.disabledclassname) this.className+=' '+v.multiple.disabledclassname;
				else setopacity(this,50);
			}else{
				if(!sel.multiple && v.title.disabledclassname) this.className=this.className.replace(new RegExp('\\b'+v.title.disabledclassname+'\\b','g'),'');
				else if(sel.multiple && v.multiple.disabledclassname) this.className=this.className.replace(new RegExp('\\b'+v.multiple.disabledclassname+'\\b','g'),'');
				else setopacity(this,100);
			}
			if(sel.multiple){
				this.scrobj.style.overflow=(sel.disabled)? 'hidden' : 'auto';
				this.scrobj.style.overflowX='hidden';
			}
		}
		ac.ckdisable();

		ac.bluringtimer=null;
		ac.focusing=function(){
			if(sel.disabled) return false;
			if(this.opt){
				this.className+=' '+v.title.focusclassname;
				if(isie) this.onmousewheel=wheelaction;
				else this.addEventListener(((isfirefox)? 'DOMMouseScroll' : 'mousewheel'),wheelaction,false);
			}else{
				clearTimeout(ac.bluringtimer);
				this.className+=' '+v.multiple.focusclassname;
			}
		}
		ac.bluring=function(){
			if(sel.disabled) return false;
			if(this.opt){
				this.className=this.className.replace(new RegExp(' '+v.title.focusclassname,'g'),'');
				if(isie) this.onmousewheel=null;
				else this.removeEventListener(((isfirefox)? 'DOMMouseScroll' : 'mousewheel'),wheelaction,false);
			}else{
				ac.bluringtimer=setTimeout(function(){
					ac.className=ac.className.replace(new RegExp(' '+v.multiple.focusclassname,'g'),'')
				},700);
			}
		}
		sel.onfocus=function(){
			ac.focusing();
		}
		sel.onblur=function(){
			ac.bluring();
		}

		sel.reset=function(){
			if(!sel.ac.opt) sel.ac.setoptions();
			this.change();
			this.style.height='auto'; //ie bug
			var noww=getwidth(this);
			if(noww!=this.noww){
				if(sel.ac.opt){
					sel.ac.style.width=(noww-v.title.widthminus)+'%';
					sel.ac.opt.style.width=(v.option.widthminus)? (noww-v.option.widthminus)+'%' : noww+'px';
				}else{
					sel.ac.style.width=(noww-v.multiple.widthminus)+'%';
				}
				sel.noww=noww;
			}
		}
		sel.show=function(){
			this.style.display='inline';
			this.ac.style.display='inline-block';
			this.reset();
		}
		sel.hide=function(){
			this.style.display='none';
			this.ac.style.display='none';
		}

		ac.onmouseover=function(e){
			if(this.opt) clearTimeout(optclosetimer);
			if(sel.sf_mouseover){
				if(!e) e=window.event;
				if(checkevents(e,this)) sel.sf_mouseover();
			}
		}
		ac.onmouseout=function(e){
			if(this.opt) optclosetimer=setTimeout(optclose,100);
			if(sel.sf_mouseout){
				if(!e) e=window.event;
				if(checkevents(e,this)) sel.sf_mouseout();
			}
		}

		if(ac.opt){
			sel.parentNode.insertBefore(ac,sel);
			document.body.appendChild(ac.opt);
		}

		return ac;

	}

	function getwidth(sel){
		var rv=(sel.style.width)? parseInt(sel.style.width) : sel.offsetWidth;
		if(!rv) rv=parseInt(getstyle(sel,'width'));
		if(!rv) rv=v.title.defaultwidth;
		return rv;
	}

	function getstyle(tg,p){
		return (tg.currentStyle)? tg.currentStyle[p] : window.getComputedStyle(tg,null)[p];
	}

	function setopacity(tg,v){
		if(isie) tg.style.filter='alpha(opacity='+v+')';
		else tg.style.opacity=v/100;
	}

	function addevent(tg,w,func){
		if(window.attachEvent) tg.attachEvent('on'+w,func);
		else tg.addEventListener(w,func,false);
	}

	function removeevent(tg,w,func){
		if(window.detachEvent) tg.detachEvent('on'+w,func);
		else tg.removeEventListener(w,func,false);
	}

	function checkevents(e,tg){
		var etg=(e.target)? e.target : e.srcElement;
		if(etg!=tg) return false;
		var ereltg=(e.relatedTarget)? e.relatedTarget : (e.type=='mouseover')? e.fromElement : e.toElement;
		if(ereltg){
			while(ereltg!=tg && !(/(body|html)/i).test(ereltg.tagName)) ereltg=ereltg.parentNode;
			if(ereltg==tg) return false;
		}
		return true;
	}
}
//*********************************************

//****************************************
//  tab
//****************************************
$(function () {

    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#8f8f8f");
        $(this).addClass("active").css({"color": "#000","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#000");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});

//****************************************
//layerPop
//****************************************
$(function(){
 $('.open-pop').click(function(){
$('.layerPop').show();
 });
 $('.layerPop .close').click(function () {	    
$('.layerPop').hide();
 });
});

//****************************************
//login_guide
//****************************************
	function showmap() { 
	 if(document.all.spot.style.visibility=="hidden") {
	   document.all.spot.style.visibility="visible";
	   return false;
	 }
	 if(document.all.spot.style.visibility=="visible") {
	  document.all.spot.style.visibility="hidden";
	  return false;
	 }
	}

//*****************************************
	function bubblemap() { 
	 if(document.all.bubble.style.visibility=="hidden") {
	   document.all.bubble.style.visibility="visible";
	   return false;
	 }
	 if(document.all.bubble.style.visibility=="visible") {
	  document.all.bubble.style.visibility="hidden";
	  return false;
	 }
	}

//*****************************************

//****************************************
// AJAX 
//****************************************
//2017.04.06 mskim
/**
 * 
 * 폼내의 데이터를 JSON return
 * ex) fq_form_to_json("searchForm")
 * <form:form modelAttribute="view" method="post" name="searchForm" id="searchForm">
 * @param	formId	폼ID 문자열
 */
function fq_form_to_json(formId) {
	var un_array = jQuery("#" + formId).serializeArray();
	var _array = {};
	var tmpkey = "";
	var tmpObj = {};
	var lastArrKey = null;
	
	$.map(un_array, function(n, i){
		if(n.name.indexOf('[') > -1 ){
			var array = n.name.match(/\[(.*?)\]\.(.*)/);
			var key = n.name.replace(array[0],"").replace(array[1],"").replace('[',"").replace(']',"");
			
			//2020.06.05 연속된 배열에 대한 예외처리 추가 my30.park
			if(lastArrKey != null && key != lastArrKey){
				_array[lastArrKey].push(tmpObj);
				tmpObj = {};
			}

			if(!_array[key]){
				// _array[key] = {};
				// 배열이 생성되어야 함.
				_array[key] = [];
				lastArrKey = key;
			}
			else if( tmpObj[array[2]] != undefined)
			{
				_array[key].push(tmpObj);
				tmpObj = {};
			}
			// 배열이 아닌 경우 후속 작업을 위해 배열명 저장
			tmpkey = key;
	            
			// _array[key][array[2]] = n['value'];
			eval("tmpObj."+ array[2] + "= n['value']");
	            
		}else{
			// object chk
			if( !jQuery.isEmptyObject(tmpObj) )
			{
				_array[tmpkey].push(tmpObj);
				tmpObj = {};
			}
			_array[n['name']] = n['value'];
		}
	});
	

	// object chk
	if( !jQuery.isEmptyObject(tmpObj) )
	{
		_array[tmpkey].push(tmpObj);
		tmpObj = {};
	}
	
	return _array;

}

/**
 * 폼내의 모든 input 값을 초기화(빈문자열)하며, 체크된 것을 해제한다.
 * (주의) '히든' 타입의 값ㅇ
 * 
 * @param	formId	폼ID 문자열
 */
// @ 공통으로 변경해야함 내부 테스트 
function fq_clear_input_vals(formId) {
    $("#" + formId + " :input").each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
            case 'search':	
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}

/**
 * POST 요청의 ajax 요청 함수
 * @param requrl	요청URL
 * @param postData	포스트데이터객체(주의:문자열로 변환전)
 * @param successHandler	성공 처리 함수(함수 or 함수명문자열)
 * @param errorHandler		오류 처리 함수(함수 or 함수명문자열)
 */
function fq_ajax(requrl, postData, successHandler, errorHandler) {
	var s = "+----------------------------------------------------------------+<br/>\n";
		s+= "+ request URL   : [" + requrl + "]<br/>\n";
		s+= "+ postData      : [" + postData + "]<br/>\n";
		s+= "+ success(type) : [" + typeof(successHandler) + "]<br/>\n";
		s+= "+----------------------------------------------------------------+<br/>\n";
	// fn_debug(s);

	$.ajax({
		url         : requrl,
		type        : 'POST',
		cache       : false,   
		data        : JSON.stringify(postData),
		contentType : 'application/json; charset=utf-8',   
		traditional : true,
		async		: false,
		dataType    : 'json',
		success     : function(result) {
			if (typeof(successHandler) == "function") {
				successHandler(result);
			}
			else if (typeof(successHandler) == "string") {
				var successHandlerFunction = eval(successHandler);
				successHandlerFunction(result);
			}
		},
		error:function (request, err, ex) {
			if (undefined==errorHandler || null==errorHandler) {
				fq_ajax_sys_error(request, err, ex);
			}
			else {
				if (typeof(errorHandler) == "function") {
					errorHandler(request);
				}
				else if (typeof(errorHandler) == "string") {
					var errorHandlerFunction = eval(errorHandler);
					errorHandlerFunction(request);
				}
			}
	     }  
	});
}

// 이부분은 아직 고민중...
/**
 * ajax 요청의 'error' 처리 공통 핸들러 함수
 * (참고) 'dialog-system-warn', 'dialog-system-warn-iframe' 는 'default_header' 영역에서 선언됨
 * 
 * @param   result ajax 요청의 'error' 함수의 파라미터(예, error: function(result) )
 */
function fq_ajax_sys_error(request, err, ex) {
	try {
		//$("#dialog-system-warn-iframe").contents().html(result);
		var iFrame = $("#dialog-system-warn-iframe");
		var iFrameDoc = iFrame[0].contentDocument || iFrame[0].contentWindow.document;
		iFrameDoc.write( result.responseText );
		iFrameDoc.close();
		$("#dialog-system-warn").dialog("open");
	}
	catch(E) {
		alert("[시스템오류]\n\n" + E.description);
	}
}

//BootBox 4.4
function doAlert(msg, doFunc) {
	/*var res;
	if (doFunc == null) {
		doFunc = function(res){};
	}
	alert(msg);
	doFunc(res);*/
	
	hkcommonbox.alert(msg, doFunc);
}

function doConfirm(msg, promptFnc) {
	/*var res;
	if (promptFnc == null)
		promptFnc = function(res){};
	res = confirm(msg);
	promptFnc(res);*/
	
		hkcommonbox.confirm(msg, promptFnc);
}

//BootBox 2.3
function doAlertAdmin(msg, doFunc) {
	var res;
	if (doFunc == null)
		doFunc = function(res){};
	alert(msg);
	doFunc(res);
//	bootbox.alert(msg,'','5',null, doFunc);
}

function doConfirmAdmin(msg, promptFnc) {
	var res;
	if (promptFnc == null)
		promptFnc = function(res){};
	res = confirm(msg);
	promptFnc(res);
//	bootbox.confirm(msg,'Confirm', promptFnc);
}


//reference : http://blog.outofhanwell.com/2006/06/08/the-windowonload-problem-revisited/
if(window.addEventListener){
	window.addEventListener('DOMContentLoaded',fakeselect.initialize,false);
	window.addEventListener('load',fakeselect.initialize,false);
}else if(window.attachEvent){
	document.write('<script id="deferscript" defer="defer" src="//[]"></script>');
	var deferscript=document.getElementById('deferscript');
	deferscript.onreadystatechange=function(){
		if(this.readyState==='complete'){
			deferscript=null;
			fakeselect.initialize();
		}
	}
	window.attachEvent('onload',fakeselect.initialize);
}

// 사용하지 않는 함수로 보임.
// 해당 함수 주석 후, 동작 안되는 경우 확인필요
// 2017.04.07
/*function getParameter(param) {
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == param.toUpperCase()) {
            returnValue = parameters[i].split('=')[1];
            return decodeURIComponent(returnValue);
        }
    }
}*/

/*
 * datepicker 사용시 히든타입으로 input 생성 처리
 * 개선해야할점 date포멧 형식을 자율적으로 변경 가능해야함
 * ex) datepicker 선언부
 * 
        onSelect: function(dateText, inst) {
	         => 호출 var hidden = hiddenDate("searchForm",$this);
        }
 */
// 
function hiddenDate(formId,dateField) {
    var name = dateField.attr("id");
    
    var hidden_fields = $( "#" + formId ).find( $("input:hidden[name="+ name + "]") );
    
    if(hidden_fields.length > 0)
    {
	    $("input:hidden[name="+ name + "]").remove();
    }
    
    var value = dateField.val();
    var hidden = $("<input></input>");
    hidden.prop("type", "hidden");
    hidden.prop("name", name);
    // hidden.prop("id", "hid" + name);
    hidden.prop("id", name);

    // DB저장 형식
    var dateValue = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (dateValue)
    	hidden.val(dateValue[1] + dateValue[2] + dateValue[3]);
    
    // hidden.val(dateField.val());
    
    dateField.after(hidden); // datepicker after hidden input add 
    dateField.removeAttr("name"); // datepicker name remove
 
    return hidden;
}

/*
 * 2017.05.10 mskim 
 * post 방식으로 화면 오픈
 * 
    var args = {
        actionUri : url,
        formData : {
        	"courseId" : courseId,
        	"subjectId" : subjectId,
        	"lectureSeq" : lectureSeq
        }
    }; 
 */
function fn_open_page_get(args)
{
    var form = $('<form></form>');
    form.attr('action', args.actionUri);
    form.attr('method', 'get');
    form.appendTo('body');
     
    if(args.formData){
        for(var key in args.formData){
            var value = args.formData[key];
            form.append($('<input type="hidden" value="'+ value + '" name="' + key + '">'));
        }
    }
    
    form.submit();
}
function fn_open_page(args)
{
    var form = $('<form></form>');
    form.attr('action', args.actionUri);
    form.attr('method', 'post');
    form.appendTo('body');
     
    if(args.formData){
        for(var key in args.formData){
            var value = args.formData[key];
            form.append($('<input type="hidden" value="'+ value + '" name="' + key + '">'));
        }
    }
    
    form.submit();
}

function fn_open_page_window(args)
{
    var form = $('<form></form>');
    form.attr('action', args.actionUri);
    form.attr('method', 'post');
    form.appendTo('body');
     
    if(args.formData){
        for(var key in args.formData){
            var value = args.formData[key];
            form.append($('<input type="hidden" value="'+ value + '" name="' + key + '">'));
        }
    }
    
    var win = window.open('about:blank', args.target);
    form.attr('target', args.target);
    form.submit();
}

/**
 * Page exit 공통 event 정의
 * 
 * @param isSubmit
 * @param message
 * 
*/
var fn_exit_page = (function() {
	return function (message) {
		message = message == null ? "" : message;
		window.onbeforeunload = function(e) {
			e = e || window.event;
			
			//For IE and FireFox
			if(e) {
				e.returnValue = message;
			}
			
			//For Safari
			return message;
		}
	};
})();

/**
 * 검색문자와 동일한 문자에 강조처리
 * @param el 검색할 위치
 * @param str 검색어
 * @returns
 */
function searchBold(el,str){

	var $data = $(el+':contains("'+str+'")');
	
	$data.each(function(){
		$(this).html($(this).html().split(str).join('<strong>'+str+'</strong>'));
	});	
}

/**
 * User Information popup
 * @param userId user Id
 * @returns
 */
function userInformationPopup(userId){
		var status;
    $.ajax({
    	url: contextPath+"/identity/user/userInformAjax.do",
    	type: "POST",
    	data: {"userId":userId},
    	success: function(obj) {
    		var data = obj.data;
    		var photo = "/main/images/sw_sub/no_photo_58_57.png";
    		if(data.profileImage != null)
    			photo = "/main/common/fileDownload.do?downloadType=profileImage&fileId="+data.profileImage;
    		status = data.alreadyFollowing;
    		var html1 = " <div id=\"userInfoPop\" class=\"popup_layer\">" +
				"<div class=\"layer_alert2 reset\" style=\"width:600px;\">" +
				"  <div class=\"layer_header\">" +
				"    <span>프로필 요약 정보</span>" +
				"  </div>" +
				"  <div class=\"layer_con\">" +
				"    <div class=\"profile_top\">" +
				"      <div class=\"profile_name\">" +
				"        <span class=\"p\"><img src=\""+photo+"\" alt=\"\"></span>" +
				"        <span class=\"name\"><a id=\""+data.level+"\">"+data.nickName+"</a></span>" +
				"        <a class=\"go_home\" id=\"moveUserPage\" style=\"cursor:pointer;\"><i></i><span class=\"hide\">..이동</span></a>" +
				"      </div>" +
				"      <div class=\"my_activity_wrap\">"
			var html2 =	"        <div class=\"my_activity\">" +
				"          <div class=\"unit\">" +
				"            <i class=\"ico1\"></i>" +
				"            <span class=\"txt\">&nbsp;Rank&nbsp;</span>" +
				"          </div>" +
				"          <span class=\"num\">"+data.userRank+"</span>" +
				"        </div>" 
			var html3 =	"        <div class=\"my_activity\">" +
				"          <div class=\"unit\">" +
				"            <i class=\"ico2\"></i>" +
				"            <span class=\"txt\">Mentor</span>" +
				"          </div>" +
				"          <span class=\"num co1\">"+data.mentorRank+"</span>" +
				"        </div>" 
			var html4 =	"      </div>" +
				"    </div>" +
				"    <div class=\"profile_bottom\">" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Rank Point : </span>" +
				"        <span class=\"num\">"+numberWithCommas(data.pointRank)+"</span>" +
				"      </div>" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Mentor Point : </span>" +
				"        <span class=\"num\">"+numberWithCommas(data.pointMentor)+"</span>" +
				"      </div>" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Activity Point : </span>" +
				"        <span class=\"num\">"+numberWithCommas(data.pointActivity)+"</span>" +
				"      </div>" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Badge : </span>" +
				"        <span class=\"num\">"+data.totalBadgeCnt+"</span>" +
				"      </div>" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Following : </span>" +
				"        <span class=\"num\">"+data.totalFollowingCnt+"</span>" +
				"      </div>" +
				"      <div class=\"profile_info\">" +
				"        <span class=\"tit\">Follower : </span>" +
				"        <span id=\"uProPopFollowCnt\" class=\"num\">"+data.totalFollowerCnt+"</span>" +
				"      </div>" +
				"      <a id=\"uProFollowBtn\" class=\"btn_blue btn follower\" style=\"cursor:pointer;\">Follow</a>" +
				"    </div>" +
				"  </div>" +
				"  <a class=\"btn_close btn-layerClose\" style=\"cursor:pointer;\"><span class=\"hide\">닫기</span></a>" +
				"</div>" +
				"</div>";
    		
    		//1위부터 10위까지만 랭킹을 보여주도록 함
    		if(data.userRank < 1 || data.userRank > 10) html2 = "";
    		if(data.mentorRank < 1 || data.mentorRank > 10) html3 = "";
    		var html = html1 + html2 + html3 + html4;
    		
    		$("#userInfoPop").remove();
    		$('body').append(html);
    		layer_popup_position($("#userInfoPop"));
    		
    		if(data.alreadyFollowing == 2) {
    			//내 프로필
    			$("#uProFollowBtn").hide();
    		} else if(data.alreadyFollowing == 1) {
    			//이미 follow, unfollow 표시, 클릭 시 unfollow
    			$("#uProFollowBtn").removeClass("btn_blue").addClass("btn_line");
    			$("#uProFollowBtn").html("Following");
    		} else {
    			//아직 follow안됨, follow 표시, 클릭 시 follow
    			$("#uProFollowBtn").removeClass("btn_line").addClass("btn_blue");
    			$("#uProFollowBtn").html("Follow");
    		}
    		
    		$("#uProFollowBtn").click(function() {
    			if(status == 0) {
    				/*add follow*/
    				var url = "/main/userpage/addFriendFollowing.do";
    				var params = { "followUserId" : userId };
    				fq_ajax(url, params, function(ret) {
    					if(ret.success == true) {
    						$("#uProFollowBtn").removeClass("btn_blue").addClass("btn_line");
    						$("#uProFollowBtn").html("Following");
    						status = 1;
    						var number = parseInt($("#uProPopFollowCnt").html());
    						$("#uProPopFollowCnt").html(number+1);
    					}
    				}, function (request, err, ex) {
    					return true;
    				});
    			} else if(status == 1) {
    				/*remove follow*/
    				var url = "/main/userpage/removeFriendFollowing.do";
    				var params = { "followUserId" : userId };
    				fq_ajax(url, params, function(ret) {
    					if(ret.success==true) {
    						$("#uProFollowBtn").removeClass("btn_line").addClass("btn_blue");
    						$("#uProFollowBtn").html("Follow");
    						status = 0;
    						var number = parseInt($("#uProPopFollowCnt").html());
    						$("#uProPopFollowCnt").html(number-1);
    					}
    				}, function (request, err, ex) {
    					return true;
    				});
    			}
    		});
    		
    		$("#moveUserPage").click(function() {
    			var args = {
    					actionUri : "/main/userpage/home/userHome.do",
              formData : {
              	"userId" : data.userId
              }
    			};
    			fn_open_page_get(args);
    		});
    		
    		$("#userInfoPop").show();
    	}
    });
}

/**
 * post 방식으로 pop up 화면 오픈
 * 
    var args = {
        actionUri : url,
		width : width,
		height : height,
		title : pop-up window title,
        formData : {
        	"userId" : userId
        }
    }; 
 */

function fn_open_popup_page(args)
{
	var title = args.title == null ? "Softech Popup" : args.title;
    var form = $('<form></form>');
    form.attr('action', args.actionUri);
    form.attr('method', 'post');
    form.attr('target', args.title);
    form.appendTo('body');
    
    var width = args.width == null ? "400px" : args.width;
    var height = args.height == null ? "400px" : args.height;
    
	var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width="+width+", height="+height; 
	window.open("", args.title, status);
     
    if(args.formData){
        for(var key in args.formData){
            var value = args.formData[key];
            form.append($('<input type="hidden" value="'+ value + '" name="' + key + '">'));
        }
    }
    
    form.submit();
}


/**
 * 서버 현재시간 가져오기 (format : yyyyMMddHHmm)
 * format
 * yyyyMM : 201706
 * yyyyMMdd : 20170605
 * yyyy-MM-dd : 2017-06-05
 * yyyy-MM-dd HH:mm : 2017-06-05 13:47
 * yyyy-MM-dd HE:mE : 2017-06-05 23:59
 * yyyyMMdd HH:mm : 20170606 13:47 
 * 
 */
// 
function fn_serverToday(format)
{
	var xmlHttp;
	//분기하지 않으면 IE에서만 작동된다.
	if (window.XMLHttpRequest) { // IE 7.0 이상, 크롬, 파이어폭스일 경우 분기
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
	}
	else if (window.ActiveXObject) 
	{
		xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
	}
	
	var st = xmlHttp.getResponseHeader("Date");
	var curDate = new Date(st);
	var curDateFmt; var year = curDate.getFullYear();
	var month = curDate.getMonth()+1;
	var day = curDate.getDate();
	var hours = curDate.getHours();
	var minutes = curDate.getMinutes();
	
	if(parseInt(month) < 10)
	{
		month = 0 + "" + month;
	}
	if(parseInt(day) < 10)
	{
		day = 0 + "" + day;
	}
	if(parseInt(hours) < 10)
	{
		hours = 0 + "" + hours;
	} 
	if(parseInt(minutes) < 10)
	{
		minutes = 0 + "" + minutes;
	}
	
	switch( format )
	{
	case "yyyyMM": curDateFmt = parseInt(year + "" + month);
		break;
	case "yyyy-MM": curDateFmt = parseInt(year + "-" + month);
		break;
	case "yyyyMMdd": curDateFmt = parseInt(year + "" + month + "" + day);
		break;
	case "yyyy-MM-dd": curDateFmt = year + "-" + month + "-" + day;
		break;
	case "yyyy-MM-dd HH:mm": curDateFmt = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
		break;
	case "yyyy-MM-dd HE:mE": curDateFmt = year + "-" + month + "-" + day + " " + 23 + ":" + 59;
		break;
	case "yyyyMMdd HH:mm": curDateFmt = year + "" + month + "" + day + " " + hours + ":" + minutes;
		break;
	case "yyyyMMddHHmm": curDateFmt = year + "" + month + "" + day + "" + hours + "" + minutes;
		break;
	}

	// curDateFmt = parseInt(year + "" + month + "" + day + "" + hours + "" + minutes);
	return curDateFmt; 
}

function wordCheck(formId){
	var postData = new Object;
    $("#" + formId + " :input").each(function() {
        switch(this.type) {
            case 'text':
            case 'textarea':
            	var key = $(this).attr('id'); 
            	postData[key] = $("#"+key).val();
                break;
        }
    });
	var result = false;
	$.ajax({
		url : contextPath +"/forbiddenWord/wordCheck.do",
		data : postData,
		async: false,
		type: "POST",
		success : function(ret)
		{
			result = wordCheckSuccessHandler(ret);
		},
		error : function(request, err, ex)
		{
			fq_ajax_sys_error(request, err, ex)
		}
	});
	
	return result;
}

function wordCheckSuccessHandler(data){
	if(data.result != "" && data.result != null){
		doAlert("Your contents include forbidden words.");
		return false;
	}
	else {
		return true;
	}
}


/**
 * Page exit 공통 event 해제
 * 
*/
var fn_unbind_exit_page = (function() {
	return function () {
		window.onbeforeunload = null;
	};
})();

/*
 * 글씨입력수 표출
 * param : el, setArea 
 * */
/*
function fn_text_length_out( el, setArea )
{
	$(el).keyup(function(){
		bytesHandler( this, setArea );
	});
}
*/
function getTextLength(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		if (escape(str.charAt(i)).length == 6) {
			len++;
		}
		len++;
	}
	return len;
}

function bytesHandler(el, setArea){
	var text = $(el).val();
	$(setArea).text(getTextLength(text));
	
	return getTextLength(text);
}

function fn_cut_string(obj, setArea, maxByte){
    var text = $(obj).val();
    var leng = text.length;
    while(getTextLength(text) > maxByte){
        leng--;
        text = text.substring(0, leng);
        $(obj).val(text);
    }
    $(setArea).text(getTextLength(text));
}

/**
 * @param str <, > 변환이 필요한 string param
 * @returns <, > 값을 &lt;, &gt; 로 변환한 string return
 */
function fn_ckedit_string_replace(str) {
	var returnStr = str;
	returnStr = returnStr.replace(/</gi, "&lt;");
	returnStr = returnStr.replace(/>/gi, "&gt;");
	return returnStr;
}


/**
 * layer popup position set 함수
 */
function layer_popup_position(el) {
	var $el = $(el);
	var $elWidth = ~~($el.outerWidth()),
			$elHeight = ~~($el.outerHeight()),
			docWidth = $(document).width(),
			docHeight = $(document).height();

	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}
	
	$el.find('.btn-layerClose').click(function() {
		$el.fadeOut();
		return false;
	});
}

/**
 * 윤달 체크
 */
function fn_isValidDate(param) {
    try
    {
        param = param.replace(/-/g,'');

        // 자리수가 맞지않을때
        if( isNaN(param) || param.length!=8 ) {
            return false;
        }
         
        var year = Number(param.substring(0, 4));
        var month = Number(param.substring(4, 6));
        var day = Number(param.substring(6, 8));

        var dd = day / 0;

         
        if( month<1 || month>12 ) {
            return false;
        }
         
        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month-1];
         
        // 윤년 체크
        if( month==2 && ( year%4==0 && year%100!=0 || year%400==0 ) ) {
            maxDay = 29;
        }
         
        if( day<=0 || day>maxDay ) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }                       
}


/**
 * Number with Comma
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/**
 * Number with Character
 */
function numberWithCharacter(x) {
	var s = ['', 'K', 'M', 'B'];
	if(x == 0) {
		return "0";
	}
	
	var e = Math.floor(Math.log(x) / Math.log(1000));
	return Math.round(x / Math.pow(1000, e)) + s[e];
}

/**
 * RateString with TwoDecimalPlaces
 */
function rateStringWithTwoDecimalPlaces(x) {
	if(x < 100.0) {
		return x.toFixed(2);
	} else {
		return "100";
	}
}

/**
 * 
 */
function replaceSpecialSpring(x) {
	if(x == undefined || x == "" || x == null)
		return x;
	
	var returnStr = x;
	
	returnStr = returnStr.replace(/'/g, "&apos;");
	returnStr = returnStr.replace(/"/g, "&quot;");	
	
	return returnStr;
}

function checkEmoji(formId) {
	var result = true;
	
    $("#" + formId + " :input").each(function() {
        switch(this.type) {
            case 'text':
            case 'textarea':
            	var key = $(this).attr('id'); 
            	result = checkEmojiString($("#"+key).val());
                if(result == false) return result;
        }
    });
    
    return result;
}

function checkEmojiString(text){
	if(text == undefined || text == "" || text == null)
		return true;
	
	if(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(text)){
		doAlert("Your content contains unsupported characters.");
		return false;
	}
	
	return true;
}




