package com.server.cloud.engineer.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.server.cloud.command.EngSerProInfoWorkInfoVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.ProjectCusVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;

@Mapper
public interface EngineerMapper {
	
	//프로젝트 관리 - 내 프로젝트 리스트
	public List<EngSerProInfoWorkInfoVO> newList(String eng_enid);
	public List<EngSerProInfoWorkInfoVO> engProInfo(String eng_enid); 
	public List<ServerVO> serverList();
	public int registWorkLog(List<WorkInfoVO> ServerDetailsArray);
	//엔지니어 리스트
	public List<EngineerVO> engineerListMap(String eng_enid);

	public List<WorkInfoVO> inspectionListMap(String eng_enid);

	//점검목록 리스트 서버모달
	public Map<String, Object> serverDetailModal(String server_id);
	//점검목록 리스트 작업목록 모달
	List<WorkInfoVO> pastInspectionHistoryList(String server_id);

	public Map<String,Object> getProjectDetail(String pro_id);
	
	public List<ServerVO> getProjectServer(String pro_id);
	
	public void editSchedule(ScheduleVO vo);

	
	//작업세부사항 등록의 작업 상태 변경 기능
	public int updateWorkStatus(@Param("work_status") String work_status,@Param("server_id") String server_id);

	public List<ServerVO> getServer(String eng_enid);
	public ScheduleVO getScheInfo(String sche_num);
	public EngineerVO getEnInfo(String en_enid);

}
