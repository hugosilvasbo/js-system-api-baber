/**
 * @author Hugo Souza <hugosilva.souza@hotmail.com>
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
    console.log('Cai no get!')
    try {
        let {
            startdate,
            enddate
        } = req.query

        let query = {
            startdate,
            enddate
        }

        Object.keys(query).map((i) => i == undefined && delete query[i])

        const schedule = await Schedule
            .find({
                date: {
                    $gte: query.startdate,
                    $lte: query.enddate
                }
            })
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

module.exports = router