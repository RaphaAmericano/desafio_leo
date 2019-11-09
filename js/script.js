(function(){
    //Login
    var login = localStorage.getItem('logged');

    var $slides = document.getElementsByClassName('slide');
    var $arrowLeft = document.getElementsByClassName('left_arrow')[0];
    var $arrowRight = document.getElementsByClassName('right_arrow')[0];
    var $modalQuitBtn = document.getElementsByClassName('quit_button')[0];

    //Check LocalStorage for Session
    if( login === 'true'){
        document.getElementsByClassName('modal_block')[0].style.display = 'none';
    }

    $modalQuitBtn.addEventListener('click', function(){
        document.getElementsByClassName('modal_block')[0].style.display = 'none';
        localStorage.setItem('logged', true);
    });

    //Slider

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

    ///Add Course
    var $addCourseBtn = document.querySelectorAll('.add-course-wapper a')[0];
    var $courseAddSection = document.getElementsByClassName('add_course_section')[0];
    var $courseListSection = document.getElementsByClassName('courses_list')[0];

    $addCourseBtn.addEventListener('click', function(e){
        e.preventDefault();
        $courseListSection.style.display = 'none';
        $courseAddSection.style.display = 'inline-block';
    });

})();