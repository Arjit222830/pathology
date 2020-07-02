
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

$(document).ready(()=>{
    $("#form_mail").submit( (e)=>{
        e.preventDefault();
        var str= $('#file').val();
        var file_name= str.substring(str.lastIndexOf('\\')+1)
        console.log(file_name);
        console.log($('#file').val())
        $.ajax({
            url: '/mail',
            data :{
                from: $('#data1').val(),
                password: $('#data2').val(),
                to: $('#data3').val(),
                text: $('#data4').val(),
                name: file_name
            },
            method: "POST",
            success : function(data){
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});