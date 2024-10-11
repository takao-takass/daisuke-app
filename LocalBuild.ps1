$imageName = "takao0119/daisuke-app"
$currentDateTime = "latest"#Get-Date -Format "yyyyMMdd_HHmmss"
$tag = "${imageName}:${currentDateTime}"

docker build --build-arg REACT_APP_MESSAGE_STREAM_URL=http://127.0.0.1:8000/conversation/messageStream -t $tag .

docker login
docker push $tag
docker logout

Write-Host "Docker image $tag has been built and pushed to Docker Hub."