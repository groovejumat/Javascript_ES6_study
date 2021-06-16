function requestData() {
    return fetch()
        .catch(error => {
            //...
            return null
        })
        .finally(() => {
            sendLogToServer('requestData Finished');
        });
}
requestData().then(data => console.log(data)); 
//finally의 처리덕분에, 대부분에 상황에서 Promise의 객체가 fullfiled인 상태로 넘어오게 된다.
//문제가 생겨서 reject상태인 catch상태를 탓더라도, finally에서 null값을 그대로 전달 받아온다. (Promise객체 (fullfilled상태를 그대로 가져오기 때문))