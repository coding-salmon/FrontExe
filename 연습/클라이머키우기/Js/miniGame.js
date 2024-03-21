
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
        // preload: preload,
        create: create
    }
};

//게임 인스턴스 생성
var game = new Phaser.Game(config);

// function preload() {
//     // 사운드 파일 미리 로딩
//     this.load.audio('break', '../Bgm/break.mp3'); // 경로는 실제 환경에 맞게 조정
// }

//게임 시작시 초기화
function create() {
    //Phaser에서 사용할 변수 설정
    // var breakSound = this.sound.add('break');
    var score = 0;
    var scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });

        // 30초 후 게임 오버
gameOverTimer = this.time.delayedCall(30000, function () {
    // 게임 오버 처리
    gameOver(score);
}, [], this);
    

    //게임 로직 시작
    startGameLogic.call(this, score, scoreText, gameOverTimer);

}

//게임로직

function startGameLogic(score,scoreText, gameOverTimer) {
    // 홀드 생성
    var holdSize = Phaser.Math.Between(20, 200);
    var holdX = Phaser.Math.Between(0, config.width - holdSize);
    var holdY = Phaser.Math.Between(0, config.height - holdSize);
    var holdColor = Phaser.Display.Color.RandomRGB(0, 255);
    var requiredTouches = Phaser.Math.Between(1, 20); // 랜덤한 터치 횟수 설정
    var baseScore = (requiredTouches <= 10) ? 100 : 50; // 터치 횟수와 크기에 따른 기본 점수 설정

    var hold = this.add.rectangle(holdX, holdY, holdSize, holdSize, holdColor.color).setInteractive();

    // 5초 후에 홀드가 아직 제거되지 않았다면 점수 감점
    setTimeout(() => {
        if (hold.active) { // 홀드가 아직 화면에 존재한다면
            score -= 50; // 예를 들어, 각 홀드마다 고정된 점수 감점
            score = Math.max(score, 0); // 점수가 음수가 되지 않도록 처리
            scoreText.setText('Score: ' + score);
            hold.destroy(); // 홀드 제거 (옵션: 필요에 따라 제거 여부 결정)
        }
    }, 5000); // 5초 대기


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
            
            // 홀드 제거 성공 시 추가 시간 부여
            gameOverTimer.delay += 1000; // 3초 추가
            console.log("Hold broken! Extra 3 seconds added.");
            
            startGameLogic.call(this, score, scoreText, gameOverTimer); // 새로운 홀드 생성
        }
    });
}
    });
}
function gameOver(score) {
    alert('Game Over! Score: ' + score);
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
// }