$(document).ready(function() {

    //SCROLLT0

    $('#fullpage').fullpage({

        'verticalCentered': false,
        'css3': true,
        'resize': false,
        'anchors': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide'],
        'sectionsColor': ['#F0F2F4', '#eee', '#aaa', '#000'],
        'navigation': true,
        'navigationPosition': 'left',
        'navigationTooltips': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide'],

        onLeave: function(index, nextIndex, direction) {
            if (index == 3 && direction == 'down') {
                $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
            } else if (index == 3 && direction == 'up') {
                $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            }
        }
    });

    //VIDEO

    function generatePlayer(video, button, progressBar) {

        var player = {
            video: video,
            button: button,
            pB: progressBar,

            setVideoTime: function(e) {
                e.stopPropagation();
                //console.log(e); 
                player.video.currentTime = e.offsetX * player.video.duration / this.offsetWidth;
            },
            playProgress: function() {
                var self = this;
                var progress = self.currentTime * 100 / self.duration;
                if (video.id == 'video') {
                    document.querySelector('.progress').style.width = progress + '%';
                } else {
                    document.querySelector('.secondprogress').style.width = progress + '%';
                }
                var time = self.currentTime;
                if (video.id == 'video') {
                    if (time > 2.00 && time < 2.30) {
                        video.pause();
                        button.classList.remove('pause');
                        $('.element1').removeClass('hide');
                        $('.element2').removeClass('hide');
                    } else {
                        $('.element1').addClass('hide');
                        $('.element2').addClass('hide');
                    }
                }
            },
            playPause: function(e) {
                //console.log(e); 
                if (e.type == 'canplaythrough') {
                    player.video.removeEventListener('canplaythrough', player.playPause, false);
                }
                player.button.classList.remove('loading');
                //var self=this;
                if (player.video.paused) {
                    player.video.play();
                    player.button.classList.add('play');
                } else {
                    player.video.pause();
                    player.button.classList.remove('play');
                }
            }
        };

        player.button.classList.add('loading');
        player.video.load();

        return player;
    }


    var video1 = generatePlayer(document.getElementById('video'), document.getElementById('button'), document.getElementById('progressBar'), 'video1');
    var video2 = generatePlayer(document.getElementById('secondVideo'), document.getElementById('secondbutton'), document.getElementById('secondprogressBar'), 'video2');


    // player.video = document.getElementById('video');
    // player.secondVideo = document.getElementById('secondVideo');
    // player.button = document.getElementById('button');
    // player.pB = document.getElementById('progressBar');


    // Player.prototype.video.onended = function() {
    //     $.fn.fullpage.moveTo(2, 3);
    // };

    video1.pB.addEventListener('click', video1.setVideoTime, false);
    video1.video.addEventListener('canplaythrough', video1.playPause, false);
    video1.video.addEventListener('click', video1.playPause, false);
    video1.video.addEventListener('timeupdate', video1.playProgress, false);

    video2.video.addEventListener('canplaythrough', video2.playPause, false);
    video2.video.addEventListener('click', video2.playPause, false);
    video2.video.addEventListener('timeupdate', video2.playProgress, false);
    video2.pB.addEventListener('click', video2.setVideoTime, false);

    //FULLSCREEN VIDEO
    jQuery(function($) {
        $('#video, #secondVideo').fullscreen();
    });

    //FULLSCREEN WEBSITE
    $('.fullscreen').click(function() {
        function toggleFullScreen() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
        toggleFullScreen();
    })

    //FULLSCREEN WEBSITE
    $('.share').click(function() {
        console.log('ok');
    })

    $('.element1').click(function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(0, 4);
        video2.video.src = "videos/v06-07_ld.mp4";
        video2.video.load();
        video2.video.play();

    })


    $('.element2').click(function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(0, 4);
        player.secondVideo.src = "videos/v06-07_ld.mp4";
        player.secondVideo.load();
        player.secondVideo.play();
    })

});