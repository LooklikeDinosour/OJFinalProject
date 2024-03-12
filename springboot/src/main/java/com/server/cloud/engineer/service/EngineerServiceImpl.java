package com.server.cloud.engineer.service;

import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.server.cloud.command.EngSerProInfoWorkInfoVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.ProjectCusVO;
import com.server.cloud.command.ScheduleVO;
import com.server.cloud.command.ServerVO;
import com.server.cloud.command.WorkInfoVO;

@Service("engineerService")
@RequiredArgsConstructor
public class EngineerServiceImpl implements EngineerService{

	private final EngineerMapper engineerMapper;

	@Override
	@Cacheable(value = "engineerMapper.newList", key = "#eng_enid")
	public List<EngSerProInfoWorkInfoVO> newList(String eng_enid) {
		return engineerMapper.newList(eng_enid);
	}

	@Override
	public List<EngSerProInfoWorkInfoVO> engProInfo(String eng_enid) {
		return engineerMapper.engProInfo(eng_enid);
	}

	@Override
	public List<ServerVO> serverList() {
		return engineerMapper.serverList();
	}

	@Override
	public int registWorkLog(List<WorkInfoVO> ServerDetailsArray) {
		return engineerMapper.registWorkLog(ServerDetailsArray);}


	@Override
	public List<EngineerVO> engineerListMap(String eng_enid) {
		return engineerMapper.engineerListMap(eng_enid);
	}

	@Override
	public List<WorkInfoVO> inspectionListMap(String eng_enid) {
		return engineerMapper.inspectionListMap(eng_enid);
	}

	//점검목록 리스트 서버모달
	@Override
	public Map<String, Object> serverDetailModal(String server_id) {
		return engineerMapper.serverDetailModal(server_id);
	}

	//과거점검목록
	@Override
	public List<WorkInfoVO> pastInspectionHistoryList(String server_id) {
		return engineerMapper.pastInspectionHistoryList(server_id);
	}

	@Override
	public Map<String, Object> getProjectDetail(String pro_id) {
		return engineerMapper.getProjectDetail(pro_id);
	}
	
	@Override
	public List<ServerVO> getProjectServer(String pro_id) {
		return engineerMapper.getProjectServer(pro_id);
	}


	@Override
	public void editSchedule(ScheduleVO vo) {
		engineerMapper.editSchedule(vo);
	}

   //작업상태 버튼
	@Override
	public int updateWorkStatus(String work_status, String server_id) {
		return engineerMapper.updateWorkStatus(work_status, server_id);
	}

	//승용 서버 가져오기
	@Override
	public List<ServerVO> getServer(String eng_enid) {
		return engineerMapper.getServer(eng_enid);
	}

	@Override
	public ScheduleVO getScheInfo(String string) {
		return engineerMapper.getScheInfo(string);
	}

	@Override
	public EngineerVO getEnInfo(String en_enid) {
		return engineerMapper.getEnInfo(en_enid);
	}
	

}
