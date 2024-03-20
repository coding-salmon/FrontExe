
document.getElementById("startGame1").addEventListener("click", function() {
    document.getElementById("gameMenu").style.display = "none"; // 메뉴 숨기기
    document.getElementById("miniGame-Container").style.display = "block"; // 게임 컨테이너 보이기
    startGame1(); // 게임 시작 함수 호출
});

function startGame1() {
}

const holdBox = document.getElementById('hold-box');
const hold = document.getElementById('hold');

holdBox.addEventListener('click', function(event){
    const boxWidth = holdBox.offsetWidth;
    const boxHeight = holdBox.offsetHeight;

    const holdWidth = hold.offsetWidth;
    const holdHeight = hold.offsetHeight;

    const maxLeft = boxWidth - holdWidth;
    const maxTop = boxHeight - holdHeight;

    const randomLeft = Math.floor(Math.random()*maxLeft);
    const randomTop = Math.floor(Math.random()*maxTop);

    hold.style.left = randomLeft + 'px';
    hold.style.top = randomTop + 'px'
});




    // 여기에 게임 시작 로직을 구현합니다.

//     var game =  new Phaser.Game(Config);
// }
// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'game',
//     scene: {
//         preload: preload,
//         create: create
//     }
// };

// var game = new Phaser.Game(config);

// function preload() {
//     // 사운드 파일 미리 로딩
//     this.load.audio('break', 'assets/break.mp3'); // 경로는 실제 환경에 맞게 조정
// }

// function create() {
//     var breakSound = this.sound.add('break');

//     // 홀드 생성
//     var hold = this.add.rectangle(400, 300, 100, 100, 0xff0000).setInteractive();

//     hold.on('pointerdown', function (pointer) {
//         breakSound.play();
//         gsap.to(hold, {scaleX: 0, scaleY: 0, ease: "back.in", duration: 0.5, onComplete: function() {
//                 hold.destroy(); // 애니메이션 완료 후 홀드 제거
//             }
//         });
//     });

//     // 15초 후 홀드 자동 제거
//     this.time.delayedCall(15000, function() {
//         hold.destroy();
//         // 점수 감점 로직 추가 가능
//     }, [], this);
// }

// // 실제 환경에 맞게 점수 시스템 및 타이머 관리 로직 추가 필요




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