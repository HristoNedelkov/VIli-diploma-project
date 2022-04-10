
function addEventListeners() {
    partialTemplate('header-template')
    partialTemplate('home-logged-template')
    partialTemplate('post-template')
    partialTemplate('edit-template')
    partialTemplate('home-logged-template')

    navigate('home')

}
function partialTemplate(id) {
    let cardTemp = Handlebars.compile(document.getElementById(id).innerHTML)
    Handlebars.registerPartial(id, cardTemp)
}
function navigateHandler(event) {
    //Navigate Handler --------
    event.preventDefault()
    let url = new URL(event.target.href)
    navigate(url.pathname.slice(1))
    //That returns us only the patch word
}

function onLoginSubmit(event) {

    event.preventDefault()
    let formData = new FormData(document.forms['login-form'])

    let email = formData.get('email')
    let password = formData.get('password')

    authServices.login(email, password)
        .then(data => {
            let isReg = data.registered || false
            if (isReg) {

                navigate('home')

            } else {
                navigate('login')
            }
        })
}

function onRegSubmit(event) {
    event.preventDefault()
    let formData = new FormData(document.forms['register-form'])

    let email = formData.get('email')
    let password = formData.get('password')
    let repeatedPass = formData.get('repeatPassword')

    let isValid = password === repeatedPass && email != '' ? true : false
    if (isValid) {
        authServices.register(email, password)
        navigate('home')
    } else {
        navigate('register')
    }

}

function onAddPostSubmit(event) {
    event.preventDefault()
    let formData = new FormData(document.forms['create-post-form'])
    let title = formData.get('title')
    let category = formData.get('category')
    let content = formData.get('content')


    let isValid = title != '' && category != '' && content != ''

    if (isValid) {
        itemSurvices.add({ title, category, content })
            .then(res => {
                navigate('home')
            })
    } else {
        navigate('home')
        console.log('FIll all of the inputs')
    }



}


const navigate = (path) => {
    //Here we change the address and shhow the html with  ROUTER()
    history.pushState({}, '', path)
    router(path)
}



function deleteOneFunc(e) {
    e.preventDefault()
    let id = window.location.href.split('/').pop()


    itemSurvices.deleteOne(id)
        .then(res => {
            console.log(res)
            navigate('home')
        })

        .catch(e => console.log(e))
}
function editOneFunc(e) {
    e.preventDefault()
    let id = window.location.href.split('/').pop()

        let formData = new FormData(document.forms['edit-form'])
        let title = formData.get('title')
        let category = formData.get('category')
        let content = formData.get('content')
       
        let elements = {
           title,
           category,
           content,
        }
       itemSurvices.editOne(id, elements)
            .then(res => {
                navigate('home')
            })
            .catch(e => {
                console.log(`${e} ----> GRESHKAAAAAAAAAA`)
            })



}



addEventListeners()