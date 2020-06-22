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


const onClickCountLove = () => {
    $('.white-love').on('click', (event) => {
        const $people = $(event.currentTarget).siblings('.reaction-people');
        const $button = $(event.currentTarget).children().eq(0);
        const $img = $button.children().eq(0);

        const idImage = $img.attr('id');
        const userName = $button.attr('id');
        console.log(idImage);
        console.log(userName);
            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/love?`
            });

            promise.then(
                (data) => {
                    console.log(data);
                    $people.html(`${data.length} people`);
                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );

            $img.attr('src') === '/images/heart.png' ? $img.attr('src', '/images/white-heart.png') : $img.attr('src', '/images/heart.png');
            
            
            return false
        

    });
}
$(() => {
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image');
    onClick('.choose-image', '.description');

    showInfo('.show-image', '.show-info');
    hideInfo('.show-image', '.show-info');

    showUserName();
    hideUserName();

    $('.btn-default').on('click', () =>{
        location.reload();
    })
    onClickCountLove();

})