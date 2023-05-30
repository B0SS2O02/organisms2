const form = document.querySelector('form');
form.onsubmit = async (e) => {
    e.preventDefault()
    const action = e.target.action
    const method = e.target.method
    console.log(action, method)
    const response = await fetch(action, {
        method: method,
        body: new FormData(e.target)
    }).catch((err) => {
        console.log(err)
    }).then(()=>{
        pathBack()
    })
    console.log(await response.json())
}

const image = document.getElementsByClassName('viewimage')[0]
const file = document.getElementsByName('image')[0]
image.onclick = (e) => {
    file.click()
}
file.onchange = function (event) {
    var target = event.target;

    if (!FileReader) {
        alert('FileReader не поддерживается — облом');
        return;
    }

    if (!target.files.length) {
        alert('Ничего не загружено');
        return;
    }

    var fileReader = new FileReader();
    fileReader.onload = () => {
        image.src = fileReader.result;
    }

    fileReader.readAsDataURL(target.files[0]);
}
