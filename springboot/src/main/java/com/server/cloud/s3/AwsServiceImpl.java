package com.server.cloud.s3;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AwsServiceImpl implements AwsService{

	private final AwsMapper awsMapper;

	private final S3Service s3Service;

	@Override
	public void setInfo(FileVO fileVO) {
		awsMapper.setInfo(fileVO);
	}

	@Override
	public FileVO getImg(String userId) {
		return awsMapper.getImg(userId);
	}

	@Override
	public void setFile(FileVO fileVO) {
		awsMapper.setFile(fileVO);
	}

	@Override
	public void fileDel(String file_num) {
		awsMapper.fileDel(file_num);
	}

	@Override
	public void AnnoDel(String notice_num) {
		awsMapper.AnnoDel(notice_num);
	}

	@Override
	public void inQuryDel(String notice_num) {
		awsMapper.inQuryDel(notice_num);
	}


	@Override
	public void setFileCs(FileVO fileVO) {
		awsMapper.setFileCs(fileVO);
    }

	//다중파일 업로드
	@Override
	public void setFiles(List<MultipartFile> fileList, String user_id) {

		Timestamp timestamp = Timestamp.from(Instant.now());
		List<MultipartFile> verifiedFileList = fileList.stream()
													.filter(f -> !f.isEmpty())
													.collect(Collectors.toList());


		try {
			List<FileVO> s3SaveList = new ArrayList<>();

			for (MultipartFile file : verifiedFileList) {

				String originName = file.getOriginalFilename();
				byte[] originData = file.getBytes();
				String objectURI = s3Service.putS3Object(originName, originData);
				FileVO fileVO = new FileVO().builder()
						.file_name(originName)
						.file_path(objectURI)
						.file_type(file.getContentType())
						.user_id(user_id)
						.upload_date(timestamp)
						.build();

				s3SaveList.add(fileVO);
			}

			awsMapper.setFiles(s3SaveList, user_id);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//다중파일 다운로드
	@Override
	public List<FileVO> getFiles(String work_filenum) {
		return awsMapper.getFiles(work_filenum);
	}

}
