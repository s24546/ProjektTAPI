import express, { Request, Response, Router } from 'express';
import { decoctions } from '../../../data/decoctions';
import { Decoction } from '../../../interfaces/decoctionInterface';
import {ItemType} from "../../../interfaces/itemInterface";

export const decoctionsRouter: Router = express.Router();

// GET decoctions
decoctionsRouter.get('/', (req: Request, res: Response) => {
    if (!req.query.min || !req.query.max) {
        return res.status(200).json({
            decoctions: decoctions,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    }

    const minToxicity = parseInt(req.query.min as string);
    const maxToxicity = parseInt(req.query.max as string);

    if (isNaN(minToxicity) || isNaN(maxToxicity)) {
        return res.status(400).json({ error: 'Min and max must be valid numbers' });
    }

    try {
        const filteredDecoctions = decoctions.filter(decoction => {
            const inRange = decoction.toxicity >= minToxicity && decoction.toxicity <= maxToxicity;
            return inRange;
        });
        res.status(200).json({
            decoctions: filteredDecoctions,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error filtering decoctions:', error);
        res.status(500).json({ error: 'Error filtering decoctions' });
    }
});

// GET decoction by ID
decoctionsRouter.get('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const decoction = decoctions.find(d => d.id === idParam);

        if (decoction) {
            res.status(200).json({
                ...decoction,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
                }
            });
        } else {
            res.status(404).json({ error: 'Decoction not found' });
        }
    } catch (error) {
        console.error('Error processing decoction data:', error);
        res.status(500).json({ error: 'Error processing decoction data' });
    }
});

// POST new decoction
decoctionsRouter.post('/', (req: Request, res: Response) => {
    const { name, description, ingredients, duration, toxicity }: Decoction = req.body;

    if (!name || !description || !ingredients || !duration || toxicity === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newDecoction: Decoction = {
            id: Number(decoctions.length + 1),
            name,
            description,
            type: ItemType.DECOCTION,
            ingredients,
            duration,
            toxicity
        };

        decoctions.push(newDecoction);

        res.status(201).json({
            message: 'Decoction created successfully',
            decoction: newDecoction,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${newDecoction.id}` },
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error creating decoction:', error);
        res.status(500).json({ error: 'Error creating decoction' });
    }
});

// PUT update decoction
decoctionsRouter.put('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    const { name, description, ingredients, duration, toxicity }: Decoction = req.body;

    if (!name || !description || !ingredients || !duration || toxicity === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const decoctionIndex = decoctions.findIndex(d => d.id === idParam);

        if (decoctionIndex === -1) {
            res.status(404).json({ error: 'Decoction not found' });
            return;
        }

        decoctions[decoctionIndex] = {
            ...decoctions[decoctionIndex],
            name,
            description,
            ingredients,
            duration,
            toxicity
        };

        res.status(200).json({
            message: 'Decoction updated successfully',
            decoction: decoctions[decoctionIndex],
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error updating decoction:', error);
        res.status(500).json({ error: 'Error updating decoction' });
    }
});

// DELETE decoction
decoctionsRouter.delete('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const decoctionIndex = decoctions.findIndex(d => d.id === idParam);

        if (decoctionIndex === -1) {
            res.status(404).json({ error: 'Decoction not found' });
            return;
        }

        decoctions.splice(decoctionIndex, 1);

        res.status(200).json({
            message: 'Decoction deleted successfully',
            _links: {
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error deleting decoction:', error);
        res.status(500).json({ error: 'Error deleting decoction' });
    }
});

// PATCH decoctions

decoctionsRouter.patch('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    try {
        const decoctionIndex = decoctions.findIndex(d => d.id === id);
        if (decoctionIndex === -1) {
            return res.status(404).json({ error: 'Decoction not found' });
        }

        decoctions[decoctionIndex] = { ...decoctions[decoctionIndex], ...updates };
        res.status(200).json({
            decoction: decoctions[decoctionIndex],
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error updating decoction:', error);
        res.status(500).json({ error: 'Error updating decoction' });
    }
});

