package com.server.cloud.admin.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.cloud.admin.service.AdminService;
import com.server.cloud.alarm.service.AlarmService;
import com.server.cloud.command.AdminMainVO;
import com.server.cloud.command.CsVO;

import com.server.cloud.command.CusVO;

import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.NoticeVO;
import com.server.cloud.engLeader.service.EngLeaderService;
import com.server.cloud.command.ProjectCusVO;
import com.server.cloud.command.ServerVO;

import com.server.cloud.command.ProjectDetailVO;
import com.server.cloud.command.ProjectInfoVO;
import com.server.cloud.command.QueryVO;
import com.server.cloud.command.WorkInfoVO;
import com.server.cloud.engLeader.service.EngLeaderService;
import com.server.cloud.pagenation.Criteria;

@RequiredArgsConstructor
@RestController
public class AdminController {


	@Qualifier("adminSerivce")
	private final AdminService adminService;

	@Qualifier("alarmService")
	private final AlarmService alarmService;

	@Qualifier("engLeaderService")
	private final EngLeaderService engLeaderService;

	private Criteria cri = new Criteria();

	@GetMapping("/api/main/AnnoList")//공지사항 게시판 목록 불러오기
	public ResponseEntity<?> getList(@RequestParam("currentPage") int currentPage,@RequestParam("postsPerPage")int postsPerPage,String role){

		long start = System.currentTimeMillis();

		cri.setPage(currentPage);
		cri.setAmount(postsPerPage);
		cri.setRole(role);

		List<NoticeVO> notice = adminService.getList(cri);
		System.out.println("공지사항 캐시 : " + (System.currentTimeMillis() - start));
		return new ResponseEntity<>(notice,HttpStatus.OK);
	}

	@GetMapping("/api/main/admin/AnnoTotal")
	public ResponseEntity<?>getTotal(String role){
		return new ResponseEntity<>(adminService.getTotal(role),HttpStatus.OK);
	}


	//회원관리 - 엔지니어

	@GetMapping("/api/main/csList")//문의사항 목록 불러오기(admin)
	public ResponseEntity<?> csList(@RequestParam("currentPage") int currentPage,@RequestParam("postsPerPage")int postsPerPage){
		Map<String, Integer>page= new HashMap<>();
		cri.setPage(currentPage);
		cri.setAmount(postsPerPage);
		cri.setCs_writer(null);

		List<CsVO> notice=adminService.csList(cri);



		return new ResponseEntity<>(notice,HttpStatus.OK);
	}
	@GetMapping("/api/main/csUserList")//문의사항 목록 불러오기(user)
	public ResponseEntity<?> csUserList(@RequestParam("currentPage") int currentPage,
			@RequestParam("postsPerPage")int postsPerPage,
			@RequestParam("cs_writer")String cs_writer){
		Map<String, Integer>page= new HashMap<>();
		cri.setPage(currentPage);
		cri.setAmount(postsPerPage);
		cri.setCs_writer(cs_writer);

		List<CsVO> notice=adminService.csList(cri);



		return new ResponseEntity<>(notice,HttpStatus.OK);
	}
	@GetMapping("/api/main/csEngineerList")//문의사항 목록 불러오기(engineer&engineerLeader)
	public ResponseEntity<?> csEngineerList(@RequestParam("currentPage") int currentPage,
			@RequestParam("postsPerPage")int postsPerPage,
			@RequestParam("cs_writer")String cs_writer,
			@RequestParam("role")String role){
		Map<String, Integer> page = new HashMap<>();
		EngineerVO vo = adminService.engGetinfo(cs_writer);
		cri.setEng_taem_num(vo.getTeam_num());
		cri.setPage(currentPage);
		cri.setAmount(postsPerPage);
		cri.setCs_writer(cs_writer);
		cri.setRole(role);
		List<CsVO> notice=adminService.csEnList(cri);
		List<CsVO> notice1=adminService.csEnListMy(cri);
		
		for (int i = 0; i < notice1.size(); i++) {
			notice.add(notice1.get(i));
		}

		return new ResponseEntity<>(notice,HttpStatus.OK);
	}
	@GetMapping("/api/main/csEngineerLeaderList")//문의사항 목록 불러오기(engineer&engineerLeader)
	public ResponseEntity<?> csEngineerLeaderList(@RequestParam("currentPage") int currentPage,
			@RequestParam("postsPerPage")int postsPerPage,
			@RequestParam("cs_writer")String cs_writer,
			@RequestParam("role")String role){
		Map<String, Integer>page= new HashMap<>();
		EngineerVO vo= adminService.engGetinfo(cs_writer);
		cri.setEng_taem_num(vo.getTeam_num());
		cri.setPage(currentPage);
		cri.setAmount(postsPerPage);
		cri.setCs_writer(cs_writer);
		cri.setRole(role);
		List<CsVO> notice=adminService.csEnLeaderList(cri);
		System.out.println(notice.toString());
		List<CsVO> notice1=adminService.csEnLeaderListMy(cri);
		
			
		for (int i = 0; i < notice1.size(); i++) {
			notice.add(notice1.get(i));
		}
		
		return new ResponseEntity<>(notice,HttpStatus.OK);
	}
	
