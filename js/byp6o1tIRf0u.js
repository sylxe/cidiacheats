$(document).ready(function() {
    let resultsContainer = $('#loginResultsContainer');

    $('#login').click(function() {
        let username = $('#username').val();
        let password = $('#password').val();
        let hwid = $('#hwid').val();

        $.ajax({
            type: 'GET',
            url: '../api/login/auth/index.php',
            data: {
                username: username,
                password: password,
                hwid: hwid
            },
            dataType: 'json',
            success: function(response) {
                if (response.status == true) {
                    resultsContainer.append('<div class="login-result">Login successful</div>');
                    window.location.href = "../dashboard";
                } else {
                    resultsContainer.append('<div class="login-result failed">Login failed</div>');
                }
            },
            error: function(xhr, status, error) {
                resultsContainer.append('<div class="login-result failed">Login failed</div>');
            }
        });
        
        setTimeout(function() {
            $('.login-result').last().css('opacity', 0);
            setTimeout(function() {
                $('.login-result').last().remove();
            }, 1000);
        }, 5000);
    });
});
