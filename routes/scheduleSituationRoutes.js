const router = require('express').Router();
const ScheduleSituation = require('../models/ScheduleSituation');

router.post('/', async (req, res) => {
    const {
        description,
        color
    } = req.body;

    const situation = {
        description,
        color
    };

    try {
        await ScheduleSituation.create(situation)
        res.status(201).json({
            message: 'Situação cadastrada!'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const situations = await ScheduleSituation.find();
        res.status(200).json(situations)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const situation = await ScheduleSituation.findOne({ _id: id })

    if (!situation) {
        res.status(422).json({ message: 'Não foi encontrado o cadastro!' })
        return
    }

    try {
        await ScheduleSituation.deleteOne({ _id: id })
        res.status(200).json({ message: "Situação excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

module.exports = router;