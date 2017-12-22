var basicToday;

// TEXT DAYINFO
function makeDayText(year, month, day, mode){
	// APPEND용 문자열 생성
	var appendStr = "";
	// 요일 출력을 위한 DATE객체 생성
	var findDay = new Date(year, month-1);
	// 요일 배열 생성
	var arrDays = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
	// 문자열 생성 및 조합
	appendStr += "<li>";
	appendStr += "<span id='text_year'>"+year+"</span><br>";
	if(month<10)
		appendStr += "0";
	appendStr += "<span id='text_month'>"+month+"</span>/";
	appendStr += "<span id='text_day'>";
	if(day<10)
		appendStr += "0";
	appendStr += day+"</span><br>";
	findDay.setDate(day);
	appendStr += "<span class='text_weekday'>"+arrDays[findDay.getDay()]+"</span>";
	appendStr += "</li>";
	
	switch(mode){
		case 0:
			$("#slider_slick").prepend(appendStr);
			return;
		case 1:
			// DAYTEXT 문자열 추가
			$("#slider_slick").append(appendStr);
			return;
	}
}

function findBasicDay(basicToday){	
	// 1번 모드로 진입했을 때, 현재날짜 기준 로드
	var tempYear = basicYear = basicToday.getFullYear();
	var tempMonth = basicMonth = basicToday.getMonth()+1;
	var tempDay = basicDay = basicToday.getDate();
	var lastDay = checkByLastday(basicYear, basicMonth);
	
	//기준 날짜 추가
	makeDayText(basicYear, basicMonth, basicDay, 1);
	var arrResult;
	var tempStr;
	tempStr = nextDayText(basicToday);
	arrResult = tempStr.split("/");
	makeDayText(arrResult[0], arrResult[1], arrResult[2], 1);
	tempStr = prevDayText(basicToday);
	arrResult = tempStr.split("/");
	makeDayText(arrResult[0], arrResult[1], arrResult[2], 0);
}

//날짜 증가 시
function nextDayText(basicToday){
	var tempYear = basicYear = basicToday.getFullYear();
	var tempMonth = basicMonth = basicToday.getMonth()+1;
	var tempDay = basicDay = basicToday.getDate();
	var lastDay = checkByLastday(basicYear, basicMonth);
	
	if(basicDay == lastDay){
		if(basicMonth == 12){
			tempYear = basicYear+1;
			tempMonth = 1;
			tempDay = 1;
			return tempYear + "/" + tempMonth + "/" + tempDay;
		}
		tempMonth = basicMonth+1;
		tempDay = 1;
		//다음 날짜 추가
		return tempYear + "/" + tempMonth + "/" + tempDay;
	}else{
		tempYear = basicYear;
		tempMonth = basicMonth;
		tempDay = basicDay+1;
		return tempYear + "/" + tempMonth + "/" + tempDay;
	}
}

//날짜 감소 시
function prevDayText(basicToday){
	var tempYear = basicYear = basicToday.getFullYear();
	var tempMonth = basicMonth = basicToday.getMonth()+1;
	var tempDay = basicDay = basicToday.getDate();
	var lastDay = checkByLastday(basicYear, basicMonth);
	
	if(basicDay == 1){
		if(basicMonth == 1){
			tempYear = basicYear-1;
			tempMonth = 12;
			tempDay = checkByLastday(tempYear, tempMonth);
			return tempYear + "/" + tempMonth + "/" + tempDay;
		}
		tempMonth = basicMonth-1;
		tempDay = checkByLastday(tempYear, tempMonth);
		return tempYear + "/" + tempMonth + "/" + tempDay;
	}else{
		tempYear = basicYear;
		tempMonth = basicMonth;
		tempDay = basicDay-1;
		return tempYear + "/" + tempMonth + "/" + tempDay;
	}
}

// 마지막날짜 체크
function checkByLastday(year, month){
	// 1~12월까지의 마지막날짜 배열
	var lastDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31); //기본 마지막일수 배열
	
	// 윤년,평년 예외처리
	// 윤년은 4년주기, 단 매 100년은 윤년제외, 단 매 400년은 윤년포함.
	var finderYear = year;
	if((finderYear%4 == 0 && finderYear%100 != 0) || finderYear%400 == 0){
		lastDay[1] = 29;
	}
	
	return lastDay[month-1];
}

function basicTodayChangeByTextlayer(index){
	var year = $(".slick-track li").eq(index).find("#text_year").html();
	var month = $(".slick-track li").eq(index).find("#text_month").html();
	var day = $(".slick-track li").eq(index).find("#text_day").html();
	
	basicToday = new Date(year, month-1, day);
}

function basicTodayChangeByListlayer(year, month, day){
	basicToday = new Date(year, month-1, day);
}

function slickDestroy(){
	$("#slider_slick").slick("unslick");	
	$("#slider_slick").empty();
}

function slickAdd(){
	$("#slider_slick").slick({
		  infinite:false,
		  initialSlide:1,
		  arrows:true,
		  prevArrow:'#arrow_left',
		  nextArrow:'#arrow_right'
	});
}

$(function(){
	basicToday = new Date();
	findBasicDay(basicToday);
	
	//DAYTEXT SLICK
	$("#slider_slick").slick({
		infinite:false,
		initialSlide:1,
		arrows:true,
		prevArrow:'#arrow_left',
		nextArrow:'#arrow_right'
	});
	
	$('#slider_slick').on("afterChange", function(event, slick, currentSlide, nextSlide){
		  if($("#arrow_left").attr("aria-disabled") == "true"){
			  basicTodayChangeByTextlayer(0);
			  slickDestroy();
			  findBasicDay(basicToday);
			  slickAdd();
			  listRefresh($(".slick-slide").eq(1));
			  createFiveList(basicToday.getFullYear()+""+(basicToday.getMonth()+1)+""+basicToday.getDate());
		  }
		  if($("#arrow_right").attr("aria-disabled") == "true"){
			  basicTodayChangeByTextlayer(2);
			  slickDestroy();
			  findBasicDay(basicToday);
			  slickAdd();
			  listRefresh($(".slick-slide").eq(1));
			  createFiveList(basicToday.getFullYear()+""+(basicToday.getMonth()+1)+""+basicToday.getDate());
		  }
	});
});