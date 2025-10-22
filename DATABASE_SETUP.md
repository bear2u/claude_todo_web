# 데이터베이스 설정 가이드

## 옵션 1: 클라우드 PostgreSQL (가장 쉬움) 🌟

### Neon (추천)
1. [Neon](https://neon.tech/)에 가입 (무료)
2. 새 프로젝트 생성
3. Connection String 복사
4. `.env` 파일에 붙여넣기:
```bash
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```
5. 스키마 푸시:
```bash
npm run db:push
```
6. 테스트:
```bash
npm run db:test
```

### Supabase
1. [Supabase](https://supabase.com/)에 가입 (무료)
2. 새 프로젝트 생성
3. Settings → Database → Connection String (URI) 복사
4. `.env` 파일 업데이트
5. 스키마 푸시 및 테스트

---

## 옵션 2: Docker (권장)

### 1. Docker 설치
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

# macOS
brew install docker docker-compose
```

### 2. PostgreSQL 컨테이너 시작
```bash
docker-compose up -d
```

### 3. 데이터베이스 확인
```bash
npm run db:setup
```

### 4. 스키마 생성
```bash
npm run db:push
```

### 5. 테스트
```bash
npm run db:test
```

### 컨테이너 관리
```bash
# 중지
docker-compose down

# 로그 확인
docker-compose logs -f postgres

# 데이터 삭제 (주의!)
docker-compose down -v
```

---

## 옵션 3: 로컬 PostgreSQL 설치

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 데이터베이스 생성
sudo -u postgres createdb binance_clone

# 비밀번호 설정
sudo -u postgres psql
ALTER USER postgres PASSWORD 'postgres';
\q
```

### macOS
```bash
brew install postgresql@16
brew services start postgresql@16

# 데이터베이스 생성
createdb binance_clone
```

### Windows
1. [PostgreSQL 다운로드](https://www.postgresql.org/download/windows/)
2. 설치 후 pgAdmin에서 데이터베이스 생성

---

## 데이터베이스 확인

### 1. 연결 테스트
```bash
npm run db:setup
```

### 2. 스키마 푸시
```bash
npm run db:push
```

### 3. 샘플 데이터로 테스트
```bash
npm run db:test
```

### 4. Drizzle Studio로 확인
```bash
npm run db:studio
```
브라우저에서 https://local.drizzle.studio 열기

---

## 문제 해결

### "ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL이 실행되지 않음
- 해결: `sudo systemctl start postgresql` 또는 `docker-compose up -d`

### "database does not exist"
- 데이터베이스가 생성되지 않음
- 해결: `createdb binance_clone` 또는 Neon/Supabase 사용

### "password authentication failed"
- `.env`의 비밀번호가 틀림
- 해결: PostgreSQL 비밀번호 확인 및 수정

---

## 권장 순서

1. **가장 빠른 방법**: Neon 사용 (5분 소요)
2. **Docker 있는 경우**: docker-compose 사용 (2분 소요)
3. **장기 개발**: 로컬 PostgreSQL 설치 (10분 소요)

---

## 현재 DATABASE_URL 확인

```bash
# .env 파일 내용 확인 (비밀번호 가려짐)
npm run db:setup
```

정상 작동 시 다음과 같은 출력이 나옵니다:
```
✅ Connected!
🔍 Checking existing tables...
```
