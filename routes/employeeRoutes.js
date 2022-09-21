const router = require('express').Router()
const Employee = require('../models/Employee')

router.post('/', async (req, res) => {
    const { name, active } = req.body

    const employee = {
        name,
        active
    }

    try {
        await Employee.create(employee)
        res.status(201).json({ message: "Cadastro efetuado com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/', async (req, res) => {
    try {
        const employee = await Employee.find()

        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const employee = await Employee.findOne({ _id: id })

        if (!employee) {
            res.status(422).json({ message: 'funcionário(a) nao foi encontrado(a)!' })
            return
        }

        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, active } = req.body

    const employee = {
        name,
        active
    }

    try {
        const updatedEmployee = await Employee.updateOne({ _id: id }, employee)

        if (updatedEmployee.matchedCount === 0) {
            res.status(422).json({ message: 'Funcionário(a) não encontrado(a)!' })
            return
        }

        res.status(200).json({ message: 'Alteração realizada!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const employee = await Employee.findOne({ _id: id })

    if (!employee) {
        res.status(422).json({ message: 'Funcionário(a) não encontrado(a)!' })
        return
    }

    try {
        await Employee.deleteOne({ _id: id })
        res.status(200).json({ message: "Funcionário(a) excluído(a) com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router