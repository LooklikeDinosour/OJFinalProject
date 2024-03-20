package com.server.cloud.s3;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.server.cloud.command.NoticeVO;

@Mapper
public interface AwsMapper {

	void setInfo(FileVO fileVO);

	FileVO getImg(String userId);

	void setFile(FileVO fileVO);
	
	void setFiles(@Param("list") List<FileVO> list, @Param("user_id") String user_id);

	void setAnno(NoticeVO vo);

	List<FileVO> getFiles(String work_filenum);

	void UpAnno(NoticeVO vo);

	void fileDel(String file_num);

	void AnnoDel(String notice_num);

	void inQuryDel(String notice_num);

	void setFileCs(FileVO fileVO);


}
