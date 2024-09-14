window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

// form validate project 

/*
fName : isRequired , isName
lName : isRequired , isName
email : isRequired , isEmail
subject: isRequired
message: isRequired , min(10) , max(40)
*/

const REG_EMAIL =
  /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;

const isRequired = (value) => value ? "" : "that field is required!!!";
const isEmail = (value) => REG_EMAIL.test(value) ? "" : "email is invalid!!!";
const isName = (value) => REG_NAME.test(value) ? "" : "name is invalid!!!";
const min = (boundNum) => (value) =>{
  return  value.length >= boundNum ? "" : `min is ${boundNum}`;
};

const max = (boundNum) => (value) =>{
    return  value.length <= boundNum ? "" : `max is ${boundNum}`;
};
// hàm thông báo lỗi 
const createMsg = (parentNode , controlNodes , msg) => {
    let inputInvalid = document.createElement("div");
    inputInvalid.innerHTML = msg;
    inputInvalid.className = "invalid-feedback";
    parentNode.appendChild(inputInvalid);
    controlNodes.forEach((inputNode) =>{
        inputNode.classList.add("is-invalid");
    });
}
// hàm kiểm tra giá trị coi có hơp lệ hay không
const isValid = ({value , funcs , parentNode , controlNodes}) =>{
        for (const funCheck of funcs) {
            let msg = funCheck(value);
            if(msg){
                createMsg(parentNode , controlNodes , msg);
                return msg; // ngừng luôn 
            }
        }
        return "";
}
//  let nameNode = document.querySelector("#firstName");
// isValid({
//     value: nameNode.value,
//     funcs: [isRequired , isName],
//     parentNode: nameNode.parentElement,
//     controlNodes: [nameNode],
// });

const clearMsg = () =>{
    // xóa viền đổ
    document.querySelectorAll(".is-invalid").forEach((inputNode) =>{
        inputNode.classList.remove("is-invalid");
    });
    // xóa dòng chữ báo lỗi
    document.querySelectorAll(".invalid-feedback").forEach((item) =>{
        item.remove();
    });
}

document.querySelector("form").addEventListener("submit" , (event) =>{
    event.preventDefault(); // chặn sự kiện load lại trang
    clearMsg(); 
    const firstNameNode = document.querySelector("#firstName");
    const lastNameNode = document.querySelector("#lastName");
    const emailNode = document.querySelector("#email");
    const subjectNode = document.querySelector("#subject");
    const messageNode = document.querySelector("#message");
    
    // kiểm tra firstName
    isValid({
        value: firstNameNode.value,
        funcs: [isRequired , isName],
        parentNode: firstNameNode.parentElement,
        controlNodes: [firstNameNode],
    });
    // kiêm tra lastName
    isValid({
        value: lastNameNode.value,
        funcs: [isRequired , isName],
        parentNode: lastNameNode.parentElement,
        controlNodes: [lastNameNode],
    });
    // kiểm tra email 
    isValid({
        value: emailNode.value,
        funcs: [isRequired , isEmail],
        parentNode: emailNode.parentElement,
        controlNodes: [emailNode],
    });
    // kiêm tra subject
    isValid({
        value: subjectNode.value,
        funcs: [isRequired],
        parentNode: subjectNode.parentElement,
        controlNodes: [subjectNode],
    });
    // kiểm tra message 
    isValid({
        value: messageNode.value,
        funcs: [isRequired , min(10) , max(50)],
        parentNode: messageNode.parentElement,
        controlNodes: [messageNode],
    });
});