const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    console.log({ APIPost: req.body })
    const { name, email, telephone, cellphone, user, password, password_reseted } = req.body

    const person = {
        name,
        email,
        telephone,
        cellphone,
        user,
        password,
        password_reseted
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: "Pessoa cadastrada com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O usuário nao foi encontrado!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update - atualizacao dos dados (PUT , PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, email, telephone, cellphone, user, password, password_reseted } = req.body

    const person = {
        name,
        email,
        telephone,
        cellphone,
        user,
        password,
        password_reseted
    }

    console.log(password_reseted)

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Pessoa não encontrada!' })
            return
        }

        res.status(200).json({ message: 'Alteração realizada!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Não foi encontrado o cadastro!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: "Pessoa excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router