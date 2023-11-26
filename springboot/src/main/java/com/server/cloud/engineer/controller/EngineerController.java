package com.server.cloud.engineer.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sound.midi.SysexMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.server.cloud.alarm.service.AlarmService;
import com.server.cloud.command.EngSerProInfoWorkInfoVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.ProjectCusVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;
import com.server.cloud.engineer.service.EngineerService;

@RestController
@RequestMapping("/api/main")
public class EngineerController {

	@Autowired
	private EngineerService engineerService;

	@Value("@{aws_bucket_name}")
	private String aws_bucket_name;
	
	@Autowired
	@Qualifier("alarmService")
	private AlarmService alarmService;


	//팀원 프로젝트 리스트 

	@GetMapping("/engineer/newList/{eng_enid}")
	public ResponseEntity<List<EngSerProInfoWorkInfoVO>> newList(@PathVariable String eng_enid) {

		List<EngSerProInfoWorkInfoVO> CusProList = engineerService.newList(eng_enid);

		return new ResponseEntity<>(CusProList, HttpStatus.OK);
	}

	// 엔지니어별로 배정받은 프로젝트 불러오는 기능
	@GetMapping("/engineer/workDetail/{eng_enid}")
	public ResponseEntity<Map<String, Object>> enWorkDetailToInfo(@PathVariable String eng_enid) {

		List<EngSerProInfoWorkInfoVO> eSPIWlist = engineerService.engProInfo(eng_enid);
		List<ServerVO> serverList = engineerService.serverList();

		Map<String, Object> proInfoMap = new HashMap<>();
		proInfoMap.put("eSPIWlist", eSPIWlist);
		proInfoMap.put("serverList", serverList);

		return new ResponseEntity<>(proInfoMap, HttpStatus.OK);
	}
	
	
	@GetMapping("/engineer/newProjectDetail/{pro_id}")
	public ResponseEntity<Map<String,Object>> projectDetail(@PathVariable String pro_id){
		//
		Map<String,Object> map2 = engineerService.getProjectDetail(pro_id);
		List<ServerVO> list = engineerService.getProjectServer(pro_id);
		map2.put("list", list);
		return new ResponseEntity<>(map2,HttpStatus.OK);
	}

	// 작업상세내역서 등록 기능
	@PostMapping("/engineer/workDetail")
	public ResponseEntity<Integer> registWorkLogs(@RequestBody List<WorkInfoVO> ServerDetailsArray) {

		System.out.println(ServerDetailsArray.toString());
		int result = engineerService.registWorkLog(ServerDetailsArray);
		System.out.println(result);

		// 작업 로그 등록이 성공하면 성공 응답을 반환합니다.
		return new ResponseEntity<>(result, HttpStatus.OK);
	}


	//엔지니어 인원리스트 
	@GetMapping("/engineer/engineerList/{eng_enid}")
	public ResponseEntity<Map<String,Object>> engineerList(@PathVariable String eng_enid){
		List<EngineerVO> engineerList = engineerService.engineerListMap(eng_enid);
		Map<String, Object> engineerListMap = new HashMap<>();
		engineerListMap.put("engineerList", engineerList);
		return new ResponseEntity<>(engineerListMap, HttpStatus.OK);
	}


	// 엔지니어 점검목록 리스트
	@GetMapping("/engineer/inspectionList/{eng_enid}")
	public ResponseEntity<Map<String,Object>> inspectionList(@PathVariable String eng_enid){
		List<WorkInfoVO> inspectionList = engineerService.inspectionListMap(eng_enid);
		Map<String, Object> inspectionListMap = new HashMap<>();
		inspectionListMap.put("inspectionList", inspectionList);
		return new ResponseEntity<>(inspectionListMap, HttpStatus.OK);
		
	}


	//엔지니어 점검목록 리스트 -> 서버 모달
	@PostMapping("/engineer/inspectionList2")
	public ResponseEntity<Map<String, Object>>  serverDetailModal(@RequestBody Map<String, Object> data) {
		String server_id = data.get("serverId").toString();
		Map<String,Object> map2 = engineerService.serverDetailModal(server_id);
		List<WorkInfoVO> list = engineerService.pastInspectionHistoryList(server_id);
		map2.put("list", list);
		System.out.println(list.toString());

		return new ResponseEntity<>(map2, HttpStatus.OK);
	}
	

	@PostMapping("/engineer/editSchedule")
	public void editSchedule(@RequestBody ScheduleVO request) {
		ServerVO vo = alarmService.getServerVO(request.getSche_num());
        String[] ar = request.getSche_startdate().toString().split(" ");
		String[] ar2 = request.getSche_enddate().toString().split(" ");
        String msg = "("+vo.getServer_name()+") 점검 일정이 "+ar[0]+"~"+ar2[0]+"로 변경 됐습니다. ";

		engineerService.editSchedule(request);
		alarmService.editSchedule(msg , request.getSche_num());
		
	}

	
	@PostMapping("/engineer/updateWorkStatus")
	public ResponseEntity<Integer> updateWorkStatus(@RequestBody Map<String, Object> updateStatus) {
		
		String work_status = updateStatus.get("workStatus").toString();
		String server_id = updateStatus.get("server_id").toString();
		
		int result = engineerService.updateWorkStatus(work_status, server_id);
		System.out.println(result);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	
	//승용 서버 이름 가져 오기
	@PostMapping("/engineer/getServer")
	public ResponseEntity<?>getServer(@RequestBody Map<String,Object> id){
		List<ServerVO>vo=engineerService.getServer((String)id.get("id"));
		
		return new ResponseEntity<>(vo,HttpStatus.OK);
	}
	//승용 스케줄별 아이디 이름 등 가져 오기
	@PostMapping("/engineer/getScheInfo")
	public ResponseEntity<?>getScheInfo(@RequestBody Map<String,Object> id){
		
		ScheduleVO VO=engineerService.getScheInfo((String)id.get("sche_num"));
		
		return new ResponseEntity<>(VO,HttpStatus.OK);
	}

	
	@PostMapping("/engineer/getEngineerInfo")
	public ResponseEntity<?>getEnInfo(@RequestBody Map<String,Object> en_enid){
		
		System.out.println(en_enid.toString());
		EngineerVO vo=engineerService.getEnInfo((String)en_enid.get("en_id"));
		return new ResponseEntity<>(vo,HttpStatus.OK);
	}
	
	
}
