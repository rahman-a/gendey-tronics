const template = {
    activate(info){
        return`
        <div style='
    color:#2b2c33; 
    padding:2rem;'>
        <h1>Gendy Tronics</h1>
        <p>Hello ${info.name}</p>
        <p>To Verify Your Account E-mail please click on this link</p>
        <a href=${info.link} style='
            all:unset;
            display: block;
            width: 10rem;
            margin:1rem 0;
            padding:0.4rem;
            text-decoration: none;
            text-align: center;
            background-color: #F8C600;
            color:#333;
            border-radius: 3px;
            cursor: pointer;
        '>Verify E-mail</a>
        <h3 style='font-weight: 400;'> Please Note this link will expire within<span style='
              color: #c60249;
              text-decoration: underline;
              font-weight: 600;
              margin:0 0.3rem;
             '>only 24 hours</span> </h3>
    </div>
    `
},
reset(info){
    return`
    <div style='
color:#2b2c33; 
padding:2rem;'>
    <h1>Gendy Tronics</h1>
    <p>Hello ${info.name}</p>
    <p>To Reset Your Account Password please click on this link</p>
    <a href=${info.link} style='
        all:unset;
        display: block;
        width: 10rem;
        margin:1rem 0;
        padding:0.4rem;
        text-decoration: none;
        text-align: center;
        background-color: #F8C600;
        color:#333;
        border-radius: 3px;
        cursor: pointer;
    '>Reset Password</a>
    <h3 style='font-weight: 400;'> Please Note this link will expire within<span style='
          color: #c60249;
          text-decoration: underline;
          font-weight: 700;
          margin:0 0.5rem;
         '>only 24 hours</span> </h3>
</div>
`
}
}

export default template