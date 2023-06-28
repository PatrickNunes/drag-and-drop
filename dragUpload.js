const uploadButton = document.getElementById("upload-button");
const chosenImage = document.getElementById("chosen-image");
const container = document.querySelector(".file-container");
const error = document.getElementById("upload-error");
const imageDisplay = document.getElementById("image-display");


const fileHandler = (file,name,type) =>{

    if (type.split("/")[0] !== "image"){
        //File Type errors
        error.innerText = "Faça upload apenas de imagens";
        return false;
    }
    error.innerText = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        // image and file name
        let imageContainer = document.createElement("figure");
        let img = document.createElement("img");
        img.src = reader.result;
        imageContainer.appendChild(img);
        imageContainer.innerHTML +=`<figcaption>${name}</figcaption>`;
        imageDisplay.appendChild(imageContainer);
    };
};

uploadButton.addEventListener("change", () => {
    imageDisplay.innerHTML="";
    Array.from(uploadButton.files).forEach((file) =>{
        fileHandler(file , file.name , file.type);
    });
});

container.addEventListener("dragenter", (e) =>{
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("dragActiveBorder");
}, false);

container.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("dragActiveBorder");
},false);

container.addEventListener("dragover", (e) =>{
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("dragActiveBorder");
},false);

container.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("dragActiveBorder");
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    imageDisplay.innerHTML = ""
    Array.from(files).forEach((file) =>{
        fileHandler(file , file.name , file.type);
    });
    
},false);