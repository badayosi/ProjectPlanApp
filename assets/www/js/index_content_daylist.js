var dayListPosition;

// Mode 선택에 따른 반환값 선택
function findCalendar(year, month, day, mode){
	//MODE 비선택시 함수실행 막음
	if(year == null || mode == null){
		console.log("YEAR, MODE를 반드시 선택해야합니다.");
		return;
	}

	// 1~12월까지의 마지막날짜 배열
	var lastDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31); //기본 마지막일수 배열
	
	// 윤년,평년 예외처리
	// 윤년은 4년주기, 단 매 100년은 윤년제외, 단 매 400년은 윤년포함.
	var finderYear = year;
	if((finderYear%4 == 0 && finderYear%100 != 0) || finderYear%400 == 0){
		lastDay[1] = 29;
	}
	
	//SWITCH-CASE용 DATE변수 생성
	var findDate = new Date();
	//SWITCH-CASE용 요일배열 생성
	var arrDays = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	
	//MODE에 따른 반환결과 변경
	switch(mode){
		case 1://월에 따른 마지막 일수
			return lastDay[month-1];
		case 2://날짜에 따른 요일
			findDate.setFullYear(year);
			findDate.setMonth(month-1);
			findDate.setDate(day);
			return findDate.getDay();
		case 3:
			var dateStr = "";
			dateStr += year+"/";
			dateStr += month+"/";
			if(day<10)
				dateStr += "0";
			dateStr += day;
			return dateStr;
	}
}

function makeDayList(year, month, lastDay){
	// APPEND용 문자열 생성
	var appendStr = "";
	// 요일 출력을 위한 DATE객체 생성
	var findDay = new Date(year, month-1);
	// 요일 배열 생성
	var arrDays = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	
	// 마지막날짜까지 FOR문 진행
	for(var day=1;day<=lastDay;day++){
		// 문자열 생성 및 조합
		appendStr += "<li>";
		appendStr += "<span class='index_year'>"+year+"</span><br>";
		appendStr += "<span class='index_month'>"+month+"</span>/";
		appendStr += "<span class='index_day'>";
		if(day<10)
			appendStr += "0";
		appendStr += day+"</span><br>";
		findDay.setDate(day);
		appendStr += "<span class='index_weekday'>"+arrDays[findDay.getDay()]+"</span>";
		appendStr += "</li>";
		// LIST 문자열 추가
		$("#daylist").append(appendStr);
		// APPEND용 문자열 초기화
		appendStr = "";
	}	
}

function findDayByText(obj){
	var year = $(obj).find("span").eq(0).html();
	var month = $(obj).find("span").eq(1).html();
	var day = $(obj).find("span").eq(2).html();
	
	return year+"/"+month+"/"+day;
}

function listSetPosition(){
	$("#calendar_layer").scrollTop(dayListPosition);
}

function listRefresh(target){
	$("#daylist li").removeClass("selectList");
	$("#daylist li").each(function(index, obj){
		if(findDayByText(obj) == findDayByText(target)){
			$(obj).addClass("selectList");
		}
	});
}

$(function(){
	//현재 날짜 로드
	var today = new Date();
	
	//현재 날짜의 마지막 일수 로드
	var lastDay = findCalendar(today.getFullYear(), today.getMonth()+1, today.getDate(), 1);
	
	//현재 날짜 기준 달력생성
	makeDayList(today.getFullYear(), today.getMonth()+1, lastDay);
	
	//현재 날짜 위치설정
	$("#daylist li").each(function(index, obj){
		if(findDayByText(obj) == findCalendar(today.getFullYear(), today.getMonth()+1, today.getDate(), 3)){
			dayListPosition = $(obj).position().top;
			$(obj).addClass("selectList");
		}
	});
	
	$("#daylist li").on("click", function(){
		$("#daylist li").removeClass("selectList");
		$(this).addClass("selectList");
		var tempStr = findDayByText($(this));
		var arrResult = tempStr.split("/");
		basicTodayChangeByListlayer(arrResult[0], arrResult[1], arrResult[2]);
		slickDestroy();
		findBasicDay(basicToday);
		slickAdd();
		createFiveList(arrResult[0]+""+arrResult[1]+""+arrResult[2]);
	});
});