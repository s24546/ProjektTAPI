import express, { Request, Response, Router } from 'express';
import { oils } from '../../../data/oils';
import { Oil } from '../../../interfaces/oilInterface';
import {ItemType} from "../../../interfaces/itemInterface";
import {swords} from "../../../data/swords";

export const oilsRouter: Router = express.Router();

// GET oils
oilsRouter.get('/', (req: Request, res: Response) => {
    if (!req.query.ingredient) {
        return res.status(200).json({
            oils: oils,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    }

    const ingredient = req.query.ingredient as string;

    try {
        const filteredOils = oils.filter(oil => {
            const matches = oil.ingredients.toLowerCase().includes(ingredient.toLowerCase());
            return matches;
        });
        res.status(200).json({
            oils: filteredOils,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error filtering oils:', error);
        res.status(500).json({ error: 'Error filtering oils' });
    }
});

// GET oil by ID
oilsRouter.get('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const oil = oils.find(o => o.id === idParam)
        if (oil) {
            res.status(200).json({
                ...oil,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    list: { href: `${req.protocol}://${req.get('host')}/oils` }
                }
            });
        } else {
            res.status(404).json({ error: 'Oil not found' });
        }
    } catch (error) {
        console.error('Error processing oil data:', error);
        res.status(500).json({ error: 'Error processing oil data' });
    }
});

// POST new oil
oilsRouter.post('/', (req: Request, res: Response) => {
    const { name, description, ingredients, charges }: Oil = req.body;

    if (!name || !description || !ingredients || charges === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newOil: Oil = {
            id: Number(oils.length + 1),
            name,
            description,
            type: ItemType.OIL,
            ingredients,
            charges
        };

        oils.push(newOil);

        res.status(201).json({
            message: 'Oil created successfully',
            oil: newOil,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${newOil.id}` },
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error creating oil:', error);
        res.status(500).json({ error: 'Error creating oil' });
    }
});

// PUT update oil
oilsRouter.put('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    const { name, description, ingredients, charges }: Oil = req.body;

    if (!name || !description || !ingredients || charges === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const oilIndex = oils.findIndex(o => o.id === idParam);

        if (oilIndex === -1) {
            res.status(404).json({ error: 'Oil not found' });
            return;
        }

        oils[oilIndex] = {
            ...oils[oilIndex],
            name,
            description,
            ingredients,
            charges
        };

        res.status(200).json({
            message: 'Oil updated successfully',
            oil: oils[oilIndex],
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error updating oil:', error);
        res.status(500).json({ error: 'Error updating oil' });
    }
});

// DELETE oil
oilsRouter.delete('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const oilIndex = oils.findIndex(o => o.id === idParam);

        if (oilIndex === -1) {
            res.status(404).json({ error: 'Oil not found' });
            return;
        }

        oils.splice(oilIndex, 1);

        res.status(200).json({
            message: 'Oil deleted successfully',
            _links: {
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error deleting oil:', error);
        res.status(500).json({ error: 'Error deleting oil' });
    }
});

// PATCH oils
oilsRouter.patch('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    try {
        const oilIndex = oils.findIndex(o => o.id === id);
        if (oilIndex === -1) {
            return res.status(404).json({ error: 'Oil not found' });
        }

        oils[oilIndex] = { ...oils[oilIndex], ...updates };
        res.status(200).json({
            oil: oils[oilIndex],
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error updating oil:', error);
        res.status(500).json({ error: 'Error updating oil' });
    }
});

