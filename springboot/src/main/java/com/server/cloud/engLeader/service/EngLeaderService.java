package com.server.cloud.engLeader.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.server.cloud.command.CusVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.InsRequestVO;
import com.server.cloud.command.ProjectInfoVO;
import com.server.cloud.command.QueryVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;

public interface EngLeaderService {
	
	public Map<String,String> getLeaderInfo(String leader_id);
	public List<ProjectInfoVO> getNewProject(String leader_id);
	public List<QueryVO> getInspection(String leader_id);
	public QueryVO getAllMain(String leader_id);
	public Map<String,Object> getRequestDetail(String pro_id);
	public List<ServerVO> getRequestServer(String pro_id);
	public List<ServerVO> getRequestServer2(String pro_id);
	public List<EngineerVO> getTeamEngList(String pro_pi,String leader_id);
	public List<EngineerVO> getTeamEngList2(String leader_id);
	public void assignEng(String eng_enid , String server_id);
	public List<ProjectInfoVO> getAllPro(String leader_id);
	public List<CusVO> getClient(String leader_id);
	public CusVO getClientInfo(String cus_id);
	public List<ProjectInfoVO> clientProjects(String cus_id);
	public List<ServerVO> getEngServer(String eng_enid);
	public List<ScheduleVO> getEngSchedule(String eng_enid);
	public List<ScheduleVO> getAllSchedule(String leader_id);
	public List<WorkInfoVO> getWorkInfo(String server_id);
	public void registSchedule(String eng_enid, String server_id);
	
	//점검요청목록
	public ArrayList<InsRequestVO> getInsRequestList();
	
	//점검요청스케쥴추가
	public void insRegistSchedule(String eng_enid, String server_id, String pro_startdate, String insRequest_type);
	
	//점검요청 확인
	public void checkInsRequest(String insRequest_num);
    public void changeProStatus(String pro_id);
    public void updatePro(String por_id);
    public void updatePro2(String por_id);
}
