# :pushpin: CloudOJ
>서버작업관리 솔루션 
>[https://cloudoj.dev](http://3.35.150.190:3000/)  


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
#### 'Database'  
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

## 5. 담당 기능 및 API 명세
- 엔지니어 리스트 및 마이페이지 조회 기능
- 엔지니어 점검세부사 작성 및 다중 파일 업로드 기능
- 엔지니어 점검 목록 조회 및 파일 다운로드 구현 기능
- 관리자 신규 프로젝트 조회 및 팀 배정 기능 구현

- [CloudOJ API 명세](https://docs.google.com/spreadsheets/d/1fEN_aIPfPDlI2uHdG2agFtd14YqBQp__zkUPyM_5Vms/edit#gid=0)

<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">

### .1. 전체 흐름
![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow1.png)

### 4.2. 사용자 요청
![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow_vue.png)

- **URL 정규식 체크** :pushpin: [코드 확인](https://github.com/Integerous/goQuality/blob/b587bbff4dce02e3bec4f4787151a9b6fa326319/frontend/src/components/PostInput.vue#L67)
  - Vue.js로 렌더링된 화면단에서, 사용자가 등록을 시도한 URL의 모양새를 정규식으로 확인합니다.
  - URL의 모양새가 아닌 경우, 에러 메세지를 띄웁니다.

- **Axios 비동기 요청** :pushpin: [코드 확인]()
  - URL의 모양새인 경우, 컨텐츠를 등록하는 POST 요청을 비동기로 날립니다.

### 4.3. Controller

![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow_controller.png)

- **요청 처리** :pushpin: [코드 확인](https://github.com/Integerous/goQuality/blob/b2c5e60761b6308f14eebe98ccdb1949de6c4b99/src/main/java/goQuality/integerous/controller/PostRestController.java#L55)
  - Controller에서는 요청을 화면단에서 넘어온 요청을 받고, Service 계층에 로직 처리를 위임합니다.

- **결과 응답** :pushpin: [코드 확인]()
  - Service 계층에서 넘어온 로직 처리 결과(메세지)를 화면단에 응답해줍니다.

### 4.4. Service

![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow_service1.png)

- **Http 프로토콜 추가 및 trim()** :pushpin: [코드 확인]()
  - 사용자가 URL 입력 시 Http 프로토콜을 생략하거나 공백을 넣은 경우,  
  올바른 URL이 될 수 있도록 Http 프로토콜을 추가해주고, 공백을 제거해줍니다.

- **URL 접속 확인** :pushpin: [코드 확인]()
  - 화면단에서 모양새만 확인한 URL이 실제 리소스로 연결되는지 HttpUrlConnection으로 테스트합니다.
  - 이 때, 빠른 응답을 위해 Request Method를 GET이 아닌 HEAD를 사용했습니다.
  - (HEAD 메소드는 GET 메소드의 응답 결과의 Body는 가져오지 않고, Header만 확인하기 때문에 GET 메소드에 비해 응답속도가 빠릅니다.)

  ![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow_service2.png)

- **Jsoup 이미지, 제목 파싱** :pushpin: [코드 확인]()
  - URL 접속 확인결과 유효하면 Jsoup을 사용해서 입력된 URL의 이미지와 제목을 파싱합니다.
  - 이미지는 Open Graphic Tag를 우선적으로 파싱하고, 없을 경우 첫 번째 이미지와 제목을 파싱합니다.
  - 컨텐츠에 이미지가 없을 경우, 미리 설정해둔 기본 이미지를 사용하고, 제목이 없을 경우 생략합니다.


### 4.5. Repository

![](https://zuminternet.github.io/images/portal/post/2019-04-22-ZUM-Pilot-integer/flow_repo.png)

- **컨텐츠 저장** :pushpin: [코드 확인]()
  - URL 유효성 체크와 이미지, 제목 파싱이 끝난 컨텐츠는 DB에 저장합니다.
  - 저장된 컨텐츠는 다시 Repository - Service - Controller를 거쳐 화면단에 송출됩니다.

</div>
</details>

</br>

## 6. 핵심 트러블 슈팅
### 5.1. 컨텐츠 필터와 페이징 처리 문제
- 저는 이 서비스가 페이스북이나 인스타그램 처럼 가볍게, 자주 사용되길 바라는 마음으로 개발했습니다.  
때문에 페이징 처리도 무한 스크롤을 적용했습니다.

- 하지만 [무한스크롤, 페이징 혹은 “더보기” 버튼? 어떤 걸 써야할까](https://cyberx.tistory.com/82) 라는 글을 읽고 무한 스크롤의 단점들을 알게 되었고,  
다양한 기준(카테고리, 사용자, 등록일, 인기도)의 게시물 필터 기능을 넣어서 이를 보완하고자 했습니다.

- 그런데 게시물이 필터링 된 상태에서 무한 스크롤이 동작하면,  
필터링 된 게시물들만 DB에 요청해야 하기 때문에 아래의 **기존 코드** 처럼 각 필터별로 다른 Query를 날려야 했습니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~java
/**
 * 게시물 Top10 (기준: 댓글 수 + 좋아요 수)
 * @return 인기순 상위 10개 게시물
 */
public Page<PostResponseDto> listTopTen() {

    PageRequest pageRequest = PageRequest.of(0, 10, Sort.Direction.DESC, "rankPoint", "likeCnt");
    return postRepository.findAll(pageRequest).map(PostResponseDto::new);
}

/**
 * 게시물 필터 (Tag Name)
 * @param tagName 게시물 박스에서 클릭한 태그 이름
 * @param pageable 페이징 처리를 위한 객체
 * @return 해당 태그가 포함된 게시물 목록
 */
public Page<PostResponseDto> listFilteredByTagName(String tagName, Pageable pageable) {

    return postRepository.findAllByTagName(tagName, pageable).map(PostResponseDto::new);
}

// ... 게시물 필터 (Member) 생략 

/**
 * 게시물 필터 (Date)
 * @param createdDate 게시물 박스에서 클릭한 날짜
 * @return 해당 날짜에 등록된 게시물 목록
 */
public List<PostResponseDto> listFilteredByDate(String createdDate) {

    // 등록일 00시부터 24시까지
    LocalDateTime start = LocalDateTime.of(LocalDate.parse(createdDate), LocalTime.MIN);
    LocalDateTime end = LocalDateTime.of(LocalDate.parse(createdDate), LocalTime.MAX);

    return postRepository
                    .findAllByCreatedAtBetween(start, end)
                    .stream()
                    .map(PostResponseDto::new)
                    .collect(Collectors.toList());
    }
~~~

</div>
</details>

- 이 때 카테고리(tag)로 게시물을 필터링 하는 경우,  
각 게시물은 최대 3개까지의 카테고리(tag)를 가질 수 있어 해당 카테고리를 포함하는 모든 게시물을 질의해야 했기 때문에  
- 아래 **개선된 코드**와 같이 QueryDSL을 사용하여 다소 복잡한 Query를 작성하면서도 페이징 처리를 할 수 있었습니다.

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

~~~java
/**
 * 게시물 필터 (Tag Name)
 */
@Override
public Page<Post> findAllByTagName(String tagName, Pageable pageable) {

    QueryResults<Post> results = queryFactory
            .selectFrom(post)
            .innerJoin(postTag)
                .on(post.idx.eq(postTag.post.idx))
            .innerJoin(tag)
                .on(tag.idx.eq(postTag.tag.idx))
            .where(tag.name.eq(tagName))
            .orderBy(post.idx.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
            .fetchResults();

    return new PageImpl<>(results.getResults(), pageable, results.getTotal());
}
~~~

</div>
</details>

</br>



## 7. 그 외 트러블 슈팅
<details>
<summary>1. </summary>
<div markdown="1">


</div>
</details>

<details>
<summary>2. </summary>
<div markdown="1">
  
  - main.js 파일에 `Vue.config.devtools = true` 추가로 해결
  - [https://github.com/vuejs/vue-devtools/issues/190](https://github.com/vuejs/vue-devtools/issues/190)
  
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

