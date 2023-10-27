# :pushpin: CloudOJ
link : [서버작업관리 솔루션](http://3.35.150.190:3000/) 
- Test ID
- 관리자 : cloud200 / cloud200!
- 엔지니어리더 : engL4 / engl123!
- 엔지니어 : eng08 / eng12345!
- 유저 : echopro23 / user12345!


## 1. 제작 기간 & 참여 인원
- 2023년 8월 21일 ~ 9월 26일
- 팀 프로젝트(팀 구성 : 6명)

</br>

## 2. 사용 기술
#### `Back-end`
  - Java 11
  - Spring Boot 2.7.14
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

</br>

## 3. 프로젝트 구조
![](https://github.com/LooklikeDinosour/OJFinalProject/blob/master/architecture.png)

</br>


## 4. ERD 설계
![](https://github.com/LooklikeDinosour/OJFinalProject/blob/5949d48899e9d1b7a108c6bd199294babb59bfbf/CloudOJ_ERD.png)

</br>

## 5. 담당 기능
- 엔지니어페이지 팀원 보기 및 마이페이지 조회
- 엔지니어페이지 프로젝트 관리 - 내 프로젝트 보기
- 엔지니어페이지 점검 목록 조회 및 파일 다운로드 구현(핵심)
- 엔지니어페이지 점검세부사항 작성 및 다중 파일 업로드(핵심)
- 관리자페이지 신규 프로젝트 조회 및 팀 배정 기능


<details>
<summary><b>핵심 기능 상세 설명</b></summary>
<div markdown="1">

### 5.1. 프로젝트 전체 흐름 (프로젝트 구조처럼 흐름 한번 다시 만들기)



### 5.2. 핵심 기능 구현
- 점검세부사항 작성 및 다중 파일업로드 기능은 점검 사항을 기록하는 핵심적인 기능
- 다중 파일 업로드는 업로드한 파일이 몇 개인지만 볼 수 있는 <input multiple>형식이 아니라 파일추가 버튼으로 <input=file>을 각각 추가하여 무엇을 업로드 했는지 볼 수 있게 구현
- 업로드 파일은 스토리지 확장성을 위해 AWS S3에 저장했고, 프론트에서 1차적으로 파일 추가와 첨부 숫자가 미 일치시 작성이 되지 않게 제한조건, 백엔드에서 다중파일에 전달되지 않은 값은 제거하게 2차로 코드 설정함

### 프론트엔드 코드
:pushpin:점검세부사항 페이지
- [관련코드](react/src/enMain/EnWorkDetail.js)
  
### 백엔드 코드
:pushpin:점검세부사항 코드
- [관련 코드1 엔지니어 Controller](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/java/com/server/cloud/engineer/controller/EngineerController.java#L88)
- [관련 코드2 ServiceImpl](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/java/com/server/cloud/engineer/service/EngineerServiceImpl.java#L43C1-L43C1)
  
:pushpin:업로드 관련 코드
- [관련 코드1 AWS Controller](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/java/com/server/cloud/s3/AwsApiController.java#L146)
- [관련 코드2 ServiceImpl](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/java/com/server/cloud/s3/AwsServiceImpl.java#L64)
- [관련 코드3 점검 세부사항 작성 SQL](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/resources/mapper/EngineerMapper.xml#L64)
- [관련 코드4 다중파일 업로드](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/resources/mapper/AwsMapper.xml#L97C2-L97C2)


</div>
</details>

</br>

## 6. 핵심 트러블 슈팅 및 문제 해결

### 1. 문제
- 한 개 작업 상세 내역에 점검에 해당하는 서버들의 작업내역을 작성하려고 했지만, 프로젝트당 서버의 갯수가 유동적이어서 그에 맞는 기능 설계가 필요했음
  그래서 프로젝트 명, 날짜, 작성자, 작업시간 등 공통부분과 각 서버당 기록되는 점검사항 등의 개별 부분으로 기록이 진행되어야 하는 문제 발생

📌 **해결**
- list 형식으로 받아서 foreach 구문을 사용하여 각 서버에 공통부분과 개별부분이 기록되게 구현 
- [코드](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/resources/mapper/EngineerMapper.xml#L64)

### 2. 문제
- 업로드를 구현시 해당 글의 PK로 파일을 업로드 및 다운로드 구현을 해야 하는데, 위에서 구현한 다중 게시글이 각각 다른 게시글을 만들면서 각각 PK 만들어져
  최초 형성된 첫 서버 외에는 다운로드 기능이 구현되지 않았음

📌 **해결**
- PK를 복제하여 연결할 수 있다는 SQL문을 찾아서 사용했지만, 참조 무결성을 무시하여 PK관련 에러가 발생했고,
  File 테이블에 UUID 컬럼을 한개 생성하여 해당 UUID를 복사하여 INSERT 구문에 키로 전달 받게 코드를 구현하여 해결
- [코드](https://github.com/LooklikeDinosour/OJFinalProject/blob/892c08cfb98ef43fc36332d02e4409187235f14f/springboot/src/main/resources/mapper/AwsMapper.xml#L97C2-L97C2)

</br>


## 7. 그 외 트러블 슈팅

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

## 8. 회고 / 느낀점
1. 관리자 / 엔지니어 / 클라이언트 3 파트로 나눠져서 인원별로 공통작업을 해야했는데 초기 의사소통 부재로 같은 변수를 만들어서 초반에 Git 작업시 꼬이는 경우가 있었습니다.
   문제를 겪은 후부터는 공통 작업을 맡은 팀원들과 작업 전에 소통하여 같은 상황을 방지했습니다.
2. React.JS를 학습하면서 프로젝트를 진행하다보니 언어에 대한 이해의 수준이 낮아 다수의 에러, 예상치 못한 기능 작동 등 다수의 예기치 못한 상황을 겪었고
   언어에 대한 정확한 이해가 있어야 기능 구현을 더 수월하게 할 수 있다는 점을 깨달았습니다. 이런 상황들이 겹쳐져 일정이 촉박해져 계획한 것 보다 기능 구현을 하지 못했다는 점이 아쉬웠습니다.
3. 서버실시간모니터링 솔루션을 목표로 했지만 실제사용경험이 적고, 자료를 적절히 찾지못하여 AWS같은 가상 서버 실시간 모니터링을 구현하지 못했다는 점이 아쉽습니다.
4. 이번 프로젝트를 통해 요구사항정의서, 기능분해도, 플로우차트를 직접 만들어보니 의사소통에 있어서 문서의 중요성을 알게됐습니다.
5. 기능 개발을 하면서 본인의 기능구현에만 집중하여 팀원들의 기능에 대한 이해가 떨어졌던 것이 아쉬웠습니다. 개발 오류를 잡느라 프로젝트 발표 오전까지 몰두하다 프로젝트 시연 발표를 맡아서 시연 연습을 하는데
   막상 다알고 있을 거라고 생각했던 기능이었는데 불구하고, 구현된 것을 사용해보니 제가 생각했던 것과 다르고 기능들이 더 추가 되어 시연 순서를 익히는데 애를 먹었습니다. 기능분해도에 정의된 것 말고 직접 기능을 시연    하면서 프로젝트를 진행해왔다면 더 매끄러운 프로세스를 만들 수 있었다고 생각합니다.

