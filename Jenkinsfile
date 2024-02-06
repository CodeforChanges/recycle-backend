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
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'gce-ssh-credentials',
                            transfers: [sshTransfer(execCommand: "cd /home/rlghks3004/recycle-backend && docker-compose pull && docker-compose up -d")]
                        )
                    ]
                )
            }
        }
    }
}
