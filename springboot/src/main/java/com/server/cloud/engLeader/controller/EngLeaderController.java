package com.server.cloud.engLeader.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.cloud.alarm.service.AlarmService;
import com.server.cloud.command.CusVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.InsRequestVO;
import com.server.cloud.command.ProjectInfoVO;
import com.server.cloud.command.QueryVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;
import com.server.cloud.engLeader.service.EngLeaderService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main/engleader")
public class EngLeaderController {

	@Qualifier("engLeaderService")
	private final EngLeaderService engLeaderService;
	
	@Qualifier("alarmService")
	private final AlarmService alarmService;
	
	@GetMapping("/info")
	public ResponseEntity<Map<String,String>> getLeaderInfo(@RequestParam("user_id") String leaderId){
		Map<String,String> map = engLeaderService.getLeaderInfo(leaderId);
		System.out.println(map.toString());
		return new ResponseEntity<>(map,HttpStatus.OK);
	}

	@GetMapping("/main")
	public ResponseEntity<Map<String,Object>> getMain(@RequestParam("userId") String leaderId){

		System.out.println(leaderId);
		QueryVO vo = engLeaderService.getAllMain(leaderId); //팀의 팀원수 , 진행중 프로젝, 총 서버수, 이번달에 신규계약수, 계약종료
		List<ProjectInfoVO> list = engLeaderService.getNewProject(leaderId); //신규요청리스트
		List<QueryVO> inspectionList = engLeaderService.getInspection(leaderId); //월별점검내역리스트
		List<Integer> periodic = new ArrayList<>(); //정기
		List<Integer> disability = new ArrayList<>(); //장애
		List<Integer> maintenance = new ArrayList<>(); //유지			
		for(QueryVO vo2 : inspectionList) {
			periodic.add(vo2.getPeriodic()); //월별 정기점검 모음
			disability.add(vo2.getDisability()); //월별 장애대응 모음
			maintenance.add(vo2.getMaintenance()); //월별 유지보수 모음
		}
		Map<String,Object> map2 = new HashMap<>();
		map2.put("vo", vo);
		map2.put("list", list);
		map2.put("periodic",periodic);
		map2.put("disability", disability);
		map2.put("maintenance", maintenance);

		return new ResponseEntity<>(map2,HttpStatus.OK);
	}

	@GetMapping("/requestDetail/{pro_id}")
	public ResponseEntity<Map<String,Object>> requestDetail(@PathVariable String pro_id){
		Map<String,Object> map2 = engLeaderService.getRequestDetail(pro_id);
		List<ServerVO> list = engLeaderService.getRequestServer(pro_id);
		map2.put("list", list);
		return new ResponseEntity<>(map2,HttpStatus.OK);
	}

	@GetMapping("/getTeamEngList")
	public ResponseEntity<List<EngineerVO>> getTeamEngList(@RequestParam("pro_pi") String pro_pi ,@RequestParam("leader_id") String leader_id){
		List<EngineerVO> list= engLeaderService.getTeamEngList(pro_pi,leader_id);
		return new ResponseEntity<>(list,HttpStatus.OK);
	}

	@PostMapping("/assignEng")
	public ResponseEntity<String> assignEng(@RequestBody Map<String,Object> data) {
		String eng_enid = data.get("eng_enid").toString();
		String pro_id = data.get("pro_id").toString();
		String server_id = data.get("server_id").toString();
		engLeaderService.assignEng(eng_enid, server_id);
		engLeaderService.registSchedule(eng_enid, server_id);
		alarmService.assignEngineer(eng_enid); 
		alarmService.assignClient(pro_id); 
    engLeaderService.updatePro(pro_id);
		return new ResponseEntity<>("ok",HttpStatus.OK);	
	}


	@GetMapping("/getAllPro")
	public ResponseEntity<List<ProjectInfoVO>> getAllPro(@RequestParam("userId") String leader_id){	
		List<ProjectInfoVO> list=engLeaderService.getAllPro(leader_id);	
		return new ResponseEntity<>(list,HttpStatus.OK);
	}

