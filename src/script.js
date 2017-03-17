/**
 * Created by user on 17.03.17.
 */
$(function (){

//create li
    $("button#add_btn").click(function add_element() {

        var li = $("<li></li>").text($("#input").val()).addClass("Active"); // create li
        li.prepend("<input type='checkbox' />");
        li.append($("<button>x</button>").click(function (event) {
            $(event.target).parent().detach(); // remove li
        }));
        $("#list").append(li); // insert created li to list
        $("#input").val("");
    });



})
