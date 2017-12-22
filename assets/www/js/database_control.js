// DATABASE 제어용 변수 설정
var database = null;

// DATABASE 연결
function openDataBase(){
	database = window.openDatabase("plan","1.0","DB",1024*1024);
}

// TABLE 생성 _ FIVEPLAN
function createSql(){
	database.transaction(function(tr){
		// CREATE TABLE
		var createTable = "create table if not exists fivelist"
							+"(fDate integer primary key, fPlan1 text, fPlan2 text, fPlan3 text, fPlan4 text, fPlan5 text)";
		tr.executeSql(createTable); // SQL 적용
	});
}

//TABLE 생성 _ HABITPLAN
function createSqlByHabit(){
	database.transaction(function(tr){
		// CREATE TABLE
		var createHabitTable = "create table if not exists habitlist"
							+"(hNo integer primary key autoincrement, hTitle text, hInfo text, hStart integer, hTerm integer, hCheck integer)";
		tr.executeSql(createHabitTable); // SQL 적용
	});
}

// TABLE 삭제
function deleteSql(){
	database.transaction(function(tr){
		// DELETE TABLE
		var dropTable = "drop table fivelist";
		tr.executeSql(dropTable); // SQL 적용
		var dropTable = "drop table habitlist";
		tr.executeSql(dropTable); // SQL 적용
		
	})
}

// DATA 검색 (FIVEPLAN 날짜기준)
function selectSqlByFiveplan(date, mode){
	database.transaction(function(tr){
		var sqlCommand = "select * from fivelist where fDate=?";
		tr.executeSql(sqlCommand, [date], function(tr, rs){
			console.log("select success");
			console.log(rs);
			//if($(rs.rows).length > 0){console.log("DATA가 이미 존재합니다.");}
			switch(mode){
				case "MAKELIST":
					if(rs.rows.length == 0){
						console.log("정지!");
						dataloadFail();
						return;
					}
					var obj = rs.rows.item(0);
					var arrPlan = new Array();
					arrPlan[0] = obj.fPlan1;
					arrPlan[1] = obj.fPlan2;
					arrPlan[2] = obj.fPlan3;
					arrPlan[3] = obj.fPlan4;
					arrPlan[4] = obj.fPlan5;
					makeFiveList(arrPlan);
					break;
			}
		}, function(tr, err){
			console.log("select fail");
			console.log(err);
		});
	});
}

//DATA 검색 (HABITPLAN 날짜기준)
function selectSqlByHabitplan(date, mode){
	database.transaction(function(tr){
		var sqlCommand = "select * from habitlist where hStart=?";
		tr.executeSql(sqlCommand, [date], function(tr, rs){
			console.log("select success");
			console.log(rs);
			//if($(rs.rows).length > 0){console.log("DATA가 이미 존재합니다.");}
			switch(mode){
				case "MAKELIST":
					if(rs.rows.length == 0){
						console.log("정지!");
						dataloadFail();
						return;
					}
					var arrHabit = new Array();
					$(rs.rows).each(function(index, obj){
						console.log(obj);
						arrHabit[index] = obj;
					});
					makeHabitList(arrHabit);
					break;
			}
		}, function(tr, err){
			console.log("select fail");
			console.log(err);
		});
	});
}

// DATA 추가 _ FIVELIST
function insertSqlByFiveplan(plan1, plan2, plan3, plan4, plan5){
	database.transaction(function(tr){
		var sqlCommand = "insert into fivelist(fDate, fPlan1, fPlan2, fPlan3, fPlan4, fPlan5) values(20171222,?,?,?,?,?)";
		tr.executeSql(sqlCommand, [plan1, plan2, plan3, plan4, plan5], function(tr, rs){
			console.log("insert success");
			console.log(rs);
		},function(tr, err){
			console.log("insert fail");
			console.log(err);
		});
	});
}

//DATA 추가 _ HABITLIST
function insertSqlByHabitplan(hTitle, hInfo, hStart, hTerm, hCheck){
	database.transaction(function(tr){
		var sqlCommand = "insert into habitlist(hTitle, hInfo, hStart, hTerm, hCheck) values(?,?,?,?,?)";
		tr.executeSql(sqlCommand, [hTitle, hInfo, hStart, hTerm, hCheck], function(tr, rs){
			console.log("insert success");
			console.log(rs);
		},function(tr, err){
			console.log("insert fail");
			console.log(err);
		});
	});
}

$(function(){
	openDataBase();
	//deleteSql();
	//createSql();
	//createSqlByHabit();
	//insertSqlByFiveplan("잠자기", "밥먹기", "공부하기", "놀기", "멍때리기");
	//insertSqlByHabitplan("습관1", "습관정보", 20171222, 66, 0);
	//selectSqlByFiveplan(20171222);
});