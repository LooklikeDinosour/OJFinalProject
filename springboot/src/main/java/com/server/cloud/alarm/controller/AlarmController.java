package com.server.cloud.alarm.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.cloud.alarm.service.AlarmService;
import com.server.cloud.command.AlarmVO;


@RestController
@RequestMapping("/api/main/alarm")
public class AlarmController {
	
//	관리자
//	프로젝트 요청 들어왔을 때 (클라-> 관리) vvvv
//	엔지니어 팀장
//	프로젝트 배정 받았을때  (관리 -> 엔팀) vvvv
//	엔지니어 
//	프로젝트 배정 받았을때 (엔팀-> 엔지니어) vvvv
//	오늘 정기점검이면 (메인들어오면서)
//	긴급 요청 받았을때 (클라-> 엔지니어)
//
//	클라
//	엔지니어 배정 받았을때 vvvv
//	오늘 정기점검날일때
	
	@Autowired
	@Qualifier("alarmService")
	private AlarmService alarmService;
	
//	 @PostMapping("/createPro") //클라이언트가 프로젝트 등록 했을 때 (관리자에게 알림)
//	 public void createPro(@RequestBody Map<String, Object> map){
//		 alarmService.createProAlarm(map.get("proname").toString());//프로젝트명,관리자아이디 필요	    
//	 }
//	 
//	 @PostMapping("/assignTeam") // 관리자가 팀 배정 했을 때 (해당 팀 팀장에게 알림)
//	 public void assignTeam(@RequestBody Map<String, Object> map) {
//		 alarmService.assignTeam(map.get("select_team").toString()); //팀명 필요
//		 
//	 }
//	 @PostMapping("/assignEngineer") // 팀장이 팀원 배정했을 때 (해당 팀원 , 클라이언트에게 알림)
//	 public void assignEngineer(@RequestBody Map<String,Object> map) {
//		 alarmService.assignEngineer(map.get("engId").toString()); //엔지니어아이디 필요
//		 alarmService.assignClient(map.get("cusId").toString()); //프로젝트 담당자 아이디 필요
//	 }

//	 @GetMapping("/todayAlarmEng")
//	 public void todayAlarmEng(@RequestBody Map<String,Object> map) { // 로그인 후에 오늘의 정기점검 여부 확인
//		 String eng_id = map.get("eng_id").toString();
//		 int a = alarmService.todayAlarmCheck(eng_id);//확인
//		 if(a>0) alarmService.todayAlarmEng(eng_id);
//		 String cus_id = map.get("cus_id").toString();
//		 int b = alarmService.todayAlarmCheck2(cus_id);//확인
//		 if(b>0)alarmService.todayAlarmCus(cus_id);
//	 }

//	 @PostMapping("/emergencyRequest") // 요청 들어오면 팀장에게 알림
//	 public void emergencyRequest(@RequestBody Map<String,Object> map) { 
//		 alarmService.emergencyRequest(map.get("serverName").toString(), map.get("proName").toString());
//	 }
	 @GetMapping("/assignEmer/") // 긴급요청 배정되면 엔지니어, 클라이언트한테 알림
	 public void assignEmer(@RequestBody Map<String,Object> map) {
		 //pro_id eng_enid server_id pro_startdate
		 alarmService.assignEmerEng(map.get("engid").toString());
		 alarmService.assignEmerCus(map.get("serverId").toString());		 
	 }

	 @GetMapping("/getAlarmList")
	 public ResponseEntity<List<AlarmVO>> getAlarmList(@RequestParam("user_id") String user_id){		 
		 List<AlarmVO> list = alarmService.getAlarmList(user_id);
		return new ResponseEntity<>(list,HttpStatus.OK); 
	 }
	 
	 @GetMapping("/getAllAlarm")
	 public ResponseEntity<List<AlarmVO>> getAllAlarm(@RequestParam("user_id") String user_id){
		 List<AlarmVO> list = alarmService.getAllAlarm(user_id);
		 return new ResponseEntity<>(list,HttpStatus.OK);
	 }
	 
	 @PostMapping("/changeAlarm") // 읽음으로 수정하게
	 public void changeAlarm(@RequestBody Map<String, String> data) {
		alarmService.changeAlarm(data.get("alarmNum"));
		 
	 }
	 
}
