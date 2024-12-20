import express, { Request, Response, Router } from 'express';
import { swords } from '../../../data/swords';
import { Sword } from '../../../interfaces/swordInterface';
import {ItemType} from "../../../interfaces/itemInterface";
export const swordsRouter: Router = express.Router();

// GET all swords
swordsRouter.get('/swords', (req: Request, res: Response) => {
    try {
        if (!swords || swords.length === 0) {
            res.status(204).json({ error: 'No content, empty swords list' });
            return;
        }

        res.status(200).json({
            swordsList: swords.map(sword => ({
                ...sword,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}/swords/${sword.id}` }
                }
            })),
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}/swords` },
                silver: { href: `${req.protocol}://${req.get('host')}/swords/silver` },
                steel: { href: `${req.protocol}://${req.get('host')}/swords/steel` }
            }
        });
    } catch (error) {
        console.error('Error processing swords data:', error);
        res.status(500).json({ error: 'Error processing swords data' });
    }
});

// GET sword by ID
swordsRouter.get('/swords/:id', (req: Request, res: Response) => {
    const swordId = req.params.id;

    try {
        const sword = swords.find(s => s.id === swordId);

        if (sword) {
            res.status(200).json({
                ...sword,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    list: { href: `${req.protocol}://${req.get('host')}/swords` }
                }
            });
        } else {
            res.status(404).json({ error: 'Sword not found' });
        }
    } catch (error) {
        console.error('Error processing sword data:', error);
        res.status(500).json({ error: 'Error processing sword data' });
    }
});

// POST new sword
swordsRouter.post('/swords', (req: Request, res: Response) => {
    const { name, description, material }: Sword = req.body;

    if (!name || !description || !material) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newSword: Sword = {
            id: String(swords.length + 1),
            name,
            description,
            type: ItemType.SWORD,
            material
        };

        swords.push(newSword);

        res.status(201).json({
            message: 'Sword created successfully',
            sword: newSword,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${newSword.id}` },
                list: { href: `${req.protocol}://${req.get('host')}/swords` }
            }
        });
    } catch (error) {
        console.error('Error creating sword:', error);
        res.status(500).json({ error: 'Error creating sword' });
    }
});

// PUT update sword
swordsRouter.put('/swords/:id', (req: Request, res: Response) => {
    const swordId = req.params.id;
    const { name, description, material }: Sword = req.body;

    if (!name || !description || !material) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const swordIndex = swords.findIndex(s => s.id === swordId);

        if (swordIndex === -1) {
            res.status(404).json({ error: 'Sword not found' });
            return;
        }

        swords[swordIndex] = {
            ...swords[swordIndex],
            name,
            description,
            material
        };

        res.status(200).json({
            message: 'Sword updated successfully',
            sword: swords[swordIndex],
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/swords` }
            }
        });
    } catch (error) {
        console.error('Error updating sword:', error);
        res.status(500).json({ error: 'Error updating sword' });
    }
});

// DELETE sword
swordsRouter.delete('/swords/:id', (req: Request, res: Response) => {
    const swordId = req.params.id;

    try {
        const initialLength = swords.length;
        const swordIndex = swords.findIndex(s => s.id === swordId);

        if (swordIndex === -1) {
            res.status(404).json({ error: 'Sword not found' });
            return;
        }

        swords.splice(swordIndex, 1);

        res.status(200).json({
            message: 'Sword deleted successfully',
            _links: {
                list: { href: `${req.protocol}://${req.get('host')}/swords` }
            }
        });
    } catch (error) {
        console.error('Error deleting sword:', error);
        res.status(500).json({ error: 'Error deleting sword' });
    }
});

// Filtrowanie po materiale
swordsRouter.get('/swords/material/:material', (req: Request, res: Response) => {
    const materialType = req.params.material as 'silver' | 'steel';

    try {
        const filteredSwords = swords.filter(sword => sword.material === materialType);

        res.status(200).json({
            swords: filteredSwords,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/swords` }
            }
        });
    } catch (error) {
        console.error('Error filtering swords:', error);
        res.status(500).json({ error: 'Error filtering swords' });
    }
});