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
    window.close();
}

function insta(){
    window.location.href="https://www.instagram.com/0._.329";
}

document.addEventListener("DOMContentLoaded", function(){
    const bgm = document.getElementById('bgm');
    bgm.addEventListener('ended',function(){
        this.currentTime=0;
        this.play();
    }, false);
    bgm.play();
});