/**
 * @author Hugo S. Souza <hugosilva.souza@hotmail.com>
 */

const router = require('express').Router()
const Schedule = require('../models/Schedule')

router.post('/', async (req, res) => {
    const {
        person,
        scheduleSituation,
        date,
        date_end,
        employee
    } = req.body

    const schedule = {
        person,
        scheduleSituation,
        date,
        date_end,
        employee
    }

    console.log(schedule);

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
            date,
            date_end
        } = req.query

        date && date_end && (query = {
            date: {
                $gte: date,
                $lte: date_end
            }
        });

        const schedule = await Schedule
            .find(query)
            .populate('person')
            .populate('scheduleSituation')
            .populate('employee')
            .sort({ 'date_end': 'asc' });

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
    });

    if (!schedule) {
        res.status(422).json({
            message: 'Agendamento não encontrado(a)!'
        })
        return
    }

    try {
        await Schedule.deleteOne({
            _id: id
        });

        //Para excluir tudo para teste...
        //await Schedule.deleteMany();

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
        date,
        date_end,
        person,
        scheduleSituation,
        employee
    } = req.body


    const schedule = {
        date,
        date_end,
        person,
        scheduleSituation,
        employee
    }

    console.log(id)

    try {
        const updated = await Schedule.updateOne({ _id: id }, schedule);

        if (updated.matchedCount === 0) {
            res.status(422).json({
                message: 'Agendamento não encontrado!'
            });
            return;
        }

        res.status(200).json({ message: 'Alteração realizada!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
})

module.exports = router