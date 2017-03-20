/**
 * Created by user on 17.03.17.
 */
$(function (){ // document ready start
        $("#input").focus(); // focus input when page is loaded

        var currentTab = "all";

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
            var li = $("<li></li>");       // create li
            li.append($("<span><span/>").text($("#input").val()).dblclick(
                function () {
                    var editInput = $("<input />").keypress(function (e) { // add function to input when press ENTER
                        if (e.keyCode == 13 ) {
                            $(this).css("display", "none"); // hide input
                            $(this).siblings("span").text($(this).val()); // insert value of input into span
                            $(this).siblings("span").css("display", ""); // show span
                            $(this).siblings().css("display", ""); // show other elements
                        }
                    }); // create input for edit
                    li.children().hide(); // hide elements when editInput is opened
                    li.append($(editInput).val($(this).text())); // insert input into li
                    $(editInput).focus(); // set value of input same as span
                }
            ))
            li.prepend($("<input type='checkbox' />").click(function () { // function to sort elements by className
                       $(this).parent().toggleClass("completed"); // when click on checkbox toggle class for li element
                        if (currentTab == "all") {
                            $(this).parent().css("display", "");
                        } else if (currentTab == "active" || currentTab == "completed"){ // hide elements due to status change
                            $(this).parent().css("display", "none");
                        }
                })
            )
            li.append($("<button>x</button>").click(function (event) {
                $(event.target).parent().detach(); // remove li when click remove btn
            }));
            $("#list").append(li); // insert created li to list
            $("#input").val("");
        }
        $("#input").focus();
    }

    function show_all() {
        currentTab = "all";
        $("li").css("display", "");
        $("#input").focus();
    }

    function show_active() {
        currentTab = "active";
        $("li").css("display", "");
        $(".completed").css("display", "none");
        $("#input").focus();
    }

    function show_completed() {
        currentTab = "completed";
        $("li").css("display", "none");
        $(".completed").css("display", "");
        $("#input").focus();
    }

}) // document ready end
