pipeline {
    agent any

    environment {
        // Dockerイメージ名やタグなど、必要な環境変数を設定
        IMAGE_NAME = 'calite-backend-app'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Gitリポジトリからコードをチェックアウト
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // ビルドコマンドを実行
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // テストコマンドを実行
                sh 'npm test'
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    // Dockerイメージをビルド
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."

                    // Dockerイメージをプッシュ
                    // 事前にDocker Hubへの認証情報を設定しておく必要があります
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }

    // post {
    //     always {
    //         // ビルドプロセスの後に常に実行されるステップ
    //         // 例: ビルドのクリーンアップ、通知の送信など
    //     }
    // }
}
