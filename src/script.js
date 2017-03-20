/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start
        $("#input").focus(); // focus input when page is loaded

        $("#input").keypress(function(e){ // add li when press ENTER
            if (e.keyCode == 13 ) {
                add_element();
            }
        })

        $("button#add_btn").click( // add li when click ADD
            add_element
        )

        $("#all_elements").click(
            show_all
        )

        $("#active_elements").click(
            show_active
        )

        $("#completed_elements").click(
            show_completed
        )


    function add_element() { // create li
        if ($("#input")[0].value.trim() !== '') { // if input not empty
            var li = $("<li></li>").text($("#input").val()); // create li
            li.prepend($("<input type='checkbox' />").click(function () { // function to sort elements by className
                       $(this).parent().toggleClass("completed"); // when click on checkbox toggle class for li element
                })
            )
            li.append($("<button>x</button>").click(function (event) {
                $(event.target).parent().detach(); // remove li when click remove btn
            }));
            $("#list").append(li); // insert created li to list
            $("#input").val("");
        }
    }

    function show_all() {
        $("li").css("display", "");
    }

    function show_active() {
        $("li").css("display", "");
        $(".completed").css("display", "none");
    }

    function show_completed() {
        $("li").css("display", "none");
        $(".completed").css("display", "");
    }

}) // document ready end
