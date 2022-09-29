const { captureRejectionSymbol } = require('events');
const { Router } = require('express');
const router = Router();
//file sistem es para leer archivos
const fs = require('fs');
const { uuid } = require('uuidv4');

const json_books = fs.readFileSync('src/books.json', 'utf-8');
//convertir a Json para que lo vuelva a leer
//dentro del arreglo books estan los datos 
let books = JSON.parse(json_books);

router.get('/', (req, res) =>{
    //res.send('hello world') 
    res.render('index.ejs', {
        books  
    }); 
});

router.get('/new-entry', (req, res)=>{
    res.render('new-entry');
});

router.post('/new-entry', (req, res)=>{
    //para verlos en formato json
    //console.log(req.body);
    const {title, author, image, description } = req.body;

    if (!title || !author || !image || !description){
        res.status(400).send('Debe completar todos los campos.');
        return;
    }

    let newBook = {
        id: uuid(), 
        title,
        author,
        image,
        description
    }; 

    books.push(newBook)
    //toma un json (books) lo convierte a una lista llamada json_books
    const json_books = JSON.stringify(books)
    //formato utf-8
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    
    //res.send('received');
    res.redirect('/');
});

    router.get('/delete/:id', (req, res)=>{
        //teniendo los datos 
        //console.log(req.params);
        //res.send('received');
        //el metodo filter recorre un arreglo y permite 
        //aplicar una condicional que permite agregar datos

        //recorre el arreglo, quita el libro a eliminar y despues 
        //actualiza el arreglo, una vez actualizado, se vuelve 
        //a escribir el archivo
        books = books.filter(book => book.id != req.params.id);
        const json_books = JSON.stringify(books);
        fs.writeFileSync('src/books.json', json_books, 'utf-8');
        res.redirect('/');
    }); 
  

module.exports = router;