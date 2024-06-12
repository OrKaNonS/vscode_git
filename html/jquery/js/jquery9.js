$(function() {
    //child1의 parent의 id
    console.log($("#child1").parent().attr("id"));

    // ul1의 조상들 전체
    console.log($("#ul1").parents());

    // ul1의 조상들중 div를 갖은 첫 조상
    console.log($("#ul1").parents("div").attr("id"));

    // ul1의 조상들중 body
    console.log($("#ul1").parentsUntil("body").attr("id"));

    // ul1의 children
    console.log($("#ul1").children());

    //parent중 div인
    console.log($("#parent").find("div"));

    //parent의 전체
    console.log($("#parent").find("*"));

    console.log($("#child1").siblings());
    console.log($("#child1").next());
    console.log($("#child1").nextAll());
    console.log($("#child2").prev());
    console.log($("#child3").prevAll());

    //div(wrapper) 밑 div(parent) 밑 div(child1~3)
    console.log($("div div div").first());

    console.log($("div div div").last());

    console.log($("div div div").eq(0));
    console.log($("div div div").eq(1));
    console.log($("div div div").eq(2));

    console.log($("div").filter("#child1"));

    console.log($("div").not("#child1"));

});
