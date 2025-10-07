# OhGnoy API Server (Node.js)

'OhGnoy' 웹 애플리케이션의 메인 백엔드 API 서버입니다. Node.js와 Express 프레임워크를 기반으로 하며, 데이터베이스 연동, 사용자 인증, 실시간 통신 등 핵심 비즈니스 로직을 담당합니다.

## ✨ 주요 기능

- **RESTful API**: 게시글, 댓글, 사용자 정보 등 CRUD 기능을 위한 API 제공
- **사용자 인증**: JWT (JSON Web Token) 기반의 사용자 인증 및 인가
- **실시간 채팅**: Socket.IO를 이용한 실시간 채팅 기능
- **데이터베이스 관리**: Sequelize ORM을 통한 데이터베이스 스키마 관리 및 상호작용

## 🛠️ 기술 스택

- **Framework**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Real-time**: Socket.IO
- **DevTools**: nodemon

## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone [https://github.com/YonghoBae/backend.ohgnoy.git](https://github.com/YonghoBae/backend.ohgnoy.git)
cd backend.ohgnoy
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 각자의 환경에 맞게 채워주세요.

```env
# .env.example

# Server
PORT=3001

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ohgnoy_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_for_jwt

# Email (for Nodemailer)
EMAIL=your_email@domain.com
PW=your_email_password
```

### 4. 데이터베이스 설정

로컬 환경에 MySQL 데이터베이스를 설치하고, `.env` 파일에 설정한 `DB_NAME`으로 데이터베이스를 생성해주세요.

### 5. 개발 서버 실행

```bash
npm start
```

서버가 실행되면 설정한 `PORT` (기본값 3001)에서 API 요청을 받을 수 있습니다.

## 📖 API 엔드포인트

- `POST /entry`: 회원가입
- `POST /login`: 로그인
- `GET /post/list`: 전체 게시글 조회
- `POST /post/create`: 새 게시글 작성
- (기타 주요 엔드포인트 추가)

## 📁 프로젝트 구조

```
/
├── /config        # 데이터베이스 및 환경설정 파일
├── /models        # Sequelize 모델(테이블) 정의
├── /public        # 정적 파일
├── /routes        # API 라우팅 로직
├── /views         # 템플릿 파일 (EJS)
├── app.js         # Express 앱 메인 파일
└── socket.js      # Socket.IO 설정 파일
```