import express, { Request, Response, Router } from 'express';
import { swords } from '../../../data/swords';
import { Sword } from '../../../interfaces/swordInterface';
import {ItemType} from "../../../interfaces/itemInterface";
export const swordsRouter: Router = express.Router();

// GET swords
swordsRouter.get('/', (req: Request, res: Response) => {

    if (!req.query.material) {
        return res.status(200).json({
            swords: swords,
            _links: {
                self: { href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                list: { href: `${req.protocol}://${req.get('host')}/swords` }
            }
        });
    }

    const material = req.query.material as string;

    if (material !== 'silver' && material !== 'steel') {
        return res.status(400).json({ error: 'Material must be either "silver" or "steel"' });
    }

    try {
        const filteredSwords = swords.filter(sword => {
            return sword.material === material;
        });
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

// GET sword by ID
swordsRouter.get('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const sword = swords.find(s => s.id === idParam);
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
swordsRouter.post('/', (req: Request, res: Response) => {
    const { name, description, material }: Sword = req.body;

    if (!name || !description || !material) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const newSword: Sword = {
            id: Number(swords.length + 1),
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
swordsRouter.put('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { name, description, material }: Sword = req.body;
    if (!name || !description || !material) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const swordIndex = swords.findIndex(s => s.id === idParam);
        if (swordIndex === -1) {
            return res.status(404).json({ error: 'Sword not found' });
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
swordsRouter.delete('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const swordIndex = swords.findIndex(s => s.id === idParam);
        if (swordIndex === -1) {
            return res.status(404).json({ error: 'Sword not found' });
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

//PATCH sword
swordsRouter.patch('/:id', (req: Request, res: Response) => {
    const idParam = Number(req.params.id);

    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updates = req.body;

    try {
        const swordIndex = swords.findIndex(s => s.id === idParam); // używamy nowej nazwy zmiennej
        if (swordIndex === -1) {
            return res.status(404).json({ error: 'Sword not found' });
        }

        swords[swordIndex] = { ...swords[swordIndex], ...updates };
        res.status(200).json({
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

