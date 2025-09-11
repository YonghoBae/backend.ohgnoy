OhGnoy API Server (Node.js)

이 프로젝트는 "OhGnoy" 웹 애플리케이션의 메인 백엔드 API 서버입니다. Node.js와 Express 프레임워크를 기반으로, 데이터베이스 연동, 사용자 인증, 실시간 통신 등 핵심 비즈니스 로직을 담당합니다.
1. 주요 기능

    RESTful API 제공 (게시글, 댓글, 사용자 등)

    JWT (JSON Web Token) 기반의 사용자 인증 및 인가

    Socket.IO를 이용한 실시간 채팅 기능

    Sequelize ORM을 통한 데이터베이스 스키마 관리 및 상호작용

2. 기술 스택

    Framework: Node.js, Express.js

    Database: MySQL

    ORM: Sequelize

    Authentication: JWT (jsonwebtoken), bcryptjs

    Real-time: Socket.IO

    DevTools: nodemon

3. 시작하기
의존성 설치

npm install

환경 변수 설정

프로젝트 루트에 .env 파일을 생성하고 아래 내용을 채워주세요.

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ohgnoy_db

# JWT
JWT_SECRET=your_super_secret_key_for_jwt

# Server
PORT=3001

개발 서버 실행

npm start

