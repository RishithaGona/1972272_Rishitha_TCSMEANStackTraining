var modal = document.getElementById('myModal');
var myButton = document.getElementById("myButton");
var span = document.getElementsByClassName("closeModal")[0];
myButton.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function addCols(){
    var i = eval(sessionStorage.getItem("counter")) - 1;
    var myCol = ('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = ('<div class="card card-outline-info" id="'+i+'Panel"><div class="card-block"><div class="card-title"><span>Card #'+i+'</span><button type="button" class="close" data-target="#'+i+'Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>Some text in '+i+' </p><img src="//placehold.it/50/eeeeee" class="rounded rounded-circle"></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#allBlogs');
    }
    
    

    

function addBlog() {
    if (!sessionStorage["counter"]) {
        sessionStorage.setItem("counter", 1);
    }
    var data = readFormData();
    
    storeInSession(data);
    var i = eval(sessionStorage.getItem("counter")) - 1;
    // console.log(i);
    addNewBlog(data, i);
    resetData();
}

function readFormData() {
    var obj = {};
    obj.title = document.getElementById("blogName").value;
    obj.art = document.getElementById("blogContent").value;
    if (typeof (document.getElementById("image").files[0]) != 'undefined') {
        obj.image = document.getElementById("image").files[0].name;
    } else {
        obj.image = "none";
    }
    return obj;
}

function storeInSession(data) {
    var i = sessionStorage.getItem("counter");
    sessionStorage.setItem("blog_" + i, JSON.stringify(data));
    i++;
    sessionStorage.setItem("counter", i);
}

function addNewBlog(blog, i) {
   
   
    
    const container = document.getElementById('accordion');
    const card = document.createElement('div');

  card.classList = 'card-body';

  // Construct card content
  const content = `
    <div class="card">
    <div class="card-header" id="heading-${i}">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                </button>
      </h5>
    </div>
    <div id="collapse-${i}" class="collapse show" aria-labelledby="heading-${i}" data-parent="#accordion">
      <div class="card-body">
        <h5>${blog.title}</h5>
        <p>${blog.art}</p>
        <img src = "${blog.image}" width="500" height="300"></img>
        ...
      </div>
    </div>
  </div>
  `;

  // Append newyly created card element to the container
  container.innerHTML += content;

    
    if (blog.image != "none") {
        newRow.style.backgroundImage = 'url('+blog.image+')';
    }

    allBlogs.insertBefore(newRow, allBlogs.firstChild);
}

function resetData() {
    document.getElementById("blogName").value = "";
    document.getElementById("blogContent").value = "";
    document.getElementById("image").value = "";
}

function loadAllBlogs() {
    for (var j = 1; j < sessionStorage.length; j++) {
        var data = retrieveFromSession(j);
        var dataJson = JSON.parse(data);
        console.log(dataJson);
        addNewBlog(dataJson, j);
    }
}

function retrieveFromSession(j) {
    var obj = sessionStorage.getItem("blog_" + j);
    return obj;
}