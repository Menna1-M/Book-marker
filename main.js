var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var content = document.getElementById("content");
var inputs = document.getElementsByClassName("form-control");
var btns = document.getElementById("btns");
var container = [];
var updateIndex ;
if(JSON.parse(localStorage.getItem("bookMarkList"))!=null)
{
          container=JSON.parse(localStorage.getItem("bookMarkList"));
          displayInputs();
}
addBtn.onclick =function () 
{
          if (validateName()==true && validateUrl()==true)
          {
                    addInputs();
                    // siteName.classList.remove("is-valid");
                    // siteUrl.classList.remove("is-valid");
                    displayInputs(); 
                    clearInput();
          }  
          // else if(validateName()==true || validateUrl()==true || siteUrl.value="" || siteName.value="")
          // {
          //           addBtn.disabled="true";   
          // }    
          else 
          {
                    addBtn.disabled="true";
          }
          siteName.classList.remove("is-valid");
          siteUrl.classList.remove("is-valid");
         displayInputs(); 
         clearInput();
}
function addInputs() 
{
          var site=
          {
                    name:siteName.value,
                    url:siteUrl.value
          }
          container.push(site);
          localStorage.setItem("bookMarkList",JSON.stringify(container));
}
function displayInputs()
{
          cartona="";
          for (var i=0 ; i<container.length ; i++)
          {
                    cartona+=`<div class=" d-flex container justify-content-around py-3">
                                        <h4 class="font-weight-bold">${container[i].name}</h4>
                                        <a class="btn btn-info px-5" href="${container.url}" target="_blank">Visit</a>
                                        <button class="btn btn-danger px-5" onclick="deleteInputs(${i})">Delete</button>
                              </div>`
          }
          content.innerHTML=cartona;
}
function clearInput()
{
          for(var i=0 ; i<inputs.length ; i++)
          {
                    inputs[i].value="";
          }
}
function deleteInputs(index)
{
          container.splice(index,1);
          displayInputs();
          localStorage.setItem("bookMarkList",JSON.stringify(container));
}
function validateName()
{
          var nameRegex = /^[a-zA-Z0-9]{2,15}$/;
          var res = nameRegex.test(siteName.value);
          return res ;
}
siteName.onkeyup = function()
{
          if (validateName()==true && siteName.value!="")
          {
                    siteName.classList.add("is-valid");
                    siteName.classList.remove("is-invalid");
                    addBtn.removeAttribute("disabled");
          }
          else
          {
                    siteName.classList.add("is-invalid");
                    siteName.classList.remove("is-valid");
                    addBtn.disabled="true";
          }
}
function validateUrl()
{
          var urlRegex = /^(http|https)?(:\/\/)?(www.)?[a-zA-Z0-9]{1,10}.com$/;
          var res = urlRegex.test(siteUrl.value);
          return res;
}
siteUrl.onkeyup = function()
{
          if (validateUrl()==true && siteUrl.value!="")
          {
                    siteUrl.classList.add("is-valid");
                    siteUrl.classList.remove("is-invalid");
                    addBtn.removeAttribute("disabled");
          }
          else
          {
                    siteUrl.classList.add("is-invalid");
                    siteUrl.classList.remove("is-valid");
                    addBtn.disabled="true";
          }
}
// function updateInputs(index)
// {
//           siteName.value=container[index].name;
//           siteUrl.value=container[index].url;
//           updateIndex=index;
//           btns.innerHTML=`<button class="btn btn-outline-success ml-4">Update</button>`
// }