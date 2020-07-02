var auth;

window.gapi.load('client:auth2', ()=>{
    window.gapi.client.init({
        clientId: '264635077930-haflja3gej48nklbkj9fesm17oov3eos.apps.googleusercontent.com',
        scope: 'email'
    }).then(()=> {
        auth = window.gapi.auth2.getAuthInstance();
        auth.isSignedIn.listen(onAuthChange);
    });
});

onAuthChange= (isSignedIn)=>{
    const google= auth.currentUser.get().Pt;
    console.log(isSignedIn);
    
    if(isSignedIn){
        console.log(auth);
        $.ajax({
            url: '/login-with-google',
            headers:{
                'head-token': head
            },
            data: {
                name: google.Ad,
                userID: google.MU,
                gmail: google.yu
            },
            method: 'POST',
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        });
    }
    else
        alert(`${google.Ad} is signed out`);
}

onSignInClick= ()=> {
    console.log("ds");
    if(auth.isSignedIn.get())
        return alert(`${auth.currentUser.get().Pt.Ad} is already connected.. First Sign him Out`);

    auth.signIn();
}

onSignOutClick= ()=> {
    if(!auth.isSignedIn.get())
        alert('No connected User')

    auth.signOut();
}
