const resultEle=document.getElementById("result");
const lengthEle=document.getElementById("length");
const upperEle=document.getElementById("uppercase");
const lowerEle=document.getElementById("lowercase");
const numberEle=document.getElementById("numbers");
const symbolEle=document.getElementById("symbols");
const btnEle=document.getElementById("generate_password");
const copyBtn=document.getElementById("clipboard");

const randomFunc={
    upper:getRandomUpper,
    lower:getRandomLower,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

btnEle.addEventListener("click",()=>{
    const length=lengthEle.value;
    const uppercaseCheck=upperEle.checked;
    const lowercaseCheck=lowerEle.checked;
    const numbersCheck=numberEle.checked;
    const symbolsCheck=symbolEle.checked;
    if(length<5 || length>15){
        alert("The length of the password is min 5 and max 15");
        resultEle.innerHTML="";
    }
    else if(!uppercaseCheck && !lowercaseCheck && !numbersCheck && !symbolsCheck){
        alert("Please check at least one of them");
    }
    else{
        resultEle.innerHTML= generatePassword(uppercaseCheck,lowercaseCheck,numbersCheck,symbolsCheck,length);
    }
})

copyBtn.addEventListener("click",()=>{
    const textarea = document.createElement('textarea');
    const password=resultEle.innerText;

    if(!password){
        return ;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copy to clipboard");
    resultEle.innerText="";
})

function generatePassword(upper,lower,number,symbol,length){
    let generatePassword="";
    const typesCount=upper+lower+number+symbol;
    const typesArr=[{upper},{lower},{number},{symbol}]
    .filter(item=>Object.values(item)[0]);

    if(typesCount===0){
        return '';
    }
    for(let i=0;i<length;i+=typesCount){
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0];
            generatePassword+=randomFunc[funcName]();
        });
    }
    const finalPassword=generatePassword.slice(0,length);
    return finalPassword;
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26+65));
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26+97));
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10+48));
}

function getRandomSymbol(){
    const symbols="!@#$%^&*(){}[]=<>?./\,";
    return symbols[Math.floor(Math.random()*symbols.length)];
}

