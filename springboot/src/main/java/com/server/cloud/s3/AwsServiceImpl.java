package com.server.cloud.s3;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;

import com.server.cloud.config.AsyncConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AwsServiceImpl implements AwsService{

	private final AwsMapper awsMapper;

	private final S3Service s3Service;

	private final AsyncConfig asyncConfig;

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

//	//다중파일 업로드
//	@Override
//	public void setFiles(List<MultipartFile> fileList, String user_id) {
//
//		Timestamp timestamp = Timestamp.from(Instant.now());
//		// 빈파일을 업로드 하는 로직
//		List<MultipartFile> verifiedFileList = filterValidFiles(fileList);
//
//		try {
//			List<FileVO> s3SaveList = new ArrayList<>();
//
//			for (MultipartFile file : verifiedFileList) {
//				FileVO fileVO = saveFileToS3AndGetFileVO(user_id, file, timestamp);
//				s3SaveList.add(fileVO);
//			}
//
//			awsMapper.setFiles(s3SaveList, user_id);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}


	//다중파일 업로드 비동기 방식 적용
	@Override
	public void setFiles(List<MultipartFile> fileList, String user_id) {

		Timestamp timestamp = Timestamp.from(Instant.now());
		// 프론트에서 넘어온 파일 중 빈 값이 있는지 검증하는 로직
		List<MultipartFile> verifiedFileList = filterValidFiles(fileList);
		// 설정한 threadpool 호출
		Executor executor = asyncConfig.taskExecutor();

			List<CompletableFuture<FileVO>> asyncList = verifiedFileList.stream()
					.map(file -> processFileAsync(user_id, file, timestamp, executor))
					.collect(Collectors.toList());

			// stream 처리
//			for (MultipartFile file : verifiedFileList) {
//				// 비동기 작업을 병렬로 처리하기.
//				CompletableFuture<FileVO> future = processFileAsync(user_id, file, timestamp, executor);
//				asyncList.add(future);
//			}

			CompletableFuture<Void> result = CompletableFuture.allOf(asyncList.toArray(new CompletableFuture[0]));
			CompletableFuture<List<FileVO>> allCompletableFuture = result.thenApply( a -> {
				return asyncList.stream()
						.map(CompletableFuture::join)
						.collect(Collectors.toList());
			});


		try {
			List<FileVO> s3SaveList = allCompletableFuture.get();
			awsMapper.setFiles(s3SaveList, user_id);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//비동기 처리 메소드
	private CompletableFuture<FileVO> processFileAsync(String user_id, MultipartFile file, Timestamp timestamp, Executor executor) {
		return CompletableFuture.supplyAsync(() -> {
			try {
				String originName = file.getOriginalFilename();
				byte[] originData = file.getBytes();
				String objectURI = s3Service.putS3Object(originName, originData);

				return new FileVO().builder()
						.file_name(originName)
						.file_path(objectURI)
						.file_type(file.getContentType())
						.user_id(user_id)
						.upload_date(timestamp)
						.build();

			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}

		}, executor);
	}

	private List<MultipartFile> filterValidFiles(List<MultipartFile> fileList) {
		List<MultipartFile> verifiedFileList = fileList.stream()
				.filter(f -> !f.isEmpty())
				.collect(Collectors.toList());
		return verifiedFileList;
	}


	//다중파일 다운로드
	@Override
	public List<FileVO> getFiles(String work_filenum) {
		return awsMapper.getFiles(work_filenum);
	}

}
