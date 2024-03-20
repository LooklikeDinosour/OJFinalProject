package com.server.cloud.s3;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AwsService {

	void setInfo(FileVO fileVO);

	FileVO getImg(String userId);

	void setFile(FileVO fileVO);
	
	void setFiles(List<MultipartFile> list, String user_id);

	List<FileVO> getFiles(String work_filenum);

	void fileDel(String file_num);

	void AnnoDel(String notice_num);

	void inQuryDel(String notice_num);

	void setFileCs(FileVO fileVO);



}