	@GetMapping("/projectDetail/{pro_id}")
	public ResponseEntity<Map<String,Object>> projectDetail(@PathVariable String pro_id){
		Map<String,Object> map2 = engLeaderService.getRequestDetail(pro_id);
		List<ServerVO> list = engLeaderService.getRequestServer2(pro_id);

		
		map2.put("list", list);
		return new ResponseEntity<>(map2,HttpStatus.OK); 
	}
	
	@GetMapping("/getClient")
	public ResponseEntity<List<CusVO>> getClient(@RequestParam("userId") String leader_id){
		List<CusVO> list = engLeaderService.getClient(leader_id);
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/getEngineerList")
	public ResponseEntity<List<EngineerVO>> getEngineerList(@RequestParam("userId") String leader_id){
		List<EngineerVO> list = engLeaderService.getTeamEngList2(leader_id);
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/getClientInfo/{cus_id}")
	public ResponseEntity<Map<String,Object>> getClientInfo(@PathVariable String cus_id){		
		CusVO vo = engLeaderService.getClientInfo(cus_id);
		List<ProjectInfoVO> list = engLeaderService.clientProjects(cus_id);
		Map<String,Object> map = new HashMap<>();
		map.put("vo", vo);
		map.put("list", list);
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	@GetMapping("/getEngInfo/{eng_enid}")
	public ResponseEntity<Map<String,Object>> getEngInfo(@PathVariable String eng_enid){
		List<ServerVO> list = engLeaderService.getEngServer(eng_enid);
		Map<String,Object> map = new HashMap<>();
		map.put("serverList", list);
		List<ScheduleVO> sche = engLeaderService.getEngSchedule(eng_enid);
		map.put("scheList",sche);
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
//	@GetMapping("/getEngInfo2/{eng_enid}")
//	public ResponseEntity<Map<String,Object>> getEngInfo2(@PathVariable String eng_enid){
//		List<ServerVO> list = engLeaderService.getEngSchedule2(eng_enid);
//		
//		
//		return new ResponseEntity<>(list,HttpStatus.OK);
//	}
	
	@GetMapping("/getAllSche")
	public ResponseEntity<List<ScheduleVO>> getAllSche(@RequestParam("userId") String leader_id){
		
		List<ScheduleVO> list = engLeaderService.getAllSchedule(leader_id);		
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/getWorkInfo")
	public ResponseEntity<List<WorkInfoVO>> getWorkInfo(@RequestParam("server_id") String server_id){
		List<WorkInfoVO> list = engLeaderService.getWorkInfo(server_id);	
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	
	//점검 요청 목록
	@GetMapping("/insRequestList")
	public ResponseEntity<ArrayList<InsRequestVO>> getInsRequestList(){
			
		ArrayList<InsRequestVO> list = engLeaderService.getInsRequestList();
		System.out.println("리스트 내용:" + list);
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	//점검 요청 팀원 배정 목록 
	@GetMapping("/getTeamEngList2")
	public ResponseEntity<List<EngineerVO>> getTeamEngList2(@RequestParam("pro_pi") String pro_pi, 
															@RequestParam("leader_id") String leader_id){
		List<EngineerVO> list= engLeaderService.getTeamEngList(pro_pi,leader_id);
		return new ResponseEntity<>(list,HttpStatus.OK);
	}

	//점검 요청 팀원 배정 
	@PostMapping("/assignEng2")
	public ResponseEntity<String> assignEng2(@RequestBody Map<String,Object> data) {
		String eng_enid = data.get("eng_enid").toString();
		String pro_id = data.get("pro_id").toString();
		String server_id = data.get("server_id").toString();
		String insRequest_num = data.get("insRequest_num").toString();	
		String pro_startdate = data.get("pro_startdate").toString();
		String insRequest_type = data.get("insRequest_type").toString();
		
		//System.out.println(eng_enid+" "+pro_id+" "+server_id+" "+insRequest_num+" "+pro_startdate);
		engLeaderService.insRegistSchedule(eng_enid, server_id, pro_startdate, insRequest_type);
		engLeaderService.checkInsRequest(insRequest_num);
		alarmService.assignEmerEng(eng_enid);
		alarmService.assignEmerCus(server_id);		 
		return new ResponseEntity<>("ok",HttpStatus.OK);	
	}
	
	

}
