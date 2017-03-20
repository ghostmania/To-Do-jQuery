/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start

        $("#input").keypress(function(e){ // add li when press ENTER
            if (e.keyCode == 13 ) {
                add_element();
            }
        })

        $("button#add_btn").click( // add li when click ADD
            add_element
        )


    function add_element() { // create li
        if ($("#input")[0].value.trim() !== '') { // if input not empty
            var li = $("<li></li>").text($("#input").val()).addClass("Active"); // create li
            li.prepend("<input type='checkbox' />");
            li.append($("<button>x</button>").click(function (event) {
                $(event.target).parent().detach(); // remove li
            }));
            $("#list").append(li); // insert created li to list
            $("#input").val("");
        }
    }

}) // document ready end
