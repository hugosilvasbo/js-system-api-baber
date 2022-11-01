/**
 * @author Hugo S. Souza <hugosilva.souza@hotmail.com>
 */

const router = require('express').Router()
const Schedule = require('../models/Schedule')

router.post('/', async (req, res) => {
    const {
        person,
        date
    } = req.body

    const schedule = {
        person,
        date
    }

    try {
        await Schedule.create(schedule)
        res.status(201).json({
            message: 'Agendamento realizado!'
        })
    } catch (error) {
        res.status(500).json({

            error: error
        })
    }
})

router.get('/', async (req, res) => {
    try {
        let query;
        let {
            dia_inicial,
            dia_final
        } = req.query

        dia_inicial && dia_final && (query = {
            date: {
                $gte: dia_inicial,
                $lte: dia_final
            }
        })

        const schedule = await Schedule
            .find(query)
            .populate('person')

        res.status(200).json(schedule)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const schedule = await Schedule.findOne({
        _id: id
    })

    if (!schedule) {
        res.status(422).json({
            message: 'Agendamento não encontrado(a)!'
        })
        return
    }

    try {
        await Schedule.deleteOne({
            _id: id
        })
        res.status(200).json({
            message: "Agendamento removido!"
        });
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {
        date
    } = req.body


    const schedule = {
        date
    }

    try {
        const updated = await Schedule.updateOne({
            _id: id
        }, schedule)

        if (updated.matchedCount === 0) {
            res.status(422).json({
                message: 'Agendamento não encontrado!'
            })
            return
        }

        res.status(200).json({
            message: 'Alteração realizada!'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router