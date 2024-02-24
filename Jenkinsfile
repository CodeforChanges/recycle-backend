pipeline {
    agent any
    stages {
        stage('Move to project folder and git pull') {
            steps {
                script {
                    // 폴더로 이동
                    sh "cd /home/rlghks3004/recycle-backend"
                    // 깃 풀
                    sh "git pull origin main"
                }
            }
        }
        stage('Docker Compose Build') {
            steps {
                script {
                    // 도커 컴포즈 필드
                    sh "sudo docker-compose up -d --build"
                }
            }
        }
        stage('Remove Unused Docker Old Container And Image') {
            steps {
                script {
                    // 사용하지 않는 컨테이너 삭제
                    sh "sudo docker container prune -f"
                    // 사용하지 않는 이미지 삭제
                    sh "sudo docker image prune -f"
                }
            }
        }
    }
}
