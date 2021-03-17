let myLibrary = JSON.parse(localStorage.getItem('userLibrary'))
if (!myLibrary) myLibrary = []


const originalDiv = document.querySelector('.book-list')
const newBookBtn = document.querySelector('.new-book')
newBookBtn.addEventListener('click', addBookToLibrary)

function Book (title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} is ${this.pages} long. Finished reading: ${this.haveRead}`
}

function addBookToLibrary() {

    let title = prompt('Title of book?')
    let author = prompt('Author of book?')
    let pages = prompt('Number of pages?')
    let haveRead = prompt('Have you read the book? (true or false)')


    const book = new Book(title, author, pages, haveRead)
    myLibrary.push(book)
    localStorage.setItem('userLibrary', JSON.stringify(myLibrary))
    originalDiv.innerHTML = ''
    displayBook()
    console.log(myLibrary)
}

function displayBook() {
    
    localStorage.setItem('userLibrary', JSON.stringify(myLibrary))

    for (const book of myLibrary) {                                     // for/of vs (x)for/in vs forEach()?
        
        
        const div = document.createElement('div')
        div.classList.add('book-card')
        div.classList.add(myLibrary.indexOf(book))

        const title = document.createElement('h2')
        title.classList.add('title')
        title.classList.add(myLibrary.indexOf(book))

        const author = document.createElement('h3')
        author.classList.add('author')
        author.classList.add(myLibrary.indexOf(book))

        const pages = document.createElement('p')
        pages.classList.add('pages')
        pages.classList.add(myLibrary.indexOf(book))

        const haveRead = document.createElement('p')
        haveRead.classList.add('haveRead')
        haveRead.classList.add(myLibrary.indexOf(book))


        title.textContent = book.title
        author.textContent = `Written by: ${book.author}`
        pages.textContent = `Number of pages: ${book.pages}`


        let readStatus
        if (book.haveRead) {
            readStatus = "Yes" 
        } else readStatus = "No"
        haveRead.textContent = `Have you read it? ${readStatus}`


        div.appendChild(title)
        div.appendChild(author)
        div.appendChild(pages)
        div.appendChild(haveRead)


        const removeBookBtn = document.createElement('button')
        removeBookBtn.classList.add('remove-book-btn')
        removeBookBtn.classList.add(myLibrary.indexOf(book))
        removeBookBtn.textContent = 'Remove book'
        removeBookBtn.addEventListener('click', removeBook)


        const changeReadStatusBtn = document.createElement('button')
        changeReadStatusBtn.classList.add('change-status-btn')
        changeReadStatusBtn.classList.add(myLibrary.indexOf(book))
        changeReadStatusBtn.textContent = `Change 'read' status`
        changeReadStatusBtn.addEventListener('click', changeReadStatus)


        div.appendChild(removeBookBtn)
        div.appendChild(changeReadStatusBtn)


        originalDiv.appendChild(div)
    }
}

function removeBook(event) {


    let divs = originalDiv.children                                     // originalDiv.children --> array-like collection
    for (let i=0; i < divs.length; i++) {
        if (event.target.classList[1] == divs[i].classList[1]) {        // key: 1 contains pseudo-id identifier
            divs[i].remove()
            myLibrary.splice(i, 1)
        }
    }

    localStorage.setItem('userLibrary', JSON.stringify(myLibrary))


    // console.log(event.target)
    // console.log(event.target.classList)

    // console.log(originalDiv)                                         // element nodes are objects
    // console.log(Object.keys(originalDiv))                            // returns empty array
    // console.log(Object.values(originalDiv))
    // console.log(Object.entries(originalDiv))
}

function changeReadStatus(event) {


    let readStatus

    let divs = originalDiv.children                                     // originalDiv.children --> array-like collection
    for (let i=0; i < divs.length; i++) {
        if (event.target.classList[1] == divs[i].classList[1]) {        // key: 1 contains pseudo-id identifier
            myLibrary[i].haveRead = !myLibrary[i].haveRead              // toggles 'read' status

            if (myLibrary[i].haveRead) {
                readStatus = "Yes" 
            } else readStatus = "No"
            
            let pHaveReads = document.querySelectorAll('.haveRead')
            console.log(pHaveReads)
            
            
        }


    localStorage.setItem('userLibrary', JSON.stringify(myLibrary))
        
    }
}


// const book1 = new Book('Harry Potter', 'J.K. Rowling', 1000, true)
// myLibrary.push(book1)
// // console.log(book1.info())

// const book2 = new Book('Comoran Strike', 'Robert Galbraith', 500, false)
// myLibrary.push(book2)
// // console.log(book2.info())


displayBook()


