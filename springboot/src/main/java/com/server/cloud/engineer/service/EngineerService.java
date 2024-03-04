package com.server.cloud.engineer.service;

import java.util.List;
import java.util.Map;

import com.server.cloud.command.EngSerProInfoWorkInfoVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;

public interface EngineerService {

	//내 프로젝트 리스트
	public List<EngSerProInfoWorkInfoVO> newList(String eng_enid);


	// 엔지니어 담당 프로젝트 리스트 조회
	public List<EngSerProInfoWorkInfoVO> engProInfo(String eng_enid);
	
	
	public List<ServerVO> serverList();
	// 점검상세목록 서버불러오기
	public int registWorkLog(List<WorkInfoVO> ServerDetailsArray);
	//엔지니어 리스트
	public List<EngineerVO> engineerListMap(String eng_enid);


	//점검목록 리스트
	public List<WorkInfoVO> inspectionListMap(String eng_enid);

	//점검목록 리스트 서버모달
	public Map<String, Object> serverDetailModal(String server_id);
	
	public List<WorkInfoVO> pastInspectionHistoryList(String server_id);

	public Map<String,Object> getProjectDetail(String pro_id);
	
	public List<ServerVO> getProjectServer(String pro_id);
	
	public void editSchedule(ScheduleVO vo);
	
	public List<ServerVO> getServer(String eng_enid);

	public int updateWorkStatus(String work_status, String server_id);
	public ScheduleVO getScheInfo(String string);

	public EngineerVO getEnInfo(String string);
}
