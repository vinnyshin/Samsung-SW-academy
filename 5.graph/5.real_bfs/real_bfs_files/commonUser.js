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
	
	$.map(un_array, function(n, i){
		if(n.name.indexOf('[') > -1 ){
			var array = n.name.match(/\[(.*?)\]\.(.*)/);
			var key = n.name.replace(array[0],"").replace(array[1],"").replace('[',"").replace(']',"");
			
			if(!_array[key]){
				// _array[key] = {};
				// 배열이 생성되어야 함.
				_array[key] = [];
			}
			else if( tmpObj[array[2]] )
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

//Bootbox alert
function doAlert(msg, doFunc) {
	if (doFunc == null)
		doFunc = function(res){};
	//bootbox.alert(msg,'','5',null, doFunc);
	
		var res;
		alert(msg);
		doFunc(res);
}

function doConfirm(msg, promptFnc) {
	if (promptFnc == null)
		promptFnc = function(res){};
	var res;
	res = confirm(msg);
	promptFnc(res);
	
		
	//bootbox.confirm(msg,'Confirm', promptFnc);
		
}