// 모달 창 표시 함수

function showInstructions(){
    
    const modal =document.getElementById("modal");
    modal.style.display="block";
}

// 모달 창 닫기 함수
const closeModal = ()=>{
    const modal =document.getElementById("modal");
    modal.style.display="none"
}

function  shareGame() {
    const url = window.location.href;

    navigator.clipboard.writeText(url)
    .then(function(){
        alert("[복사완료]다른클라이머들에게 링크를 보내주세요!.")
    })
    .catch(function(){
        alert("[복사실패] ㅠㅠ 수동으로 복사해서보내주세요! ")
    })
    
}

function exitGame(){
    //사용자에게 확인 메시지를 표시하고, 확인 시 현재 창을 닫음
    const confirmation  =confirm("정말 게임을 종료하시겠습니까?");
    if(confirmation ){
    window.close();
    }
}

// 모달창 열기
function exitClimbGame(){
    document.getElementById("exitGameModal").style.display='block';
}
//모달창 닫기
function closeClimbGameModal(){
    document.getElementById("exitGameModal").style.display ='none';
}

function exitConfirm(){
        window.close();
}

function insta(){
    window.location.href="https://www.instagram.com/0._.329";
}

document.addEventListener("DOMContentLoaded", function(){
    const bgm = document.getElementById('bgm');
    bgm.play().then(()=>{
        //음소거를 해제하고 재생합니다.
        bgm.muted =false;
    }).catch((error) =>{
        //오디오 재생에 실한 경우 처리할 내용
        console.error('오디오 재생에 실패했습니다:', error);
    }); 
});


function startGame(){
    window.open("climber-Tycoon.html");
}

//클라이밍 모달창 열기
function startClimbing(){
    document.getElementById("climbGameModal").style.display='block';
}

//모달창 닫기
function closeGameModal(){
    document.getElementById("climbGameModal").style.display='none';
}

//게임 오버 횟수를 저장할 변수 선언
let gameOverCount =0;

//클라이밍 모달창에서 "오늘은 컨디션이 좀 ... 쉰다!를 선택한 경우"
function noClimb(){
    if(gameOverCount <10) {
        //초기 확률은 100%에서 시작하여 10%씩 감소합니다.
        let probability =1 -(gameOverCount*0.1);
    

    //0부터 1사이의 무작위한 값 생성
    const randomNumber = Math.random();

    //현재 확률로 게임 오버 또는 모달창 닫기
    if(randomNumber < probability){
        //게임 오버 메시지와 점수 표시
        alert("게임오버 - 클밍을 못가서 돌연사 \n 당신의 점수는 " + score+"입니다.");
    

    //점수 초기화
    score = 0;

    //게임 오버 횟수 증가
    gameOverCount++;

    //첫 화면으로 돌아가기
    window.location.href = "game-over.html"; //게임 오버 페이지로 이동
}else{
    //클라이밍 모달창 닫기
    closeClimbGameModal();

}
}else{
    //5% 확률로 게임 오버 또는 모달창 닫기

    let randomNumber = Math.random();
    if(randomNumber < 0.05){

        //게임 오버 메시지와 점수 표시
        alert("게임 오버 - 클라이밍을 너무 쉬었더니 돌연사  \n 당신의 점수는 "+score+
        "입니다");

        //점수 초기화
        score = 0;

        //게임 오버 횟수 증가
        gameOverCount++;

        //첫 화면으로 돌아가기
        window.location.href="game-over.html"; //게임 오버 페이지 이동
            
    }else{
            //클라이밍 모달창 닫기
            closeClimbGameModal();
        }

    }
}
