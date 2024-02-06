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
                    docker.withRegistry('<https://index.docker.io/v1/>', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image("$DOCKER_IMAGE:latest").push()
                    }
                }
            }
        }
        stage('Deploy to GCE') {
            steps {
                script {
                    // Jenkins가 돌아가는 GCE 인스턴스 내부에서 바로 컨테이너를 관리
                    sh "docker-compose -f /home/rlghks3004/recycle-backend/docker-compose.yml pull"
                    sh "docker-compose -f /home/rlghks3004/recycle-backend/docker-compose.yml up -d"
                }
            }
        }
    }
}