React + PostgreSQL (Docker) 앱 실행 가이드
애플리케이션 구현이 완료되었습니다. Docker를 사용하여 데이터베이스를 실행합니다.

1. Docker 실행 (데이터베이스)
Docker Desktop이 실행 중인지 확인하세요.
프로젝트 루트 디렉토리(h:/프로젝트/test)에서 다음 명령어를 실행하여 PostgreSQL 컨테이너를 시작합니다.
docker-compose up -d
이 명령은 PostgreSQL 컨테이너를 백그라운드에서 실행하고, 
server/database.sql
 파일을 사용하여 자동으로 데이터베이스와 테이블을 초기화합니다.
2. 환경 변수 확인
server/.env
 파일이 
docker-compose.yml
의 설정과 일치하는지 확인하세요. (기본값으로 설정해 두었습니다)

PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pern_auth
JWT_SECRET=your_jwt_secret_key
3. 서버 실행 (백엔드)
새 터미널을 열고 다음 명령어를 실행하세요:

cd server
node server.js
4. 클라이언트 실행 (프론트엔드)
또 다른 새 터미널을 열고 다음 명령어를 실행하세요:

cd client
npm run dev
브라우저에서 http://localhost:5173으로 접속하세요.

5. 문제 해결
포트 충돌: 이미 5432 포트를 사용하는 다른 PostgreSQL 인스턴스가 있다면 중지하거나 
docker-compose.yml
에서 포트를 변경해야 합니다 (예: "5433:5432"). 포트를 변경하면 
.env
 파일의 DB_PORT도 수정해야 합니다.
데이터 초기화 안됨: 컨테이너를 처음 실행할 때만 init.sql이 실행됩니다. 스키마를 변경하고 다시 초기화하려면 볼륨을 삭제해야 합니다: docker-compose down -v 후 다시 up.
