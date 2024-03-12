package com.server.cloud.engLeader.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.server.cloud.command.CusVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.InsRequestVO;
import com.server.cloud.command.ProjectInfoVO;
import com.server.cloud.command.QueryVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;

@Service("engLeaderService")
public class EngLeaderServiceImpl implements EngLeaderService{
	
	private final EngLeaderMapper engLeaderMapper;

	public EngLeaderServiceImpl (EngLeaderMapper engLeaderMapper) {
		this.engLeaderMapper = engLeaderMapper;
	}


	@Override
	public List<ProjectInfoVO> getNewProject(String leader_id) {	
		return engLeaderMapper.getNewProject(leader_id);
	}


	@Override
	public List<QueryVO> getInspection(String leader_id) {
		return engLeaderMapper.getInspection(leader_id);
	}

	@Override
	public QueryVO getAllMain(String leader_id) {		
		return engLeaderMapper.getAllMain(leader_id);
	}

	@Override
	public Map<String, Object> getRequestDetail(String pro_id) {
		return engLeaderMapper.getRequestDetail(pro_id);
	}

	@Override
	public List<ServerVO> getRequestServer(String pro_id) {
		return engLeaderMapper.getRequestServer(pro_id);
	}
	
	@Override
	public List<ServerVO> getRequestServer2(String pro_id) {
		return engLeaderMapper.getRequestServer2(pro_id);
	}

	@Override
	public List<EngineerVO> getTeamEngList(String pro_pi,String leader_id) {
		return engLeaderMapper.getTeamEngList(pro_pi,leader_id);
	}
	
	@Override
	public List<EngineerVO> getTeamEngList2(String leader_id) {
		return engLeaderMapper.getTeamEngList2(leader_id);
	}

	@Override
	public void assignEng(String eng_enid, String server_id) {
		engLeaderMapper.assignEng(eng_enid, server_id);		
	}


	@Override
	@Cacheable(value = "engLeaderMapper.getAllPro", key = "#leader_id")
	public List<ProjectInfoVO> getAllPro(String leader_id) {
		return engLeaderMapper.getAllPro(leader_id);		
	}


	@Override
	public List<CusVO> getClient(String leader_id) {		
		return engLeaderMapper.getClient(leader_id);
	}


	@Override
	public CusVO getClientInfo(String cus_id) {
		return engLeaderMapper.getClientInfo(cus_id);
	}


	@Override
	public List<ProjectInfoVO> clientProjects(String cus_id) {
		return engLeaderMapper.clientProjects(cus_id);
	}


	@Override
	public List<ServerVO> getEngServer(String eng_enid) {
		return engLeaderMapper.getEngServer(eng_enid);
	}


	@Override
	public List<ScheduleVO> getEngSchedule(String eng_enid) {
		return engLeaderMapper.getEngSchedule(eng_enid);
	}


	@Override
	public List<ScheduleVO> getAllSchedule(String leader_id) {
		return engLeaderMapper.getAllSchedule(leader_id);
	}


	@Override
	public Map<String, String> getLeaderInfo(String leader_id) {
		return engLeaderMapper.getLeaderInfo(leader_id);
	}


	@Override
	public List<WorkInfoVO> getWorkInfo(String server_id) {
		return engLeaderMapper.getWorkInfo(server_id);
	}


	@Override
	public void registSchedule(String eng_enid, String server_id) {
		engLeaderMapper.registSchedule(eng_enid, server_id);
		
	}
	//점검요청목록 
	@Override
	public ArrayList<InsRequestVO> getInsRequestList() {
		return engLeaderMapper.getInsRequestList();
	}
	
	//점검요청 스케줄 추가 
	@Override
	public void insRegistSchedule(String eng_enid, String server_id, String pro_startdate, String insRequest_type) {
		engLeaderMapper.insRegistSchedule(eng_enid, server_id, pro_startdate, insRequest_type);
	}
	
	//점검요청 확인 
	@Override
	public void checkInsRequest(String insRequest_num) {
		engLeaderMapper.checkInsRequest(insRequest_num);
	}
	@Override
    public void changeProStatus(String pro_id){
        engLeaderMapper.changeProStatus(pro_id);
    }

  @Override
    public void updatePro(String pro_id){
        engLeaderMapper.changeProStatus(pro_id);
    }


    @Override
    public void updatePro2(String pro_id){
        engLeaderMapper.updatePro2(pro_id);
    }



}
