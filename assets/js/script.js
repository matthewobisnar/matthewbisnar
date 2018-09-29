toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "20000",
    "timeOut": "20000",
    "extendedTimeOut": "50000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

function scrollToTop(attr) {

    // ===== Scroll to Top ===== 
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {
            attr.fadeIn(200);   
        } else {
            attr.fadeOut(200);  
        }
    });

    attr.click(function() {   
        $('body,html').animate({
            scrollTop : 0 
        }, 500);
    });
}

function smoothScroll (attr, attr2) {
    // Scmooth Scroll By Hash..
    $(attr).on('click', function(){
        if (this.hash !== "") {
            
            event.preventDefault();
            var hash = this.hash;
            var navHeight = attr2.height();
            var section = $(hash).offset().top - navHeight;

            $('html, body').animate({
                scrollTop: section
              }, 800, function(){
                //window.location.hash = hash;
              });
        }  
    })   
}

function scrollTopFunc(attr) {
    if ($(document).scrollTop() > 20) { 
        attr.addClass('bg-brown fadeInDown animated');
        $("html, body").animate({scrollTop:0}, '500');
    }
}

function scrollfunc(parentAttr, targetArr, targetValue, addclassTarget) {
    $(parentAttr).scroll(function(){
        if ($(parentAttr).scrollTop() >= targetValue) {
           $(targetArr).addClass(addclassTarget); 
         //console.log(targetValue + " = " + targetArr.attr('class'));
        } else {
            if($(targetArr).hasClass(addclassTarget)) {
                $(targetArr).removeClass(addclassTarget);
            }
        };
    });
}


$(window).ready(function(){
    //load content
    $('.spinner').fadeOut('slow').promise().done(function(){
        $(this).remove();
        toastr["success"]("HI! Welcome to my site. Unfornately it's underdevelopment. but you can still browse basic contents on it. Thank you for visiting. ")
        $('.header-content').addClass('show-class').removeClass('hide-class');
    });

    // Scroll to top
    scrollToTop($('.scrollbtn'));
    // Smooth scroll navbar
    smoothScroll($('a'), $('.navbar'));
    // scroll spy
    $('body').scrollspy({target: "#navbarEx", offset: 65*2});
    // fixed position nav
    scrollfunc(this, $('#navbarEx'), $("#about").offset().top ,"fadeInDown animated fixed-top");
    // back to top when load
    scrollTopFunc($("#header-section"));

    // cover name loader..
    var init =0;
    var string = "I AM Matthew Bisnar";
    var description = "I'm a Student and a self-taught designer, and web and desktop app. developer from Philippines. I love designing & building user friendly application.";
    
    function animateText() {
        if(init < string.length) {
            var getText = document.getElementById("texts");
                getText.innerHTML += string.charAt(init);
           
            $(".page-header h1:contains('Matthew')").html(function(i, content) {
                return content.replace(/(Matthew Bisnar)/g, '<span class="color-pink">$1</span>');
            });

            init++;
            setTimeout(animateText,130);
        } else {
            init = 0;
            clearTimeout(animateText);

            if (typeof description != "undefined") {
                animateDescription();
            }
        }
    }

    function animateDescription() {
        if (init < description.length) {
            var getText = document.getElementById("description");
            getText.innerHTML += description.charAt(init);
            init++;
            setTimeout(animateDescription, 50);
        } else {
            clearTimeout(animateDescription);
        }
    }
    
    if(typeof string != "undefined") {
        animateText();
    }

    var countPrepend = 0;
    // Add Ripple
    $(".header-section").click(function (e) {
        countPrepend++;

        if(countPrepend > 10) {
             $(".ripple").remove();
             countPrepend = 0;
        }

        // Setup
        buttonWidth = $(this).width();
        buttonHeight =  $(this).height();
        
        // Add the element
        $(this).prepend("<span class='ripple'></span>");
        
        if (buttonWidth >= buttonHeight) {
            buttonWidth = buttonHeight
        } else {
            buttonHeight = buttonWidth
        }

        // Get the center of the element
        var x = e.pageX - $(this).offset().left - buttonWidth / 2;
        var y = e.pageY -  $(this).offset().top - buttonHeight / 2;
        
        // Add the ripples CSS and start the animation
        $(".header-section").css({overflowX: 'hidden'})
        $(".ripple").css({
          width: buttonWidth,
          height: buttonHeight,
          top: y + 'px',
          left: x + 'px',
        }).addClass("rippleEffect");
    
      });
});