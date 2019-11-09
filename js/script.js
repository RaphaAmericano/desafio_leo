(function(){
    var $slides = document.getElementsByClassName('slide');
    var $arrowLeft = document.getElementsByClassName('left_arrow')[0];
    var $arrowRight = document.getElementsByClassName('right_arrow')[0];
    
    $arrowLeft.addEventListener('click', function(e){
        e.preventDefault();
        for(var i = 0; i < $slides.length; i++){ 
            if($slides[i].classList.contains('active')){
                slideIndex = i;
                break;
            }
        }
        $slides[slideIndex].classList.remove('active');
        if(slideIndex == 0){    
            $slides[$slides.length -1 ].classList.add('active');
        } else {
            $slides[slideIndex - 1].classList.add('active');
        }
    });

    $arrowRight.addEventListener('click', function(e){
        e.preventDefault();
        for(var i = 0; i < $slides.length; i++){ 
            if($slides[i].classList.contains('active')){
                slideIndex = i;
                break;
            }
        }
        $slides[slideIndex].classList.remove('active');
        if(slideIndex == $slides.length -1){
            $slides[0].classList.add('active');
        } else {
            $slides[slideIndex + 1].classList.add('active');
        }
    });

})();