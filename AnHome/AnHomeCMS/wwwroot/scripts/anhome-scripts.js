// Main AnHome JavaScript functionality
$(document).ready(function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    // Navbar scroll behavior
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-shrink');
        } else {
            $('.navbar').removeClass('navbar-shrink');
        }
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    $('#back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Project filter
    $('#projectFilterForm').on('submit', function(e) {
        e.preventDefault();
        
        // Filter implementation would go here
        // This would typically be an AJAX call to the server
        
        // Demo: Add loading effect
        $('.project-list').addClass('loading');
        
        // Demo: Remove loading after delay
        setTimeout(function() {
            $('.project-list').removeClass('loading');
        }, 1000);
    });

    // Modal video
    $('.video-btn').click(function() {
        var videoSrc = $(this).data("src");
        $("#videoModal iframe").attr('src', videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hidden.bs.modal', function() {
        $("#videoModal iframe").attr('src', '');
    });

    // Image gallery lightbox
    $('.gallery-item').click(function() {
        var imgSrc = $(this).attr('src');
        $('#galleryModal').find('img').attr('src', imgSrc);
        $('#galleryModal').modal('show');
    });

    // Handle contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Form validation
        var formValid = true;
        $(this).find('input, textarea').each(function() {
            if ($(this).prop('required') && !$(this).val()) {
                formValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (formValid) {
            // Show loading
            $('#submitBtn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...');
            $('#submitBtn').prop('disabled', true);
            
            // Simulate form submission
            setTimeout(function() {
                $('#contactForm').hide();
                $('#formSuccess').show();
                
                // Reset form
                $('#contactForm')[0].reset();
                $('#submitBtn').html('Gửi');
                $('#submitBtn').prop('disabled', false);
            }, 1500);
        }
    });
});
