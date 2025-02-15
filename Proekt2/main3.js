$(document).ready(function() {

    $('#search-icon').click(function() {
        $('.search-box').toggleClass('active');
    });

    $("#cars-ungi .btn").hover(
        function() {
            $(this).css({ 
                'background-color': 'orange',
                'transition': 'background-color 0.3s ease'
            });
        },
        function() {
            $(this).css({
                'background-color': 'var(--main-color)',
                'transition': 'background-color 0.3s ease'
            });
        }
    );

    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 800);
    });


    $(window).scroll(function() {
        $('header').toggleClass('sticky', $(window).scrollY > 100);
    });

    //FADE-IN SLIKITE NA KOLITE, KOGA SCROLLAME DA SE POKAZUVAAT SO ANIMACIJA
    $(document).ready(function() {
        $('.row, .car-box').css('opacity', '0');
    
        $(window).scroll(function() {
            $('.row, .car-box').each(function() {
                const bottom_of_object = $(this).offset().top + $(this).outerHeight() / 2; 
                const bottom_of_window = $(window).scrollTop() + $(window).height();
    
                if (bottom_of_window > bottom_of_object && !$(this).hasClass('animated')) {
                    $(this).animate({ 'opacity': '1' }, 700);
                    $(this).addClass('animated'); 
                }
            });
        });
    
        $(window).scroll();
    });
    

    $('#loginButton').click(function() {
        $('#loginKutija, #overlay').show();
    });

    $('#cancelLogin').click(function() {
        $('#loginKutija, #overlay').hide();
    });

    $('#submitLogin').click(function() {
        const username = $('#username').val();
        const password = $('#password').val();

        if (username && password) {
            $('#loginButton').text(username);
            $('#loginKutija, #overlay').hide();
        } else {
            alert('Please fill in both fields!');
        }
    });

    $('#testDriveForm').submit(function(event) {
        event.preventDefault();
        alert('Successful Scheduling!');
        this.reset();
    });

    $('#reviewFORM').submit(function(event) {
        event.preventDefault();
        alert('Thank you for leaving a review! Very much appreciated!');
        this.reset();
    });


    let imageData = new Map();

    function initializeImageData(imageId) {
        if (!imageData.has(imageId)) {
            imageData.set(imageId, {
                likes: 0,
                isLiked: false,
                comments: [],
                timestamp: new Date()
            });
        }
    }

    $('.modern-content .row').each(function(index) {
        const imageId = `modern-${index}`;
        initializeImageData(imageId);
    });

    $('.cars-grid .car-box').each(function(index) {
        const imageId = `vintage-${index}`;
        initializeImageData(imageId);
    });

    $('.modern-content').on('click', '.row', function() {
        const index = $(this).index();
        const imageId = `modern-${index}`;
        const imgSrc = $(this).find('img').attr('src');
        const title = $(this).find('h5').text();
        openKutija(imgSrc, imageId, title);
    });

    $('.cars-grid').on('click', '.car-box', function() {
        const index = $(this).index();
        const imageId = `vintage-${index}`;
        const imgSrc = $(this).find('img').attr('src');
        const title = $(this).find('.car-title').text();
        openKutija(imgSrc, imageId, title);
    });

    function openKutija(imgSrc, imageId, title) {
        const $imageKutija = $('#imageKutija');
        const $kutijaImage = $('#kutijaImage');
        
        $kutijaImage.attr('src', imgSrc);
        $kutijaImage.attr('data-image-id', imageId);
        $('.username').text(title);
        
        updateLikesAndComments(imageId);
        $imageKutija.show();
    }

    function updateLikesAndComments(imageId) {
        const data = imageData.get(imageId);
        if (!data) return;

        const $likeButton = $('#likeButton i');
        $likeButton.removeClass('bxs-heart bx-heart');
        $likeButton.addClass(data.isLiked ? 'bxs-heart' : 'bx-heart');

        const $likeCount = $('#likeCount');
        if (data.likes === 0) {
            $likeCount.text('No likes yet');
        } else {
            $likeCount.text(`${data.likes} ${data.likes === 1 ? 'like' : 'likes'}`);
        }

        const $commentsSection = $('#commentsSection');
        $commentsSection.empty();

        data.comments.forEach(comment => {
            const commentElement = `
                <div class="comment">
                    <div class="user-avatar"></div>
                    <div class="comment-content">
                        <span class="comment-username">User</span>
                        <span>${comment}</span>
                        <div class="comment-timestamp">Just now</div>
                    </div>
                </div>
            `;
            $commentsSection.append(commentElement);
        });
    }

    $('#likeButton').click(function() {
        const imageId = $('#kutijaImage').attr('data-image-id');
        const data = imageData.get(imageId);
        
        if (!data) return;

        if (data.isLiked) {
            data.likes -= 1;
            data.isLiked = false;
        } else {
            data.likes += 1;
            data.isLiked = true;
        }
        
        updateLikesAndComments(imageId);
    });

    $('#commentInput').keypress(function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const comment = $(this).val().trim();
            if (!comment) return;

            const imageId = $('#kutijaImage').attr('data-image-id');
            const data = imageData.get(imageId);
            
            if (!data) return;

            data.comments.push(comment);
            $(this).val('');
            
            updateLikesAndComments(imageId);
        }
    });

    $('.close').click(function() {
        $('#imageKutija').hide();
    });

    $(document).on('click', function(e) {
        const $imageKutija = $('#imageKutija');
        if (e.target === $imageKutija[0]) {
            $imageKutija.hide();
        }
    });
});