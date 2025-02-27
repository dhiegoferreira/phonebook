
const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.static('dist'))
app.use(cors())

var morgan = require('morgan')


// Define a custom token for the request body
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body')
)

app.use(express.json()) 

let persons = 
    [
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]


app.get("/info", (request, response) => {

    const amount = persons.length

    const dateNow = new Date(Date.now())

    response.end(`Phonebook has info for ${amount} people\n\n${dateNow.toString()}`)
})

app.get("/api/persons", (request,response) => {
    response.json(persons)
})


app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id

    const person = persons.find(person => person.id == id) 

    return person ? response.json(result) : response.status(402).end()
})


app.delete("/api/persons/:id", (request, response) => {
    
    const id = request.params.id

    const personToRemove = persons.filter(person => person.id !== id)

    return personToRemove ? response.json(personToRemove) : response.status(402).end()
})





app.post("/api/persons", (request, response) => {
    
    const body = request.body;


    if(!body.name){
        return  response.status(400).json({
            error: 'name missing'
        });
    }

    if(!body.number){
        return  response.status(400).json({
            error: 'number missing'
        });
    }

    if(persons.find(person => person.name === body.name)){
        return  response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: getRandom(),
        name: body.name,
        number: body.number 
    };

    persons = persons.concat(person);
    
    response.json(persons);
}) 

function getRandom() {
    return Math.random() * (0 - Number.MAX_SAFE_INTEGER) + Number.MAX_SAFE_INTEGER;
  }

const generateId = () => {
    
    const maxID = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0

    return String(maxId + 1)
}


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



