// PLAN ZONE 생성 및 관리 _ NAVBAR 연동
// 첫번째 페이지 오늘 해야할 목록을 보여준다
// 두번째 현재 진행중인 PLAN LIST를 보여준다 (66일 습관달력 목록)
// 세번째 다가올 주요 D-DAY LIST를 보여준다 (EX:시험일자) 

function createFiveList(date){
	// DB > FIVEPLAN LOAD
	selectSqlByFiveplan(date, "MAKELIST");
}

function createHabitList(date){
	// DB > FIVEPLAN LOAD
	selectSqlByHabitplan(date, "MAKELIST");
}

function makeFiveList(arrFiveplan){
	var str = "";
	str += "<ul>";
	for(var index=0 ; index<5 ; index++){
		str += "<li class='fiveplan_child'>";
		str += "<p>"+ arrFiveplan[index] +"</p>";
		str += "<p class='fiveplan_button'><a href='#'>SUCCESS</a>&nbsp;&nbsp;&nbsp;<a href='#'>EDIT</a></p>"
		str += "</li>";
	}
	str += "</ul>";
		
	controllerPlanzone(str);
}

function dataloadFail(){
	var str = "";
	str += "해당 날짜에 해당하는 플랜이 존재하지 않습니다.";
	
	controllerPlanzone(str);
}

function controllerPlanzone(str){
	$("#plan_zone").empty();
	$("#plan_zone").append(str);
}

function formatDate(){
	var str = "";
	var date = new Date();
	str += date.getFullYear() + "";
	str += (date.getMonth()+1) + "";
	str += date.getDate() + "";  
	
	return str;
}

function makeHabitList(arrHabitplan){
	var str = "";
	str += "<ul class='habitplan_parent'>";
	console.log(arrHabitplan[0],arrHabitplan[1],arrHabitplan[2],arrHabitplan[3],arrHabitplan[4],arrHabitplan[5]);
	for(var index=0 ; index<arrHabitplan.length ; index++){
		str += "<li class='habitplan_child'>";
		str += "<p>"+ arrHabitplan[index].hTitle +"</p>";
		str += "<p>"+ arrHabitplan[index].hInfo +"</p>";
		str += "<div class='number-pb'><div class='number-pb-shown'></div></div>"
		str += "</li>";
	}
	str += "</ul>";
		
	controllerPlanzone(str);
}
/*<ul class="habitplan_parent">
<li class="habitplan_child">
	습관만들기TITLE<br>
	습관만들기 INFO<br>
	<div class="number-pb">
	    <div class="number-pb-shown"></div>
    </div>
</li>
</ul>*/

$(function(){
	createFiveList(formatDate());
	//createHabitList(formatDate());
});