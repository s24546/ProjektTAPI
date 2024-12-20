import express, { Request, Response, Router } from 'express';
import { decoctions } from '../../../data/decoctions';
import { Decoction } from '../../../interfaces/decoctionInterface';
import {ItemType} from "../../../interfaces/itemInterface";

export const decoctionsRouter: Router = express.Router();

// GET all decoctions
decoctionsRouter.get('/decoctions', (req: Request, res: Response) => {
    try {
        if (!decoctions || decoctions.length === 0) {
            res.status(204).json({ error: 'No content, empty decoctions list' });
            return;
        }

        res.status(200).json({
            decoctionsList: decoctions.map(decoction => ({
                ...decoction,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}/decoctions/${decoction.id}` }
                }
            })),
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/decoctions` }
            }
        });
    } catch (error) {
        console.error('Error processing decoctions data:', error);
        res.status(500).json({ error: 'Error processing decoctions data' });
    }
});

// GET decoction by ID
decoctionsRouter.get('/decoctions/:id', (req: Request, res: Response) => {
    const decoctionId = req.params.id;

    try {
        const decoction = decoctions.find(d => d.id === decoctionId);

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
decoctionsRouter.post('/decoctions', (req: Request, res: Response) => {
    const { name, description, ingredients, duration, toxicity }: Decoction = req.body;

    if (!name || !description || !ingredients || !duration || toxicity === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newDecoction: Decoction = {
            id: String(decoctions.length + 1),
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
decoctionsRouter.put('/decoctions/:id', (req: Request, res: Response) => {
    const decoctionId = req.params.id;
    const { name, description, ingredients, duration, toxicity }: Decoction = req.body;

    if (!name || !description || !ingredients || !duration || toxicity === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const decoctionIndex = decoctions.findIndex(d => d.id === decoctionId);

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
decoctionsRouter.delete('/decoctions/:id', (req: Request, res: Response) => {
    const decoctionId = req.params.id;

    try {
        const decoctionIndex = decoctions.findIndex(d => d.id === decoctionId);

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

// GET decoctions by toxicity range
decoctionsRouter.get('/decoctions/toxicity/:min/:max', (req: Request, res: Response) => {
    const minToxicity = parseInt(req.params.min);
    const maxToxicity = parseInt(req.params.max);

    try {
        const filteredDecoctions = decoctions.filter(decoction =>
            decoction.toxicity >= minToxicity && decoction.toxicity <= maxToxicity
        );

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