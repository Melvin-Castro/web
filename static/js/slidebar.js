let row_position, father_row;

console.log(gruposUsuario);

$(document).ready(function() {

    $(".nav .menu > ul").click(function (e) {
        row_position = $(this).index();
        father_row = $(this).parent().index();  

        localStorage.setItem('row_position', row_position);
        localStorage.setItem('father_row', father_row);
        //localStorage.setItem('esAdmin', esAdmin);

        //console.log(row_position, father_row);

        // remove active from already active
        $(this).siblings().removeClass("active");
        // add active to clicked
        $(this).toggleClass("active");
        // if has sub menu open it
        $(this).find("ul").slideToggle();
        // close other sub menu if any open
        $(this).siblings().find("ul").slideUp();
        // remove active class of sub menu items
        $(this).siblings().find("ul").find("li").removeClass("active");
    });

    let saved_row_position = localStorage.getItem('row_position');
    let saved_father_row = localStorage.getItem('father_row');

    if (saved_row_position !== null && saved_father_row !== null) {
        //console.log('Saved row_position:', saved_row_position);
        //console.log('Saved father_row:', saved_father_row);

        let menu = $(".nav .menu").eq(saved_father_row);
        let ul = menu.children("ul").eq(saved_row_position-1);

        ul.addClass("active");
        ul.find("ul").slideDown();

        //row_position = 1;
        //father_row = 0;

        //localStorage.setItem('row_position', row_position);
        //localStorage.setItem('father_row', father_row);
    }
});

