pipeline {
    agent any
    stages {
        stage('Git pull') {
            steps {
                script {
                    // 깃 풀
                    sh "cd /home/rlghks3004/recycle-backend && git pull origin main"
                }
            }
        }
        stage('Docker Compose Build') {
            steps {
                script {
                    // 도커 컴포즈 필드
                    sh "cd /home/rlghks3004/recycle-backend && docker-compose up -d --build"
                }
            }
        }
        stage('Remove Unused Docker Old Container And Image') {
            steps {
                script {
                    // 사용하지 않는 컨테이너 삭제
                    sh "docker container prune -f"
                    // 사용하지 않는 이미지 삭제
                    sh "docker image prune -f"
                }
            }
        }
    }
}