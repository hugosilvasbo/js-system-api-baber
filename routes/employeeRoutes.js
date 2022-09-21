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

module.exports = router