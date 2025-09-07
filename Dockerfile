# Node.js 22.14.0 기반 이미지 사용
FROM node:22.14.0

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 의존성 설치용 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 코드 복사
COPY . .

# 앱 포트 설정 (예: 3000번)
EXPOSE 3130

# 실행 명령
CMD ["npm", "start"]
