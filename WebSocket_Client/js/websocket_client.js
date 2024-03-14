const SERVER_IP = 'localhost';
const SERVER_PORT= 9000;
const server_address =`ws://${SERVER_IP}:${SERVER_PORT}`;
const socket = new WebSocket(server_address)

socket.onopen = function(e) {
    const log_msg ='[open] 연결이 설정되었습니다.'
    console.log(log_msg);


    
    displayMessage('#messages', log_msg);
}

socket.onclose = function(e) {
    let log_msg ='';
   if(e.wasClean){
    log_msg =`[close] 연결이 정상적으로 종료되었습니다. 코드=${e.code}, 원인=${e.reason}`;
    
    displayMessage('#messages', log_msg);
   }else{
    log_msg =`[close] 연결이 비정상적으로 종료되었습니다. 코드=${e.code}, 원인=${e.reason}`;
   }

   console.log(log_msg);
   displayMessage('#messages', log_msg);
}

socket.onerror = function(error){
    const log_msg =`[error] ${error.message}`;
    console.log(log_msg);
    displayMessage('#messages', log_msg);

}


socket.onmessage = function(error){
    const log_msg =`[message] 서버로부터 데이터 수신: ${e.data}`;
    console.log(log_msg);
    displayMessage('#messages', log_msg);

    displayPacketMessage('#')

}


const displayMessage = function($parentSelector, log_msg) {
    // 이 요소 아래에 메시지 요소를 추가
    const parentElem = document.querySelector($parentSelector);
    
    const childElem = document.createElement('div');
    childElem.textContent = msg;
    parentElem.appendChild(childElem);
}

const displayPacketMessage = function($parentSelector, message) {
    // 이 요소 아래에 메시지 요소를 추가
    const parentElem = document.querySelector($parentSelector);

    // json문자열 -> js 객체로 변환
    const jsonObj = JSON.parse(message);

    let msg ='';
    switch(msgObj.cmd){
        case 'connect':
            msg = msgObj.result;
            break;
        case 'login':
            msg = msgObj.result === 'ok' ? '로그인 성공' : '로그인 실패';
            break;
        case 'allchat':
            if('result' in msgObj)
            msg = msgObj.result === 'ok' ? '채팅 전송 성공' : '채팅 전송 실패';
            else if('id' in msgObj)
            msg = `${msgObj.id} => ${msgObj.result}`;
            break;        
    }

    const childElem = document.createElement('div');
    childElem.textContent = msg;
    parentElem.appendChild(childElem);
}