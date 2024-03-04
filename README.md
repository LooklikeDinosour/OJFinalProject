
# :pushpin: CloudOJ
link : [서버작업관리 솔루션](http://3.35.150.190:3000/) 
- Test ID
- 관리자 : cloud200 / cloud200!
- 엔지니어리더 : engL4 / engl123!
- 엔지니어 : eng08 / eng12345!
- 유저 : echopro23 / user12345!


# 1. 참여 인원 & 제작 기간
- 팀 프로젝트(팀 구성 : 6명)
- 2023년 8월 21일 ~ 9월 26일 (기획 5일, 개발 31일)
- 23.08.21-25 (기획)
	- 요구사항 정의서, 기능분해도, 플로우 차트 작성
- 23.08.26-09.03 (프론트엔드 개발)
	- ReactJS를 이용하여 화면 구현 후 1차 통합
- 23.09.04-09.15 (백엔드 개발)
	- Spring Boot를 통한 기능 구현 후 2차 통합 후 테스트
- 23.09.15-09.22 (백엔드 개발)
	- 에러 수정 및 미 구현 기능 구현 후 3차 통합
- 23.09.22-09.26 (백엔드 개발)
	- 배포 진행 및 에러 수정
- 23.09.26
	- 프로젝트 발표	

</br>

# 2. 사용 기술 및 개발 환경
### 사용기술
#### `Back-end`
  - Java 11
  - Spring Boot 2.7.14(Gradle)
  - Spring Security
  - Mybatis 2.3.1
  - JWT
  - AWS EC2
  - Node.js 18.16.1
#### `Database`  
  - AWS RDS (Aurora/MySQL)
  - AWS S3
#### `Front-end`
  - ReactJS 18.2.0

### 개발 환경
- STS4
- GitHub
- MySql
- AWS
- Visual Studio Code
</br>

# 3. 프로젝트 구조
![](https://github.com/LooklikeDinosour/OJFinalProject/blob/master/architecture.png)

</br>


# 4. ERD 설계
![](https://github.com/LooklikeDinosour/OJFinalProject/blob/master/FINALPROJECT_ERD.png)

</br>

# 5. 사용 기술 및 담당 기능
### 사용 기술
	Front-End : ReactJS
	Back_End : Java, Spring Boot, MyBatis, AWS (EC2, S3, RDS)

### 담당 기능 (담당 파트 화면 구현, 기능 구현 동시 진행)
	프로젝트 기여도 : 20%
	1. 엔지니어페이지 점검세부사항 작성 및 AWS S3 BUCKET에 다중 파일 업로드 및 다운로드 구현
 	2. axios 라이브러리로 비동기통신의 api 호출 및 응답을 사용하여 아래 기능 구현
	- 관리자페이지 신규 프로젝트 조회 및 팀 배정 기능
	- 엔지니어페이지 팀원 보기 및 마이페이지 조회
	- 엔지니어페이지 내 프로젝트 조회 Ehcache를 활용하여 TPS 4.4 -> 3,306 (약 750배 개선)


<details>
<summary><b>핵심 기능 상세 설명</b></summary>
<div markdown="1">


## 5.1. 핵심 기능 구현

### 1. 엔지니어페이지 점검세부사항 작성 및 AWS S3 BUCKET에 다중 파일 업로드 및 다운로드 구현
   - 엔지니어가 서버 점검한 내용을 기록할 수 있는 기능
   - 점검사항외에 부가적인 문서, 사진 등을 첨부할 수 있게 다중 업로드 기능 구현
   	- 다중 파일 업로드는 업로드 파일 갯수만 볼 수 있던 <input = multiple>형식이 아니라
     <input=file>형식으로 파일 추가버튼을 통해 상황에 맞게 업로드 할 수 있게하고, 무엇을 업로드할지 다시 확인할 수 있게 구현
   	- 업로드 파일은 스토리지 확장성을 위해 AWS S3에 저장
   - DB에 대한 호출 횟수가 비용 증가의 원인이라 점검세부사항 이동시 모든 프로젝트를 한번에 호출하여 React에서 filter를 통해 분류하도록 구현  
     
### 시퀀스 다이어그램
![](https://github.com/LooklikeDinosour/OJFinalProject/blob/7b4406f17dfc2c0a3e46a1b64e4bacbeb37032d7/%EC%9E%91%EC%97%85%20%EC%83%81%EC%84%B8%20%EB%82%B4%EC%97%AD%EC%84%9C%20SD%20%EC%88%98%EC%A0%95v1.png)

### 업로드 코드
#### 프론트엔드 코드
:pushpin:<b>점검세부사항 페이지</b>
- [관련코드](react/src/enMain/EnWorkDetail.js)
 
#### 백엔드 코드
:pushpin:<b>점검세부사항 코드</b>


<details>
<summary>관련 코드1 엔지니어 Controller</summary>
<div markdown="1">

~~~java
  //

// 작업상세내역에서 요청보낸 엔지니어별로 배정받은 프로젝트 불러오는 기능
// 엔지니어 고유 id에 해당하는 프로젝트와 프로젝트 산하의 서버를 응답
	@GetMapping("/engineer/workDetail/{eng_enid}")
	public ResponseEntity<Map<String, Object>> enWorkDetailToInfo(@PathVariable String eng_enid) {
		List<EngSerProInfoWorkInfoVO> eSPIWlist = engineerService.engProInfo(eng_enid);
		List<ServerVO> serverList = engineerService.serverList();

		Map<String, Object> proInfoMap = new HashMap<>();
		//프로젝트 
		proInfoMap.put("eSPIWlist", eSPIWlist);
		//서버리스트 
		proInfoMap.put("serverList", serverList);
	
		return new ResponseEntity<>(proInfoMap, HttpStatus.OK);
	}

// 작업상세내역서 등록 기능
// 홈페이지에서 작성된 내용을 API를 통해 전달받아 DB에 기록
	@PostMapping("/engineer/workDetail")
	public ResponseEntity<Integer> registWorkLogs(@RequestBody List<WorkInfoVO> ServerDetailsArray) {
		int result = engineerService.registWorkLog(ServerDetailsArray);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
~~~

</div>
</details>

<details>
    <summary>관련 코드2 ServiceImpl</summary>
<div markdown="1">

~~~java

  //작업상세내역서에서 각 엔지니어에게 배정된 프로젝트 불러오기
	@Override
	public List<EngSerProInfoWorkInfoVO> engProInfo(String eng_enid) {
		return engineerMapper.engProInfo(eng_enid);
	}
	@Override
	public List<ServerVO> serverList() {
		return engineerMapper.serverList();
	}

  //서버 작업상세내역 리액트에서 받아와서 넘기기
	@Override
	public int registWorkLog(List<WorkInfoVO> ServerDetailsArray) {
		return engineerMapper.registWorkLog(ServerDetailsArray);}
	
	~~~

</div>
</details>
 
:pushpin:<b>업로드 관련 코드</b>
     
<details>
<summary>관련 코드1 AWS Controller</summary>
<div markdown="1">

~~~java
	@PostMapping("/api/main/cloudMultiUpload")
	public ResponseEntity<Integer> multiUpload(@RequestParam("file_data") List<MultipartFile> fileList,
 						   @RequestParam("userId") String userId) {
		Instant now = Instant.now();
		Timestamp timestamp = Timestamp.from(now);
		
		fileList = fileList.stream().filter( f -> f.isEmpty() == false).collect(Collectors.toList());
		int result = 0;
		try {
			List<FileVO> list = new ArrayList<>();
			for (MultipartFile file : fileList) {
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
	
			list.add(fileVO);
			}
			result = awsService.setFiles(list, userId);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
~~~

</div>
</details>

<details>
<summary>관련 코드2 ServiceImpl</summary>
<div markdown="1">

~~~java
	@Override
	public int setFiles(List<FileVO> list, String user_id) {
		return awsMapper.setFiles(list, user_id);
	}
~~~

</div>
</details>

<details>
<summary>관련 코드3 점검 세부사항 작성 SQL</summary>
<div markdown="1">

~~~sql
	<insert id="registWorkLog" parameterType="java.util.List">
		<selectKey keyProperty="work_filenum" resultType="String" order="BEFORE">
		        SELECT UUID()
		     </selectKey>
		insert into WORKINFO
		(work_filenum,
		work_date,
		work_division,
		work_time,
		work_cpu,
		work_ram,
		work_hdd,
		work_note,
		work_estimate,
		work_status,
		server_id,
		eng_enid,
		pro_id)
		values
			<foreach collection="list" item="workInfo" separator=",">
			(#{work_filenum},
			#{workInfo.work_date},
			#{workInfo.work_division},
			#{workInfo.work_time},
			#{workInfo.work_cpu},
			#{workInfo.work_ram},
			#{workInfo.work_hdd},
			#{workInfo.work_note},
			#{workInfo.work_estimate},
			#{workInfo.work_status},
			#{workInfo.server_id},
			#{workInfo.eng_enid},
			#{workInfo.pro_id}
			)
			</foreach>
	</insert>

~~~

</div>
</details>

<details>
<summary>관련 코드4 다중파일 업로드 SQL </summary>
<div markdown="1">

~~~sql
	    <insert id="setFiles" >
	      <selectKey keyProperty="work_filenum" resultType="String"
	         order="BEFORE">
	         SELECT WORK_FILENUM FROM WORKINFO WHERE ENG_ENID = #{user_id}
	         ORDER BY WORK_DATE DESC LIMIT 1;
	      </selectKey>
	
	         insert into
	         FILE(file_name,file_path,file_type,upload_date,user_num,user_id) 
	         values
	         <foreach collection="list" item="item" separator=",">     
	            (#{item.file_name}, #{item.file_path}, #{item.file_type}, #{item.upload_date}, #{work_filenum}, #{item.user_id})
	         </foreach>
	     </insert> 

~~~

</div>
</details>

</br>
  
### 다운로드 코드

#### 프론트엔드 코드
:pushpin: <b>점검목록 및 각 서버 상세보기 페이지</b>
- [관련코드 점검 목록](react/src/enMain/InspectionList.js)
- [관련코드 서버 상세보기](react/src/enMain/EnServerDetailModal.js)
 
#### 백엔드 코드
:pushpin:<b>다운로드 코드</b>
<details>
<summary>관련 코드1 AwsController </summary>
<div markdown="1">

~~~java
	@GetMapping("/api/main/getFiles")
	public ResponseEntity<?> getFiles(String work_filenum) {
		if(work_filenum != null) {
			List<FileVO> files = awsService.getFiles(work_filenum);
			return new ResponseEntity<>(files, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("파일 없음", HttpStatus.OK);
		}
	}
~~~

</div>
</details>

<details>
<summary>관련 코드2 AwsServiceImpl </summary>
<div markdown="1">

~~~java
// 멀티파일 다운로드
	@Override
	public List<FileVO> getFiles(String work_filenum) {
		return awsMapper.getFiles(work_filenum);
	}
~~~


</div>
</details>

<details>
<summary>관련 코드3 AwsMapper </summary>
<div markdown="1">

~~~sql
	    <select id="getFiles" resultType="com.server.cloud.s3.FileVO">
	        SELECT * FROM FILE 
	        WHERE USER_NUM = #{work_filenum};
	    </select>
~~~


</div>
</details>



</div>
</details>

</br>

# 6. 핵심 트러블 슈팅 및 문제 해결

## 문제 1 : 점검 세부사항 등록


📌 **문제점**
- 초기구현의도 : 엔지니어는 한 개의 작업 상세 내역 페이지에 배정받은 서버들의 작업내역을 작성
- 문제 발생 : 눈으로 보기에는 한 개의 페이지라서 한 개의 게시글만 기록될 것 같았지만, 점검받는 서버의 갯수만큼 게시글이 형성이 되는 구조 
- 프로젝트 명, 작업 날짜, 작성자, 작업시간, 첨부파일 등 공통부분과 각 서버당 기록되는 CPU, RAM, STORAGE 등 점검사항 등의 개별 부분으로 기록이 진행되어야 하는 문제 발생


📌 **해결**
- list 형식으로 데이터를 받아서 foreach 구문을 사용하여 list의 size만큼 반복하여 DB에 저장

~~~sql
<insert id="registWorkLog" parameterType="java.util.List">
             <selectKey keyProperty="work_filenum" resultType="String" order="BEFORE">
	        SELECT UUID()
	     </selectKey>
		insert into WORKINFO
		(work_filenum,
		work_date,
		work_division,
		work_time,
		work_cpu,
		work_ram,
		work_hdd,
		work_note,
		work_estimate,
		work_status,
		server_id,
		eng_enid,
		pro_id)
		values
		<foreach collection="list" item="workInfo" separator=",">
			(#{work_filenum},
			#{workInfo.work_date},
			#{workInfo.work_division},
			#{workInfo.work_time},
			#{workInfo.work_cpu},
			#{workInfo.work_ram},
			#{workInfo.work_hdd},
			#{workInfo.work_note},
			#{workInfo.work_estimate},
			#{workInfo.work_status},
			#{workInfo.server_id},
			#{workInfo.eng_enid},
			#{workInfo.pro_id}
			)
		</foreach>
	</insert>
~~~

---

## 문제 2 : 업로드 기능 추가


📌 **문제점 1**
- 회의를 통해 초기에 없던 업로드 기능 추가
- 업로드를 구현시 해당 글의 PK로 파일을 업로드 및 다운로드 구현을 해야 하는데, 위에서 구현한 다중 게시글이 각각 다른 게시글을 생성하며 각각 PK 생성되어
  최초 형성된 첫 점검 기록 외에는 다운로드 기능이 구현되지 않았음
- Key를 복제하여 연결할 수 있는 아래와 같은 SQL문을 찾아서 사용했지만, PK관련 개체 무결성 에러가 발생  
  

📌 **해결 1**
- WorkInfo 테이블에 컬럼(WORK_FILENUM)을 추가 생성하여 <selectKey>구문을 추가하여 동일한 UUID를 복사하여 INSERT 구문에 Foreach를 통해 Key값을 복사하여 모든 게시글에 저장하였고, 해당 Key값을 PK대신 keyProperty로 "work_filenum"을 지정하여 업로드되는 FILE들 DB저장시 같이 Insert해줌으로 모든 점검 목록에서도 다운로드를 받을 수 있도록 해결

~~~sql
    <insert id="setFiles" >
      <selectKey keyProperty="work_filenum" resultType="String"
         order="BEFORE">
         SELECT WORK_FILENUM FROM WORKINFO WHERE ENG_ENID = #{user_id}
         ORDER BY WORK_DATE DESC LIMIT 1;
      </selectKey>

         insert into
         FILE(file_name,file_path,file_type,upload_date,user_num,user_id) 
         values

         <foreach collection="list" item="item" separator=",">      
            (#{item.file_name}, #{item.file_path}, #{item.file_type}, #{item.upload_date}, #{work_filenum}, #{item.user_id})
         </foreach>
     </insert> 

~~~

---

📌 **문제점 2**
- 업로드 기능 추가 이전에 작업 상세 내역 기록은 해당날짜로만 기록하기로 설정하여 Date 클래스를 사용
- 다운로드 테스트를 위해 동일 날짜 서버기록을 여러 엔지니어 ID에서 형성하는데 Type이 Date로 되어있어서 날짜로만 저장되다보니 해당 날짜 첫 게시물외에 다른 게시글에도 첫 게시물에 업로드한 파일들이 잘못 응답
~~~sql
      <selectKey keyProperty="work_filenum" resultType="String"
         order="BEFORE">
         SELECT WORK_FILENUM FROM WORKINFO WHERE ENG_ENID = #{user_id}
         ORDER BY WORK_DATE DESC LIMIT 1;
      </selectKey>
~~~
  

📌 **해결 2**
- SQL문은 상기 코드대로 사용
- WorkInfoVO 변수 타입을 Date -> Timestamp 방식으로 바꾸고, @JsonFormat 애노테이션을 통해 들어오는 값의 형식을 지정, WorkInfo 테이블 work_date type도 Date -> Timestamp로 변경하여 해결

WorkInfoVO 클래스 타입 변경
~~~java
 	@JsonFormat
	(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Timestamp work_date;
~~~
MySql 타입 변경
~~~sql
	ALTER TABLE WORKINFO 
	CHANGE COLUMN `WORK_DATE` `WORK_DATE` TIMESTAMP NULL DEFAULT NULL ;
~~~


</div>
</details>


</br>


# 7. 그 외 트러블 슈팅

<details>
<summary>1. polyfill 에러 발생 </summary>
<div markdown="1">
	
  - 같은 페이지를 작업하던 팀원들은 에러가 나지 않았지만, 갑자기 나에게만 발생하는 것을 보고 전체 페이지를 읽어보니 오타로 발생한 알파벳이 express.js에 자동으로 import되면서 생긴문제
  - 리액트 polyfill 9개 에러 발생하였고, 오타로 발생한 알파벳이 express.js에 자동으로 import되면서 생긴 오류 import 구문 제거로 해결

</div>
</details>

<details>
  
<summary>2. java.lang.IllegalStateException: Malformed \uxxxx encoding 발생 </summary>
<div markdown="1">
  
  - application.properties에 경로 복사하고 상기 에러가 발생하였고, 경로 / -> \ 로 바꿔서 해결
  
</div>
</details>

<details>
<summary>3.스프링부트에서 데이터 전송은 성공했는데 리액트에는 전달이 안되는 문제(error) 발생</summary>
<div markdown="1">

  -  스프링부트에서 컨트롤러 공용주소를 @RequestMapping()처리한 것을 리액트 프록시 설정에서 주소를 지정해줘서 해결함
  -  [코드](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/react/src/setupProxy.js#L6C3-L6C3)

</div>  
</details>

    
</br>

# 8. 프로젝트 후 느낀점
1. 익숙치 않은 ReactJS를 학습하면서 프로젝트를 진행하다보니 언어에 대한 이해의 수준이 낮아 다수의 에러 발생 및 원하는 대로 작동하지 않는 상황을 겪고 문제를 해결하는 상황이 종종 발생했습니다. 이 경험을 통해 언어에 대해 기본은 전부 학습하고 사용해야만 하는 줄 알았던 저의 고정 관념이 깨졌고, 저 또한 학습하면서 필요한 기능을 개발 할 수 있다는 자신감을 얻었습니다.
2. 관리자 / 엔지니어 / 클라이언트 세가지 파트로 나눠져서 인원별로 공통작업을 해야했는데 초기 의사소통 부재로 같은 클래스내에 동일한 변수를 만들어서 초반에 GitHub에서 통합시 Merge Confilct가 발생한 경우가 있었습니다. 이런 문제를 겪은 후 공통 작업을 맡은 팀원들과는 코드 작업 전에 소통하여 같은 상황을 방지했습니다.
3. 이번 프로젝트에서 요구사항정의서, 기능분해도, 플로우차트를 만들면서 문서의 중요성에 대해 알게 됐습니다. 의사소통을 구두로 할 때는 같은 방향성을 이야기했지만 중간 점검에서 다르게 구현되는 경우가 발생했는데 문서화 를 통해 다르게 구현되는 경우가 거의 발생하지 않았습니다. 

 6개월 동안 열심히 배우고 익힌 것을 바탕으로 개발을 진행하고, 팀원들과 협력하여 하나의 프로젝트를 완수하면서 개발자로서의 첫 발을 내딛을 수 있었습니다. 많은 기능을 구현하고 싶었지만 아직 부족한 부분이 많아 구현을 미쳐 하지 못했던 점이 아쉬웠습니다. 하지만 이를 계기로 부족한 부분을 보완하고 지식을 쌓아가면 성장할 수 있다는 긍정적인 생각을 하게 되었습니다. 그리고 프로젝트를 통해 사용자들에게 편의를 제공하는 개발자가 되고 싶다는 생각이 더욱 확고해지는 계기가 되었습니다.


