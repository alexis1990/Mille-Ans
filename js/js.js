$(document).ready(function() {

    //SCROLLT0

    $('#fullpage').fullpage({

        'verticalCentered': false,
        'css3': true,
        'resize': false,
        'anchors': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide', 'fiveSlide', 'sixSlide', 'sevenSlide', 'eightSlide', 'nineSlide', 'tenSLide', 'elevenSlide', 'twelveSlide'],
        'sectionsColor': ['#F0F2F4', '#eee', '#aaa', '#000', '#aaa', '#aaa', '#111', '#aaa', '#111', '#000', '#111', '#111'],
        'navigation': true,
        'navigationPosition': 'left',
        'navigationTooltips': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide', 'fiveSlide', 'sixSlide', 'sevenSlide', 'nineSlide', 'tenSLide', 'elevenSlide', 'twelveSlide'],

        onLeave: function(index, nextIndex, direction) {
            if (index == 3 && direction == 'down') {
                $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
            } else if (index == 3 && direction == 'up') {
                $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            }
        }
    });

    //GENERATE PLAYER

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
            },
            listenToEvent: function() {
                this.pB.addEventListener('click', this.setVideoTime, false);
                this.video.addEventListener('canplaythrough', this.playPause, false);
                this.video.addEventListener('click', this.playPause, false);
                this.video.addEventListener('timeupdate', this.playProgress, false);
            }
        };

        player.button.classList.add('loading');
        player.video.load();

        return player;
    }


    var video1 = generatePlayer(document.getElementById('video'), document.getElementById('button'), document.getElementById('progressBar'), 'video1');
    var video2 = generatePlayer(document.getElementById('secondVideo'), document.getElementById('secondbutton'), document.getElementById('secondprogressBar'), 'video2');

    video1.listenToEvent();
    video2.listenToEvent();

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

    //ONCLICK LAUNCH OTHER VIDEO

    $('.element1').click(function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(7);
        video2.video.src = "videos/v06-07_ld.mp4";
        video2.video.load();
        video2.video.play();
        video2.video.onended = function() {
            $.fn.fullpage.moveTo(6);
        };

    })


    $('.element2').click(function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(7);
        video2.video.src = "videos/v06-07_ld.mp4";
        video2.video.load();
        video2.video.play();
        video2.video.onended = function() {
            $.fn.fullpage.moveTo(6);
        };

    })

    //INTERACTION
    $(".lightbox").hide(400);

    function lightbox() {
        // $('.interaction1, .interaction2, .interaction3').click(function(e) {
        //     e.stopPropagation();
        //     $(".lightbox").fadeIn(400);

        //     var textNum = $(this)..hasClass('.redColor');

        //     //scroll to top
        //     $("#video").parent().fadeIn(400);

        //     //which video is going to play
        //     switch (vidNum) {
        //         case "1":
        //             $("#video").attr("src", video1);
        //             break;
        //         case "2":
        //             $("#video").attr("src", video2);
        //             break;
        //         case "3":
        //             $("#video").attr("src", video3);
        //             break;
        //     }

        $('.interaction1, .interaction2, .interaction3').click(function(e) {
            e.stopPropagation();
            $(".lightbox").fadeIn(400);
            var className = $(this).attr('class');
            switch (className) {
                case 'interaction1':
                    $('.texte1').removeClass('hide');
                    break;
                case 'interaction2':
                    $('.texte2').removeClass('hide');
                    break;
                case 'interaction3':
                    $('.texte3').removeClass('hide');
                    break;
            }
        });

        // })

        $(".lightbox").click(function() {
            $(".lightbox").fadeOut(400);
            $('.texte1').addClass('hide');
            $('.texte2').addClass('hide');
            $('.texte3').addClass('hide');
        });
    }
    lightbox();

});