	@GetMapping("/api/main/admin/csTotal")//문의사항 목록 토탈개수(admin)
	public ResponseEntity<?>csTotal(){
		return new ResponseEntity<>(adminService.csTotal(),HttpStatus.OK);
	}
	@GetMapping("/api/main/admin/csUserTotal")//문의사항 목록 토탈개수(user)
	public ResponseEntity<?>csUserTotal(@RequestParam("cs_writer")String cs_writer){
		return new ResponseEntity<>(adminService.csUserTotal(cs_writer),HttpStatus.OK);
	}
	@GetMapping("/api/main/csUpdate")
	public ResponseEntity<?>csUpdate(CsVO vo){

		adminService.csUpdate(vo);

		return new ResponseEntity<>("업데이트가 완료되었습니다.",HttpStatus.OK);
	}


	@GetMapping("api/main/admin/engineerList")
	public List<EngineerVO> adEngineerList(EngineerVO engineerVO){
		return adminService.adEngineerList(engineerVO);
	}


	//회원관리 - 기업
	@GetMapping("api/main/admin/customerList")
	public List<CusVO> adClientList(CusVO cusVO){
		List<CusVO> list = adminService.adClientList(cusVO);
		System.out.println(list.toString());
		return adminService.adClientList(cusVO);
	}
	

	@GetMapping("/api/main/admin")
	public ResponseEntity<Map<String,Object>> getMain(){

		List<ProjectCusVO> newPL = adminService.newProjectList(); //신규요청리스트
		AdminMainVO vo = adminService.getAdminMain(); // 클라이언트 인원수, 진행중인 프로젝트, 신규요청 프로젝트, 엔지니어 수
	
		
		List<AdminMainVO> inspectionList = adminService.getInspection(); //월별 계약 수 
		List<Integer> contracts = new ArrayList<>(); //계약건수
		List<Integer> expiration = new ArrayList<>(); //계약 만료
		
		List<AdminMainVO> work = adminService.getwork();
		List<Integer> periodic = new ArrayList<>(); //정기
		List<Integer> emergency = new ArrayList<>(); //긴급
		List<Integer> approval = new ArrayList<>(); //승인대기중		
		List<Integer> complete = new ArrayList<>(); //계약만료		
		

		
		for(AdminMainVO vo2 : inspectionList) {
			contracts.add(vo2.getContracts()); //월별 계약건수
			expiration.add(vo2.getExpiration()); //월별 계약 만료
		}
		
		for(AdminMainVO vo3 : work) {
			periodic.add(vo3.getPeriodic()); //정기
			emergency.add(vo3.getEmergency()); //긴급
			approval.add(vo3.getApproval()); //승인대기중
			complete.add(vo3.getComplete()); //계약만료
		}
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("vo",vo);
		map.put("newPL",newPL);
		map.put("contracts", contracts);
		map.put("expiration", expiration);
		map.put("periodic",periodic);
		map.put("emergency", emergency);
		map.put("approval", approval);
		map.put("complete", complete);
		
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	
	
	
	
	@GetMapping("/api/main/admin/projectDetail/{pro_id}")
	public ResponseEntity<Map<String,Object>> projectDetail(@PathVariable String pro_id){
		Map<String,Object> map2 = adminService.getRequestDetail(pro_id);
		List<ServerVO> list = adminService.getRequestServer(pro_id);

		
		map2.put("list", list);
		
		return new ResponseEntity<>(map2,HttpStatus.OK);
	}
	//신규요청의 모달에 데이터 전달
	@GetMapping("/api/main/admin/getTeam")
	public ResponseEntity<Map<String, Object>> getTeam(){
		Map<String, Object> team = new HashMap<>();
		List<EngineerVO> teamLeader = adminService.getTeamLeader();
		List<EngineerVO> teamMember = adminService.getTeamMember();
		
		team.put("teamLeader", teamLeader);
		team.put("teamMember", teamMember);
		
		return new ResponseEntity<>(team, HttpStatus.OK);
	}
	
	//신규 프로젝트 팀 배정
	@PostMapping("/api/main/admin/inputTeamNum")
	public ResponseEntity<String> inputTeamNum(@RequestBody Map<String, String> teamNum) {
		String pro_id=teamNum.get("pro_id");
		String team_num=teamNum.get("team_num");
		String pro_status=teamNum.get("pro_status");

		int result = adminService.inputTeamNum(pro_id, team_num, pro_status);
		alarmService.assignTeam(team_num);
    	engLeaderService.updatePro2(pro_id);


		return new ResponseEntity<>("ok", HttpStatus.OK);
	}

	
	//프로젝트 리스트 불러오기
	@GetMapping("/api/main/admin/projectList")
	public ResponseEntity<?> adProList() {
		
		ArrayList<ProjectInfoVO> proList = adminService.getProList();
		
		return new ResponseEntity<>(proList,HttpStatus.OK);
	}
	
	// 프로젝트 디테일 (모달)
	@GetMapping("/api/main/admin/AdProDetailModal/{pro_id}")
	public ResponseEntity<?> adProListDetail(@PathVariable("pro_id") String pro_id) {
		
		ArrayList<ProjectDetailVO> proListDetail = adminService.getProListDetail(pro_id);
		
		return new ResponseEntity<>(proListDetail,HttpStatus.OK);
	}
	
	// 서버 점검내역 (모달)
	@GetMapping("/api/main/admin/AdProDetailInsModal/{server_id}")
	public ResponseEntity<?> adServerInsList(@PathVariable("server_id") String server_id) {
		
		ArrayList<WorkInfoVO> serverInsList = adminService.getServerInsList(server_id);
		
		return new ResponseEntity<>(serverInsList,HttpStatus.OK);
	}
	

	



}
