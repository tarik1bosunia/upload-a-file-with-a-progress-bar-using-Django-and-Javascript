console.log("hi")
const uploadForm = document.getElementById('upload-form')
const imageInput = document.getElementById('id_image')
console.log("upload form: ", uploadForm)
console.log("upload form action: ", uploadForm.action)
const alertBox = document.getElementById('alert-box')
const imageBox = document.getElementById('image-box')
const progressBox = document.getElementById('progress-box')
const cancelBox = document.getElementById('cancel-box')
const cancelBtn = document.getElementById('cancel-btn')

const csrf = document.getElementsByName('csrfmiddlewaretoken')
console.log("csrf: ", csrf);

imageInput.addEventListener('change', () => {
    progressBox.classList.remove('not-visible')
    cancelBox.classList.remove('not-visible')

    const imageData = imageInput.files[0]
    console.log(imageData);

    const imgUrl = URL.createObjectURL(imageData)

    const formData = new FormData
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('image', imageData)

    $.ajax({
        type: 'POST',
        url: uploadForm.action,
        enctype: "multipart/form-data",
        data: formData,
        beforeSend: function () {
            console.log("before send")
            alertBox.innerHTML = ""
            progressBox.innerHTML = ""
            imageBox.innerHTML = ""
        },
        xhr: function () {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', e => {
                // console.log(e)
                if (e.lengthComputable) {
                    const percent = e.loaded / e.total * 100;
                    progressBox.innerHTML = `
                                            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
                                              <div class="progress-bar" style="width: ${percent}%"></div>
                                            </div>
                                            <p>${percent.toFixed(1)}%</p>
                                            `
                    // console.log(percent)
                }
            })


            cancelBtn.addEventListener('click', () => {
                xhr.abort()
                setTimeout(() => {
                    uploadForm.reset()
                    progressBox.innerHTML = ''
                    cancelBox.classList.add('not-visible')
                }, 2000)
            })

            return xhr;
        },
        success: function (response) {
            console.log("response", response)
            imageBox.innerHTML = `<img src="${imgUrl}" width="300px" alt="uploaded img" />`
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">
                                  ${response.message}
                                </div>`
            cancelBox.classList.add('not-visible')
        },
        error: function (error) {
            console.log("error", error)
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                                  Ups...! something went wrong!
                                </div>`
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})
