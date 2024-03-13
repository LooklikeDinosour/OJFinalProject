
package com.server.cloud.admin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.server.cloud.command.AdminMainVO;
import com.server.cloud.command.CsVO;
import com.server.cloud.command.CusVO;
import com.server.cloud.command.EngineerVO;
import com.server.cloud.command.NoticeVO;

import com.server.cloud.command.ProjectCusVO;
import com.server.cloud.command.ServerVO;

import com.server.cloud.command.ProjectDetailVO;
import com.server.cloud.command.ProjectInfoVO;
import com.server.cloud.command.QueryVO;
import com.server.cloud.command.WorkInfoVO;

import com.server.cloud.pagenation.Criteria;
import com.server.cloud.s3.AwsMapper;

@Service("adminSerivce")
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{


	private final AdminMapper adminMapper;

	private final AwsMapper awsMapper;

	@Override
	public void setAnno(NoticeVO vo) {
		awsMapper.setAnno(vo);
  }
	@Override
	public void UpAnno(NoticeVO vo) {
		awsMapper.UpAnno(vo);
	};
	//회원관리 - 엔지니어
	@Override
	public List<EngineerVO> adEngineerList(EngineerVO engineerVO) {
		return adminMapper.adEngineerList(engineerVO);

  }
  	@Override
	public int getTotal(String role) {
		// TODO Auto-generated method stub
		return adminMapper.getTotal(role);
	}

	@Override
	public List<CusVO> adClientList(CusVO cusVO) {
		return adminMapper.adClientList(cusVO);
	}


	@Override
	public List<CsVO> csList(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csList(cri);
	}


	@Override
	public int csTotal() {
		// TODO Auto-generated method stub
		return adminMapper.csTotal();
	}


	@Override
	public void csUpdate(CsVO vo) {
		// TODO Auto-generated method stub
		adminMapper.csUpdate(vo);
	}


	@Override
	public int csUserTotal(String cs_writer) {
		// TODO Auto-generated method stub
		return adminMapper.csUserTotal(cs_writer);
	}
	@Override
	public List<CsVO> csEnList(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csEnList(cri);
	}
	@Override
	public EngineerVO engGetinfo(String cs_writer) {
		// TODO Auto-generated method stub
		return adminMapper.engGetinfo(cs_writer);
	}
	@Override
	public int csEnTotal(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csEnTotal(cri);
	}
	@Override
	public List<CsVO> csEnListMy(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csEnListMy(cri);
	}
	@Override
	public List<CsVO> csEnLeaderList(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csEnLeaderList(cri);
	}
	@Override
	public List<CsVO> csEnLeaderListMy(Criteria cri) {
		// TODO Auto-generated method stub
		return adminMapper.csEnLeaderListMy(cri);
	}


	
	@Override
	public List<ProjectCusVO> newProjectList() {
		// TODO Auto-generated method stub
		return adminMapper.newProjectList();
	}
	@Override
	public List<ServerVO> getRequestServer(String pro_id) {
		// TODO Auto-generated method stub
		return adminMapper.getRequestServer(pro_id);
	}
	@Override
	public Map<String, Object> getRequestDetail(String pro_id) {
		// TODO Auto-generated method stub
		return adminMapper.getRequestDetail(pro_id);
	}
	@Override
	public List<EngineerVO> getTeamLeader() {
		// TODO Auto-generated method stub
		return adminMapper.getTeamLeader();
	}
	@Override
	public List<EngineerVO> getTeamMember() {
		// TODO Auto-generated method stub
		return adminMapper.getTeamMember();
	}
	@Override
	public int inputTeamNum(String pro_id, String team_num, String pro_status) {
		// TODO Auto-generated method stub
		return adminMapper.inputTeamNum(pro_id, team_num, pro_status);
	}
		

	//프로젝트 리스트 불러오기 
	@Override
	public ArrayList<ProjectInfoVO> getProList() {
		return adminMapper.getProList();
	}
	
	//프로젝트 디테일 (모달)
	@Override
	public ArrayList<ProjectDetailVO> getProListDetail(String pro_id) {
		return adminMapper.getProListDetail(pro_id);
	}
	
	//서버 점검내역 (모달)
	@Override
	public ArrayList<WorkInfoVO> getServerInsList(String server_id) {
		return adminMapper.getServerInsList(server_id);
	}
	@Override
	@Cacheable(value = "adminMapper.getAnnoList", key = "#cri")
	public List<NoticeVO> getList(Criteria cri) {	
		return adminMapper.getList(cri);
	}
	
	//메인
	@Override
	public  AdminMainVO getAdminMain() {
		return adminMapper.getAdminMain();
	}
	@Override
	public List<AdminMainVO> getInspection() {
		return adminMapper.getInspection();
	}
	@Override
	public List<AdminMainVO> getwork() {
		return adminMapper.getwork();
	}
	@Override
    public List<CsVO>csListAll(){
        return adminMapper.csListAll();
    }
}





