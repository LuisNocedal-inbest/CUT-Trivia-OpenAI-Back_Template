import { Router } from 'express';
import { getQuestion } from '../controllers/chaty';

const chatyRouter = Router();

/**
 * @swagger
 * /chaty/get-question:
 *   post:
 *     summary: Obtienes una pregunta bajo los parámatros solicitados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 description: Categoría de la pregunta
 *               difficulty:
 *                 type: string
 *                 description: Dificultad de la pregunta
 *     responses:
 *       200:
 *         description: Repuesta y sus opciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                   description: Pregunta
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                 correct_answer:
 *                   type: string
 *                   description: Respuesta correcta
 *                 justification:
 *                   type: string
 *                   description: Justificación de la respuesta correcta
 */
chatyRouter.post('/get-question', getQuestion);

export default chatyRouter;