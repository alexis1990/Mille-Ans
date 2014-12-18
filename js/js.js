$(document).ready(function() {

    //SCROLLT0
    $('#fullpage').fullpage({
        'scrollingSpeed': 1000,
        'verticalCentered': false,
        'css3': true,
        'scrollOverflow': false,
        'resize': false,
        'anchors': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide', 'fiveSlide', 'sixSlide', 'sevenSlide', 'eightSlide', 'nineSlide', 'tenSLide', 'elevenSlide', 'twelveSlide', 'thirteenthSlide'],
        'sectionsColor': ['#F0F2F4', '#eee', '#aaa', '#000', '#aaa', '#aaa', '#111', '#aaa', '#111', '#000', '#000', '#111', '#000'],
        'navigation': true,
        'navigationPosition': 'left',
        'navigationTooltips': ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide', 'fiveSlide', 'sixSlide', 'sevenSlide', 'nineSlide', 'tenSLide', 'elevenSlide', 'twelveSlide', 'thirteenthSlide'],

        onLeave: function(index, nextIndex, direction) {
            if (index == 1 && direction == 'down') {
                if (video3.video.paused == false) {
                    video3.video.pause();
                }
            } else if (index == 3 && direction == 'down') {
                $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
            } else if (index == 3 && direction == 'up') {
                $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            } else if (index == 6 && direction == 'down') {
                if (video.paused == false) {
                    video.pause();
                }
            } else if (index == 7 && direction == 'down') {
                if (video2.video.paused == false) {
                    video2.video.pause();
                }
            } else if (index == 7 && direction == 'up') {
                if (video2.video.paused == false) {
                    video2.video.pause();
                }
            }
        },
        afterLoad: function(anchorLink, index) {
            // if (index == 7) {
            //     video2.video.src = "videos/interview1.mp4";
            //     video2.video.load();
            //     $('.video').fadeIn(400);
            // }
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
                } else if (video.id == 'secondVideo') {
                    document.querySelector('.secondprogress').style.width = progress + '%';
                } else {
                    document.querySelector('.thirdprogress').style.width = progress + '%';
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
                    player.button.classList.remove('pause');
                } else {
                    player.video.pause();
                    player.button.classList.remove('play');
                    player.button.classList.add('pause');
                }
            },
            listenToEvent: function() {
                this.pB.addEventListener('click', this.setVideoTime, false);
                this.video.addEventListener('canplaythrough', this.playPause, false);
                this.video.addEventListener('click', this.playPause, false);
                this.video.addEventListener('timeupdate', this.playProgress, false);
            }
        };
        return player;
    }


    var video1 = generatePlayer(document.getElementById('video'), document.getElementById('button'), document.getElementById('progressBar'), 'video1');
    var video2 = generatePlayer(document.getElementById('secondVideo'), document.getElementById('secondbutton'), document.getElementById('secondprogressBar'), 'video2');
    var video3 = generatePlayer(document.getElementById('thirdVideo'), document.getElementById('thirdbutton'), document.getElementById('thirdprogressBar'), 'video3');

    video1.listenToEvent();
    video2.listenToEvent();
    video3.listenToEvent();



    //FULLSCREEN VIDEO
    jQuery(function($) {
        $('#video, #secondVideo, #thirdVideo').fullscreen();
    });

    //FULLSCREEN WEBSITE
    $('.fullscreen').on('click', function() {
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
    $('.element1').on('click', function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(7);
        video2.video.src = "videos/interview1.mp4";
        video2.video.play();
        video2.video.onended = function() {
            $.fn.fullpage.moveTo(6);
        };

    })

    $('.element2').on('click', function(e) {
        e.stopPropagation();
        $.fn.fullpage.moveTo(7);
        video2.video.src = "videos/interview2.mp4";
        video2.video.play();
        video2.video.onended = function() {
            $.fn.fullpage.moveTo(6);
        };

    })

    //CHOOSE YOUR SECTION
    $('.back').on('click', function() {
        console.log('ok');
    })

    $('.back2').on('click', function() {
        console.log('ok2');
    })

    $('.back3').on('click', function() {
        console.log('ok3');
    })


    //INTERACTION SLIDE 1
    $(".lightbox").hide(400);

    function lightbox() {

        $('.interaction1, .interaction2, .interaction3, .interaction4, .interaction5').on('click', function(e) {
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
                case 'interaction4':
                    $('.texte4').removeClass('hide');
                    break;
                case 'interaction5':
                    $('.texte5').removeClass('hide');
                    break;
            }
        });

        $(".lightbox").on('click', function() {
            $(".lightbox").fadeOut(400);
            $('.texte1').addClass('hide');
            $('.texte2').addClass('hide');
            $('.texte3').addClass('hide');
            $('.texte4').addClass('hide');
            $('.texte5').addClass('hide');
        });
    }
    lightbox();


    //INTERACTION SLIDE 2
    function interaction2() {

        $('.inter1, .inter2, .inter3, .inter4').on('click', function(e) {
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

    $(".vote").on('click', function(e) {
        e.stopPropagation();
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

        $(".lightbox2").fadeOut(6000);
        video3.video.src = "videos/chapitre1.mp4";
        video3.video.load();
        video3.button.classList.add('play');
        video3.video.onended = function() {
            $.fn.fullpage.moveTo(2);
        };
    });
});