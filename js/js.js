$(document).ready(function() {

    //SCROLLT0
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        'resize': false,
        'anchors': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide', 'fiveSlide', 'sixSlide', 'sevenSlide', 'eightSlide', 'nineSlide', 'tenSLide', 'elevenSlide', 'twelveSlide'],
        'sectionsColor': ['#F0F2F4', '#eee', '#aaa', '#000', '#aaa', '#aaa', '#111', '#aaa', '#111', '#000', '#000', '#111'],
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

    //INTERACTION SLIDE 1
    $(".lightbox").hide(400);

    function lightbox() {

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

        $(".lightbox").click(function() {
            $(".lightbox").fadeOut(400);
            $('.texte1').addClass('hide');
            $('.texte2').addClass('hide');
            $('.texte3').addClass('hide');
        });
    }
    lightbox();

    //INTERACTION SLIDE 2
    function interaction2() {

        $('.inter1, .inter2, .inter3, .inter4').click(function(e) {
            e.stopPropagation();
            var className = $(this).attr('class');
            switch (className) {
                case 'inter1':
                    $('.texte1').removeClass('hide');
                    $('.texte2').addClass('hide');
                    $('.texte3').addClass('hide');
                    $('.texte4').addClass('hide');
                    break;
                case 'inter2':
                    $('.texte1').addClass('hide');
                    $('.texte2').removeClass('hide');
                    $('.texte3').addClass('hide');
                    $('.texte4').addClass('hide');
                    break;
                case 'inter3':
                    $('.texte1').addClass('hide');
                    $('.texte2').addClass('hide');
                    $('.texte3').removeClass('hide');
                    $('.texte4').addClass('hide');
                    break;
                case 'inter4':
                    $('.texte1').addClass('hide');
                    $('.texte2').addClass('hide');
                    $('.texte3').addClass('hide');
                    $('.texte4').removeClass('hide');
                    break;
            }
        });
    }
    interaction2();

    $(".vote").click(function() {
        //VOTE
        function Vote(int) {
            if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else { // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("poll").innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open("GET", "php/vote.php?vote=" + int, true);
            xmlhttp.send();
        }
        Vote(this.value);
    });
});