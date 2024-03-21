var score = 0;
var timer = 10;




document.getElementById("startGame1").addEventListener("click", function() {
    document.getElementById("gameMenu").style.display = "none"; // 메뉴 숨기기
    document.getElementById("miniGame-Container").style.display = "block"; // 게임 컨테이너 보이기
    startGame1(); // 게임 시작 함수 호출
});

function startGame1() {
// 여기에 게임 시작 로직을 구현합니다.
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth > 800 ? 800 :350, 
        height: window.innerHeight > 800 ? 600 : 600,
        parent: "gameWindow", 
        scene: {
            // preload: preload, 오디오 주석처리
            create: create
    }
};

//게임 인스턴스 생성
var game = new Phaser.Game(config);

// function preload() {
// 사운드 파일 미리 로딩
// this.load.audio('break', '../Bgm/break.mp3'); // 경로는 실제 환경에 맞게 조정
// }



//게임 시작시 초기화
function create() {
    console.log("게임 시작: create 함수 호출됨");

    this.startGameLogic = startGameLogic;
    this.gameOver = gameOver;
    


    //Phaser에서 사용할 변수 설정
    // var breakSound = this.sound.add('break');
    
    
    var scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });
    console.log("점수 텍스트 생성됨");



    var timerText = this.add.text(16, 36, 'Time: '+timer+'s', { fontSize: '20px', fill: '#ffffff' });
    console.log("타임 텍스트 생성됨, 초기 시간: ", timer);

     // 남은 시간을 업데이트하는 함수
    this.time.addEvent({
        delay: 1000, 
        callback: () => {
            if(timer > 0){
                timer--;
                timerText.setText('Time: ' + timer + 's');
            } else {
                this.gameOver(score);
            }
        }, 
        callbackScope: this, 
        loop: true 
    });
    console.log("타이머 이벤트 추가됨");

    


    // 게임 로직 시작
    this.startGameLogic(scoreText, timerText);
}

    function startGameLogic(scoreText, timerText) {
        // 홀드 생성
        const createHold = () => {
        var holdSize = Phaser.Math.Between(20, 200);
        var holdX = Phaser.Math.Between(0, this.sys.game.config.width - holdSize);
        var holdY = Phaser.Math.Between(0, this.sys.game.config.height - holdSize);
        var holdColor = Phaser.Display.Color.RandomRGB(0, 255);
        var requiredTouches = Phaser.Math.Between(1, 20); // 랜덤한 터치 횟수 설정
        var baseScore = (requiredTouches <= 10) ? 100 : 50; // 터치 횟수와 크기에 따른 기본 점수 설정
    
        var hold = this.add.rectangle(holdX, holdY, holdSize, holdSize, holdColor.color).setInteractive();
        
         // 홀드를 클릭하면 사운드 재생 및 애니메이션 효과
        hold.on('pointerdown', () => {
            // breakSound.play();
            //점수계산
            requiredTouches--;
            if (requiredTouches <= 0) {
    
                //GSAP 애니메이션 적용
                gsap.to(hold, {scaleX: 0, scaleY: 0, ease: "back.in", duration: 0.5, onComplete: () => {
    
                score += baseScore;
                scoreText.setText('Score: ' + score);
                hold.destroy(); // 홀드 제거
                
                // 홀드 제거 성공 시 추가 시간 1초 부여
                if (timer < 10) {
                    timer += 1; // 1초 추가
                    timerText.setText('Time: ' + timer + 's'); // 시간 텍스트 업데이트
                }
            }
        });
    }
    });



        // 5초 후에 홀드가 아직 제거되지 않았다면 점수 감점
        this.time.delayedCall(3000, () => { // 3초 대기
            if (hold.active) { // 홀드가 아직 화면에 존재한다면
                score -= baseScore; // 예를 들어, 각 홀드마다 고정된 점수 감점
                score = Math.max(score, 0); // 점수가 음수가 되지 않도록 처리
                scoreText.setText('Score: ' + score);
                hold.destroy(); // 홀드 제거 (옵션: 필요에 따라 제거 여부 결정)
            }
        }, [], this);
};

 // 게임 시작 시, 그리고 이후 1~2초마다 랜덤으로 홀드 생성
 const scheduleNextHold = () => {
    createHold(); // 즉시 홀드 생성
    let nextDelay = Phaser.Math.Between(1000, 2000); // 다음 홀드 생성까지의 시간 (1~3초)
    this.time.delayedCall(nextDelay, scheduleNextHold, [], this); // 다음 홀드 생성 예약
};

scheduleNextHold(); // 홀드 생성 시작
}
    
function gameOver(finalScore) {
    console.log("gameOver 함수 호출됨, 최종 점수: ", finalScore);
    alert('Game Over! Score: ' + finalScore);
    // 게임 종료 후 초기 화면으로 복귀하거나 필요한 로직 추가
}
    

}


// 실제 환경에 맞게 점수 시스템 및 타이머 관리 로직 추가 필요




// var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// function playSound(url) {
//     var bufferLoader = new BufferLoader(
//         audioContext,
//         [url],
//         function(bufferList) {
//             var source = audioContext.createBufferSource();
//             source.buffer = bufferList[0];
//             source.connect(audioContext.destination);
//             source.start(0);
//         }
//     );
//     bufferLoader.load();
// 