// show upload Button
const onClick = (button1, show) => {
    $(button1).on('click', () => {
        $(show).show();
    })
};

// SHOW INFO OF IMAGE
const showInfo = (image, info) => {
    $(image).on('mouseenter', (event) => {

        const $div = $(event.currentTarget).parent();

        const $show = $div.siblings(info);
        $show.show();
    })
}

// SHOW USERNAME OF AVATA
const showUserName = () => {
    $('.user-column').on('mouseenter', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.show();
    })
};

// HIDE USERNAME
const hideUserName = () => {
    $('.user-column').on('mouseleave', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.hide();
    })
}

// HIDE INFO OF IMAGE
const hideInfo = (image, info) => {
    $(image).on('mouseleave', (event) => {

        const $div = $(event.currentTarget).parent();

        const $show = $div.siblings(info);
        $show.hide();
    })
}

// COUNT LOVE
const onClickCountLove = () => {
    $('.white-love').on('click', (event) => {
        const $button = $(event.currentTarget).children().eq(0);
        const $img = $button.children().eq(0);

        const idImage = $img.attr('id');
        const userName = $button.attr('id');
            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/love?`
            });

            promise.then(
                (data) => {
   
                    const newPerson = data.love[data.love.length - 1]; // GET NEWEST USER IN LOVE ARRAY

                    $(`.${idImage}-love`).html(data.love.length); //update how many people love image

                    $(`.${idImage}-list`).empty(); // update list people love image

                    data.love.forEach( item => {
                        $(`.${idImage}-list`).append(`<li><a href="/lico/${item}" class="all-people">${item}</a></li>`);
                    })
                    // change image white love  => black love (and convert)
                    $img.attr('src') === '/images/heart.png' ? $img.attr('src', '/images/white-heart.png') : $img.attr('src', '/images/heart.png');
                    
                     // UPDATE NOTIFICATION
                     if(newPerson === data.interestedUser) {
                        $('.notification').attr('src', '/images/notification-1.png');
                        $('.list-notification').append(`<p class="dropdown-item"><a href="/lico/${newPerson}">${newPerson}</a> loved <a
                        href="/lico/${newPerson}/${data.idImage}">your image</a></p>`)
                    };

                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );
            
            return false     
    });
}

// SHOW LIST PEOPLE LIKE IMAGE
const showPeople = () => {
    $('.reaction-people').on('click', (event) => {
        const $list = $(event.currentTarget).siblings('.list-people');
        $list.show();
    })
};

// HIDE LIST PEOPLE LIKE IMAGE
const hidePeople = () => {
    $('.list-people').on('mouseleave', (event) => {
       $(event.currentTarget).hide();
       
    })
}

// UPDATE COMMENT
const commentImage = () => {
    $('.send').on('click', (event) => {
        // get id of input.send
        const id = $(event.currentTarget).attr('id'); //id = userName-idImage

        const arrId = id.split('&'); // split string
       
        const idImage = arrId[1]; // get idImage for url to call ajax
        const userName = arrId[0]; // get userName for url to call ajax
        
        const commentContent = $(`#${idImage}-write`).val(); // get content of comment from input
        $(`#${idImage}-write`).val('');

            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/comment?comment=${commentContent}`
            });

            promise.then(
                (data) => {
                    const newData = JSON.parse(data);
                    const allComments = newData.comments;
                    const newComment = allComments[allComments.length - 1]; // get newest comment
                   
                    // update div.all-comments
                   $(`#${idImage}-allComments`).append(`<div class="comment"> 
                   <p class="date"><i>${newComment.createdAt}</i></p>
                   <p><img src="${newComment.avataOfUserComment}" class="avata-comment"><a
                           href="/lico/${newComment.userComment}">${newComment.userComment}</a>
                       ${newComment.content}
                   </p>
               </div>`);
                    $(`.${newData.idImage}-comment`).html(allComments.length); // update how many comments in index page
                    
                    // UPDATE NOTIFICATION
                    if(newComment.userComment === newData.interestedUser) {
                        $('.notification').attr('src', '/images/notification-1.png');
                        $('.list-notification').append(`<p class="dropdown-item"><a href="/lico/${newComment.userComment}">${newComment.userComment}</a> commented <a
                        href="/lico/${newComment.userComment}/${newComment.idImage}">your image</a></p>`)
                    };

                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );
            return false;
    })
}
// CALL API WEATHER
const getWeather = () => {
    const apiKey = 'ed9d9a092edac51d1afa9c2b98725554';
    const countryCode = '1880251';
    setInterval(()=> {
        const time = moment().format('MMMM Do YYYY, h:mm:ss a');
        $('.today').html(time);
        
        const promise = $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?id=${countryCode}&appid=${apiKey}`
        });
        promise.then(
            (data) => { 
                $('.tempt').html((data.main.temp/10).toFixed(2) );
                $('.min-tempt').html((data.main.temp_min/10).toFixed(2));
                $('.max-tempt').html((data.main.temp_max/10).toFixed(2));
                $('.humidity').html(data.main.humidity);
                $('.clouds').html(data.clouds.all);
              
                $('.describe').html(data.weather[0].description);
               
            },
            () => {
                console.log('bad request');
            }
        )
    }, 1000);
   
};

// CLEAR NOTIFICATION
const clearNotification = () => {
    $('.seen').on('click', () => {
        // get id of input.seen
        const id = $('.seen').attr('id');
        const arr = id.split('&');
        const userName = arr[1];

        const promise = $.ajax({
            url: `/api/${userName}/notification`
        });
        promise.then(
            () => {
                $('.list-notification').empty();
                $('.notification').attr('src', '/images/notification.png');
            }
        ),
        () => {
            console.log('bad request');
        }
        
        return false
    })
};

$(() => {
    getWeather();
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image');
    onClick('.choose-image', '.description');

    showInfo('.show-image', '.show-info');
    hideInfo('.show-image', '.show-info');

    showUserName();
    hideUserName();

    showPeople();
    hidePeople();

    onClickCountLove();

    commentImage();
    

    clearNotification();
})