## properties와 환경변수는 단톡 공지 참고 ##

### http://localhost:8080/swagger-ui/index.html#/ ###

## application.properties ##
spring.application.name=Rehappy

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver<br>
spring.datasource.url=jdbc:mysql://localhost:3306/rehappy<br>
spring.datasource.username=root<br>
spring.datasource.password=0000

spring.jpa.show-sql=true<br>
spring.jpa.hibernate.ddl-auto=update<br>
spring.jpa.properties.hibernate.format_sql=true<br>
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

## frontend 용 환경변수 만드는 법 ##
<b>1. 환경 변수 파일 생성 <br></b>
frontend 폴더(node_modules, public, src와 같은 위치)에서 .env 파일 만들기<br>

<b>2. 저장 <br></b>
.env 파일에 들어가서 &nbsp;&nbsp; REACT_APP_원하는이름=내API키 &nbsp;&nbsp; 이런 형식으로 저장<br>
예) REACT_APP_GOOGLE_PLACES_API_KEY = 내API키<br>

<b>3. 사용 <br></b>
사용할 때는 평소 변수 생성하듯이 쓰면 되는데, 내가 설정한 API 변수명 앞에 process.env.를 붙여서<br>
const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;<br>
이렇게 사용하면 된다.

### 주의할 점 ###
<li> .env 파일은 그냥 File 형식으로, .env 옆에 붙은 아이콘이 메모장마냥 엄청 평범하게 생겼다. 그거 맞으니 당황 xx
<li> 저장과 사용은 꼭 형식을 지켜 사용해야 함.
<li> .env 파일에 키 저장할 때 따옴표 사용 x, 문장 끝에 ; 사용 x. 그냥 줄바꿈
<br><br>
이렇게 하면 push 할 때 마다 키를 지우지 않아도 됩니다~
<br>
헷갈리면 물어바요!
