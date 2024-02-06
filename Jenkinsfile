pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "rlghks3004/codeforchanges"
        DOCKERHUB_CREDENTIALS_ID = "docker-hub-credential"
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("$DOCKER_IMAGE:latest")
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image("$DOCKER_IMAGE:latest").push()
                    }
                }
            }
        }
        stage('Deploy to GCE') {
            steps {
                script {
                    // 기존 컨테이너가 있다면 중지하고 제거
                    sh "docker stop recycle-backend_app_1 || true"
                    sh "docker rm recycle-backend_app_1 || true"
                    
                    // 최신 이미지를 끌어온 후 컨테이너 실행
                    sh "docker pull $DOCKER_IMAGE:latest"
                    sh "docker run -d --name recycle-backend_app_1 -p 3000:3000 --env-file /home/rlghks3004/recycle-backend/.env $DOCKER_IMAGE:latest"
                }
            }
        }
    }
}
