package com.server.cloud.s3;

import java.sql.Timestamp;

import java.util.ArrayList;

import java.time.Instant;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.server.cloud.admin.service.AdminService;
import com.server.cloud.command.CusVO;
import com.server.cloud.command.NoticeVO;
import com.server.cloud.main.service.CusService;




@Slf4j
@RestController
@RequiredArgsConstructor
public class AwsApiController {

	private final AdminService adminService;

	@Value("${aws_access_key_id}")
	private String aws_access_key_id;

	private final S3Service s3;

	private final CusService cusService;

	private final AwsService awsService;

	@PostMapping("/api/main/admin/noticeWrite")
	public ResponseEntity<?> noticeWrite(@RequestBody NoticeVO vo){
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		vo.setNotice_regdate(timestamp);
		adminService.setAnno(vo);
		return new ResponseEntity<>("성공",HttpStatus.OK);
	}

	@PostMapping("/api/main/admin/noticeUpdate")
	public ResponseEntity<?> noticeUpdate(@RequestBody NoticeVO vo){
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		vo.setNotice_regdate(timestamp);
		adminService.UpAnno(vo);
		return new ResponseEntity<>("성공",HttpStatus.OK);
	}

	@PostMapping("/api/main/cloudUpload")
	public ResponseEntity<?>upload(@RequestParam("file_data")MultipartFile file,@RequestParam("userId")String userId,
			String fileId){
		Instant now = Instant.now();
		Timestamp timestamp = Timestamp.from(now);
		try {
			if(fileId!=null) {

				String originName=file.getOriginalFilename();
				byte[]originData=file.getBytes();
				String objectURI =s3.putS3Object(originName,originData);
				FileVO fileVO=new FileVO().builder()
						.file_id(fileId)
						.file_name(originName)
						.file_path(objectURI)
						.file_type(file.getContentType())
						.upload_date(timestamp)
						.user_id(userId)
						.build();
				awsService.setInfo(fileVO);

				FileVO path=awsService.getImg(userId);
				return new ResponseEntity<>(path,HttpStatus.OK);
			}else {

				String originName=file.getOriginalFilename();
				byte[] originData = file.getBytes();
				String objectURI = s3.putS3Object(originName, originData);
				FileVO fileVO = new FileVO().builder()
						.file_name(originName)
						.file_path(objectURI)
						.file_type(file.getContentType())
						.user_id(userId)
						.upload_date(timestamp)
						.build();
				System.out.println(fileVO.toString());
				awsService.setFile(fileVO);

				return new ResponseEntity<>("성공", HttpStatus.OK);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return new ResponseEntity<>("?",HttpStatus.OK);
	}

	@PostMapping("/api/main/cloudUploadCs")
	public ResponseEntity<?>cloudUploadCs(@RequestParam("file_data") MultipartFile file, @RequestParam("userId")String userId,
			String fileId){
		Instant now = Instant.now();
		Timestamp timestamp = Timestamp.from(now);
		try {
			String originName=file.getOriginalFilename();
			byte[]originData=file.getBytes();
			String objectURI =s3.putS3Object(originName,originData);
			FileVO fileVO=new FileVO().builder()
					.file_name(originName)
					.file_path(objectURI)
					.file_type(file.getContentType())
					.user_id(userId)
					.upload_date(timestamp)
					.build();
			System.out.println(fileVO.toString());
			awsService.setFileCs(fileVO);

			return new ResponseEntity<>("성공",HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return new ResponseEntity<>("?",HttpStatus.OK);
	}


	@PostMapping("/api/main/cloudMultiUpload")
	public ResponseEntity<String> multiUpload(
											@RequestParam("file_data") List<MultipartFile> fileList,
											@RequestParam("userId") String userId) {

		long start = System.currentTimeMillis();
		awsService.setFiles(fileList, userId);
        System.out.println("업로드 시간 : " + (System.currentTimeMillis() - start));
		return new ResponseEntity<>("resultMessage", HttpStatus.OK);
	}


	@PostMapping("/api/main/updateInfo")
	public ResponseEntity<?> updateInfo(@RequestBody CusVO vo){
		System.out.println(vo.toString());
		cusService.updateInfo(vo);
		return new ResponseEntity<>("good",HttpStatus.OK);
	}


	@GetMapping("/api/main/getPoto")
	public ResponseEntity<?>getPoto(String cus_id){
		System.out.println(cus_id);
		if(cus_id!=null) {

			FileVO path=awsService.getImg(cus_id);
			System.out.println(path);
			return new ResponseEntity<>(path,HttpStatus.OK);
		}else {
			return new ResponseEntity<>("파일 없음",HttpStatus.OK);
		}
	}

	@PostMapping("/api/main/AnnoDel")
	public ResponseEntity<?>AnnoDel(@RequestBody Map<String, Object> deleteA ){

		if(deleteA.get("file_name")!=null) {
			System.out.println(deleteA.get("file_name"));
			String value=(String)deleteA.get("file_name");
			String file_num=(String)deleteA.get("file_id");
			s3.deleteBucketObjects(value);
			awsService.fileDel(file_num);//파일삭제
		}

		String notice_num=(String)deleteA.get("notice_num");
		awsService.AnnoDel(notice_num);//댓글,글 삭제
		return null;
	}
	@PostMapping("/api/main/inQuryDel")
	public ResponseEntity<?>inQuryDel(@RequestBody Map<String, Object> deleteA ){

		if(deleteA.get("file_name")!=null) {

			System.out.println(deleteA.get("file_name"));
			String value=(String)deleteA.get("file_name");
			String file_num=(String)deleteA.get("file_id");
			s3.deleteBucketObjects(value);
			awsService.fileDel(file_num);//파일삭제
		}
		String notice_num=(String)deleteA.get("notice_num");
		awsService.inQuryDel(notice_num);//댓글,글 삭제
		return null;
	}
	

	@GetMapping("/api/main/getFiles")
	public ResponseEntity<?> getFiles(String work_filenum) {
		System.out.println(work_filenum);
		if(work_filenum.isEmpty()) {
			return new ResponseEntity<>("파일 없음", HttpStatus.OK);
		}

		List<FileVO> files = awsService.getFiles(work_filenum);
		return new ResponseEntity<>(files, HttpStatus.OK);
	}
}
