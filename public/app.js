const onClick = (button1, show) => {
    $(button1).on('click', () => {
        $(show).show();
    })
};

$(() => {
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image' );
    onClick('.choose-image', '.description' );
})