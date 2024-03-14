// 모달 창 표시 함수

function showInstructions(){
    
    let modal =document.getElementById("modal");
    modal.style.display="block";
}

// 모달 창 닫기 함수
let closeModal = ()=>{
    let modal =document.getElementById("modal");
    modal.style.display="none"
}

function  shareGame() {
    let url = window.location.href;

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
    let confirmation  =confirm("정말 게임을 종료하시겠습니까?");
    if(confirmation ){
    window.close();
    }
}



// 게임종료확인 모달창 열기
function exitClimbGame(){
     document.getElementById("exitGameModal").style.display='block';
     //사용자에게 확인 메시지를 표시하고, 확인 시 현재 창을 닫음
    
     window.close();
}

//모달창 닫기
function closeClimbGameModal(){
    document.getElementById("climbGameModal").style.display ='none';
}

function exitConfirm(){
     
    window.close();
    }


function insta(){
    window.location.href="https://www.instagram.com/0._.329";
}


function startGame(){
    window.location.href=("climber-Tycoon.html");
   
    // 게임오버 횟수 초기화
    localStorage.setItem(gameOverCount, '0');
    console.log("게임 오버 횟수", gameOverCount);
}


function restartGame(){
    window.location.href=("climber-Tycoon.html");
     // 이전 게임에서의 확률을 콘솔에 출력 (확인을 위한 코드)
    // console.log("이전 게임에서의 게임 오버 확률:", probability);
    // 이전 게임에서의 게임 오버 횟수 불러오기
    let gameOverCount = parseInt(localStorage.getItem("gameOverCount")) || 0;
    console.log("게임 오버 횟수", gameOverCount);
}

//클라이밍 모달창 열기
function startClimbing(){
    document.getElementById("climbGameModal").style.display='block';
    

   
}

//모달창 닫기
function closeGameModal(){
    document.getElementById("climbGameModal").style.display='none';
}

// bmg설정하기
document.addEventListener("DOMContentLoaded",function(){
    let bgm = document.getElementById("bgm")
    let isPlaying =false;//음악 재생 상태 추적 변수

    let gameTitle = document.getElementById("gameTitle");
    if(gameTitle){
    
    let originalTitle = gameTitle.textContent; //원래 게임 타이틀

    gameTitle.addEventListener('mouseover', function(){
        //제목에 마우스 오버시 타이틀 변경
        if(!isPlaying){
            this.textContent ="BGM: Play";
        }else{
            this.textContent = "BGM: Stop";
        }
        
    });
    
    gameTitle.addEventListener("mouseout",function(){
        //마우스 아웃시, 음아기 재생 중이 아닐 경우에만 원래 타이틀로 복원
        if (!isPlaying){
            this.textContent = originalTitle;
        }
        //음악 재생 중일 때 마우스 아웃해도 타이틀 변경을 유지하지 않음
    });

    gameTitle.addEventListener("click",function(){
        //타이틀 클릭 시 음악 재생 / 정지 토글
        if(!isPlaying){
            bgm.play();
            this.textContent = "BGM: Stop";
            isPlaying=true;
        }else{
            bgm.pause();
            this.textContent="BGM: Play";
            isPlaying=false;
        }
    });
}
});





 //게임 오버 횟수를 저장할 변수 선언
 let gameOverCount =0;
 let score=0;

//클라이밍 모달창에서 "오늘은 컨디션이 좀 ... 쉰다!를 선택한 경우"
function noClimb(){
    

    let probability;
    //초기 확률 설정 및 감소 로직

     // 이전 게임에서의 게임 오버 횟수 불러오기
    let gameOverCount = parseInt(localStorage.getItem("gameOverCount")) || 0;

    
    if(gameOverCount ===0) {
       probability=1; //100%
    }else if(gameOverCount ===1){
       probability=0.5; //50% 
    }else if(gameOverCount ===2){
       probability=0.25; //25%
    }else if(gameOverCount ===3){
        probability=0.12; //12%
    }else{
        probability=0.01; //그 이후는 1%로 고정
    }

    //0부터 1사이의 무작위한 값 생성
    let randomNumber = Math.random();

    //현재 확률로 게임 오버 또는 모달창 닫기
    if(randomNumber < probability){
        //게임 오버 메시지와 점수 표시
        
    


    //게임 오버 횟수 증가
    gameOverCount++;

    //게임 오버 횟수 로컬에 저장
    localStorage.setItem("gameOverCount",gameOverCount);

    //게임 오버 페이지로 이동
    window.location.href="../클라이머키우기/game-over.html"; 
}else{
    //클라이밍 모달창 닫기
    closeClimbGameModal();
}
}


//게임오버 화면 공유
function shareResult(){
    //html2canvas를 사용
    html2canvas(document.getElementById("gameOverBody")).then(function(canvas){
        //canvas를 이미지 url로 변환
        let imgData = canvas.toDataURL('image/png');

        //이미지를 클립보드에 복사합니다.
        copyImageToClipboard(imgData);

        //사용자에게 이미지가 복사되었음을 알리는 메시지를 표시합니다.
        alert("[Ctrl + V를 눌러 이미지로 공유하세요!]")
    });
  
}



//이미지를 클립보드에 복사하는 함수
function copyImageToClipboard(imageData){
    let canvas = document.createElement("canvas");
    let cts = canvas.getContext("2d");
    let img = new Image();
    img.src = imageData;
    canvas.width=img.width;
    canvas.height=img.height;
    ctx.drawImage(img,0,0);

    //캔버스에 그려진 이미지를 Blob으로 변환합니다.
    canvas.toBlob(function(blob){
        //Blob을 클립보드  api를 통해 클립보드에 복사합니다.
        navigator.clipboard.write([
            new ClipboardItem({"image/png":blob})
            ]).then(function(){
                console.log('이미지가 클립보드에 복사 되었습니다.');
            }, function(error){
                console.error('클립보드에 이미지를 복사하는 중 오류가 발생했습니다.:',error);
            });
    }, 'image/png');
    }

