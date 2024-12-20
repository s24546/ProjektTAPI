import express, { Request, Response, Router } from 'express';
import { oils } from '../../../data/oils';
import { Oil } from '../../../interfaces/oilInterface';
import {ItemType} from "../../../interfaces/itemInterface";

export const oilsRouter: Router = express.Router();

// GET all oils
oilsRouter.get('/oils', (req: Request, res: Response) => {
    try {
        if (!oils || oils.length === 0) {
            res.status(204).json({ error: 'No content, empty oils list' });
            return;
        }

        res.status(200).json({
            oilsList: oils.map(oil => ({
                ...oil,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}/oils/${oil.id}` }
                }
            })),
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/oils` }
            }
        });
    } catch (error) {
        console.error('Error processing oils data:', error);
        res.status(500).json({ error: 'Error processing oils data' });
    }
});

// GET oil by ID
oilsRouter.get('/oils/:id', (req: Request, res: Response) => {
    const oilId = req.params.id;

    try {
        const oil = oils.find(o => o.id === oilId);

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
oilsRouter.post('/oils', (req: Request, res: Response) => {
    const { name, description, ingredients, charges }: Oil = req.body;

    if (!name || !description || !ingredients || charges === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newOil: Oil = {
            id: String(oils.length + 1),
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
oilsRouter.put('/oils/:id', (req: Request, res: Response) => {
    const oilId = req.params.id;
    const { name, description, ingredients, charges }: Oil = req.body;

    if (!name || !description || !ingredients || charges === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const oilIndex = oils.findIndex(o => o.id === oilId);

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
oilsRouter.delete('/oils/:id', (req: Request, res: Response) => {
    const oilId = req.params.id;

    try {
        const oilIndex = oils.findIndex(o => o.id === oilId);

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

// GET oils by ingredient
oilsRouter.get('/oils/ingredients/:ingredient', (req: Request, res: Response) => {
    const ingredient = req.params.ingredient.toLowerCase();

    try {
        const filteredOils = oils.filter(oil =>
            oil.ingredients.toLowerCase().includes(ingredient)
        );

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