import { Request, Response } from 'express';
import {  } from '../services/mcp.service';

export class MCPController {
    // async generateResponse(req: Request, res: Response) {
    //     try {
    //         const { prompt } = req.body;
            
    //         if (!prompt) {
    //             return res.status(400).json({ error: 'Prompt is required' });
    //         }

    //         const response = await mcpService.generateResponse(prompt);
    //         return res.json({ response });
    //     } catch (error) {
    //         console.error('Error in generateResponse:', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    // async analyzeText(req: Request, res: Response) {
    //     try {
    //         const { text } = req.body;
            
    //         if (!text) {
    //             return res.status(400).json({ error: 'Text is required' });
    //         }

    //         const analysis = await mcpService.analyzeText(text);
    //         return res.json({ analysis });
    //     } catch (error) {
    //         console.error('Error in analyzeText:', error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // }
}

export const mcpController = new MCPController();