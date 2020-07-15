import styled from 'styled-components';

export const TextBox = styled.input`

    border: 0;
    padding: 7px 15px; 
    position: relative;
    background: white;
    width: 80%;
    margin: 25px;
    height: 25px;
    font-family: fantasy;
    font-weight: 900;

`;

export const FindButton = styled.div`

    position: relative;
    width: 100px;
    height: 90px;
    position: relative;
    width: 100px;
    height: 90px;
    margin-left: 35%;
    margin-top: 5%;
    cursor: pointer;

    :before,
    :after{
    position: absolute;
    content: "";
    left: 110px;
    top: 0;
    width: 110px;
    height: 190px;
    background: #fc2e5a;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
       -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
         -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
       -moz-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
         -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
}
:after{
    left: 0;
    -webkit-transform: rotate(45deg);
       -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
         -o-transform: rotate(45deg);
            transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
       -moz-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
         -o-transform-origin: 100% 100%;
            transform-origin :100% 100%;
}
`;

export const RelationShip = styled.div`
        position:absolute;
        z-index:3;
        margin-left: 35px;
        margin-top:50px;
        color:white;
        font-weight: bolder;
`;

export const OuterDiv = styled.div`
    margin: 1%;
    background: #670464;
    width: 50%;
    height: 95vh;
    border-radius: 10%;
`;

export const ResultDiv = styled.div`
    margin-top: 20%;
    font-weight: bolder;
`;