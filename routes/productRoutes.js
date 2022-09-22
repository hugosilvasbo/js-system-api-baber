const router = require('express').Router()
const Product = require('../models/Product')

router.post('/', async (req, res) => {
    const { description, price, active, restricted, type } = req.body

    const product = {
        description,
        price,
        active,
        restricted,
        type
    }

    try {
        await Product.create(product)
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findOne({ _id: id })

        if (!product) {
            res.status(422).json({ message: 'O produto não foi encontrado!' })
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { description, price, active, restricted, type } = req.body

    const product = {
        description,
        price,
        active,
        restricted,
        type
    }

    try {
        const updateProduct = await Product.updateOne({ _id: id }, product)

        if (updateProduct.matchedCount === 0) {
            res.status(422).json({ message: 'Produto não encontrado!' })
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const product = await Product.findOne({ _id: id })

    if (!product) {
        res.status(422).json({ message: 'Cadastro não encontrado!' })
        return
    }

    try {
        await Product.deleteOne({ _id: id })
        res.status(200).json({ message: 'Registro excluído com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router