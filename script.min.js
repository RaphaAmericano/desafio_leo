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

    //Nav menu
    var $navmenu = document.getElementsByClassName('navbar')[0];
    var $navButtonOn = document.querySelector('.user button');
    var $navButtonOff = document.querySelector('.navbar button');

    $navButtonOn.addEventListener('click', function(){
        if($navmenu.style.display == 'none'){
            $navmenu.style.display = 'block';
        } 
    });
    $navButtonOff.addEventListener('click', function(){
        if($navmenu.style.display !== 'none'){
            $navmenu.style.display = 'none';
        } 
    });

    //Logout
    var $logoutButton = document.querySelector('.navbar a.button');
    $logoutButton.addEventListener('click', function(e){
        e.preventDefault();
        localStorage.clear();
        window.location.reload()
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

    //Dots Selector
    function generateDotsSelector(){
        var dotsController = document.querySelectorAll('.dot-controls a');
        console.log(dotsController);
        if(dotsController.length > 0){
            for(var i = 0; i < dotsController.length; i++){
                dotsController[i].addEventListener('click', function(e){
                    e.preventDefault();
                    var index = parseInt(this.getAttribute('data-index'));
                    var $slides = document.getElementsByClassName('slide');
                    if($slides[index].classList.contains('active')){
                        return;
                    }
                    for(var i = 0; i < $slides.length; i++ ){
                        if($slides[i].classList.contains('active')){
                            $slides[i].classList.remove('active');
                            break;
                        }
                    }
                    $slides[index].classList.add('active');
                });
            }
        }
    }

    //Load All Courses

    var courses;
    selectAllCourses();
    function selectAllCourses(){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", 'http://leo.api/api/read.php', true);
        ajax.send();
        
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200 ){
                var data = ajax.responseText;    
                setMyCourses(data);     
                setSlider(data);       
                setDots(data);
                generateDotsSelector();
            }     
        }
    }

    function setMyCourses(data){
        var courses = JSON.parse(data);
        if(courses.records.length > 0 ){
            var $containerCourses = document.getElementsByClassName('courses_list')[0];
            var $h3 = document.createElement('h3');
            $h3.innerText = "Meus Cursos";
            var $hr = document.createElement('hr');
            
            for(var i = 0; i < courses.records.length; i++ ){
                var $card = document.createElement('article')
                $card.classList.add('card');
                //Checar se e' novo
                var $labelNew = document.createElement('img');
                $labelNew.classList.add('new-label')
                $labelNew.setAttribute('src', 'img/label_new.png');
                //
                var $banner = document.createElement('img');
                $banner.setAttribute('src', courses.records[i].banner );

                var $cardWapper = document.createElement('div');
                $cardWapper.classList.add('card-wapper');
                var $h4title = document.createElement('h4');
                $h4title.innerText = courses.records[i].nome;
                var $pDescription = document.createElement('p');
                $pDescription.innerText = courses.records[i].descricao;
                var $aLink = document.createElement('a');
                $aLink.classList.add('button');
                $aLink.innerText = 'Ver Curso';
                $aLink.setAttribute('href', '#');

                $cardWapper.append($h4title);
                $cardWapper.append($pDescription);
                $cardWapper.append($aLink);

                $card.append($labelNew);
                $card.append($banner);
                $card.append($cardWapper);
                $containerCourses.insertBefore($card, $containerCourses.firstChild);
            }

            $containerCourses.insertBefore($hr, $containerCourses.firstElementChild);
            $containerCourses.insertBefore($h3, $containerCourses.firstElementChild);
        }

    }
    function setSlider(data){
        var courses = JSON.parse(data);
        var $slides = document.getElementsByClassName('slides')[0];
    
        if(courses.records.length > 0 ){
            for(var i = 0; i < courses.records.length; i++){
                var $slide = document.createElement('article');
                $slide.classList.add('slide');
                if(i === 0) {
                    $slide.classList.add('active');
                }
                $slide.setAttribute('style', 'background-image:url("'+courses.records[i].banner+'")');
                var $container = document.createElement('div');
                $container.classList.add('container');
                var $card = document.createElement('div');
                $card.classList.add('card');
                var $h2Title = document.createElement('h2');
                $h2Title.innerText = courses.records[i].nome;
                var $pDescription = document.createElement('p');
                $pDescription.innerText = courses.records[i].descricao;
                var $aLink = document.createElement('a');
                $aLink.classList.add('button');
                $aLink.setAttribute('href', '#');
                $aLink.innerText = "Ver Curso";
                $card.append($h2Title);
                $card.append($pDescription);
                $card.append($aLink);
                $container.append($card);
                $slide.append($container);
                $slides.append($slide);
            }
            
        }
    }
    function setDots(data){
        var courses = JSON.parse(data);
        var $dots = document.getElementsByClassName('dot-controls')[0];
        if(courses.records.length > 1 ){
            var $ul = document.createElement('ul');
            for(var i = 0; i < courses.records.length; i++){
                var $dot = document.createElement('li');
                var $aLink = document.createElement('a');
                $aLink.setAttribute('href', '#');
                $aLink.setAttribute('data-index', i);
                $aLink.innerHTML = '&#9711';
                if(i == 0 ){
                    $aLink.classList.add('active');
                }
                $dot.append($aLink);
                $ul.append($dot);
            }
            $dots.append($ul);
        }
    }

    ///Add Course
    var $addCourseBtn = document.querySelectorAll('.add-course-wapper a')[0];
    var $closeCourseBtn = document.getElementsByClassName('close_add_form')[0];
    var $courseAddSection = document.getElementsByClassName('add_course_section')[0];
    var $courseListSection = document.getElementsByClassName('courses_list')[0];

    $addCourseBtn.addEventListener('click', function(e){
        e.preventDefault();
        $courseListSection.style.display = 'none';
        $courseAddSection.style.display = 'inline-block';
    });

    $closeCourseBtn.addEventListener('click', function(e){
        e.preventDefault();
        if($courseAddSection.style.display !== 'none' ){
            $courseAddSection.style.display = 'none';
        }
        if($courseListSection.style.display == 'none' ){
            $courseListSection.style.display = 'inline-block';
        }
    });


    var $formCourse = document.forms.add;
    $formCourse.addEventListener('submit', function(e){
        e.preventDefault();
        var photo = document.querySelector('input[type=file]').files[0];
        var mime_type = ['image/jpeg', 'image/png'];
        if(mime_type.indexOf(photo.type)){
            return;
        }
        var formData = {
            "title": $formCourse.elements[0].value,
            "description": $formCourse.elements[1].value,
            "banner": photo
        };
     
     
        
        var ajax = new XMLHttpRequest();
        ajax.addEventListener('load', function(e){
            console.log(ajax.response);
        })
        ajax.upload.addEventListener('progress', function(){
            var percent = (e.loaded / e.total) * 100;
            console.log(percent);
        });

        ajax.open("POST", $formCourse.getAttribute('action'));
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("Access-Control-Allow-Origin", "*");
        ajax.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        ajax.send(formData);

        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200 ){
                var data = ajax.responseText;
            } 
        }
    });

    


})();