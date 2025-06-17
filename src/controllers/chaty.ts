import { Request, Response } from "express";
import { handleError } from '../helpers/securityFunctions';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getQuestion = async (req: Request, res: Response) => {
    try {

        const { topic, difficulty } = req.body;

        if (!topic || !difficulty) {
            return res.status(400).json({ error: 'Falta el tema o la dificultad' });
        }

        const prompt = `
        Genera una pregunta de trivia sobre el tema: "${topic}", con un nivel de dificultad: "${difficulty}" (easy, medium o hard). La pregunta debe tener 4 opciones de respuesta, una de las cuales debe ser correcta. Devuelve el resultado estrictamente en formato JSON con las siguientes propiedades:
  
        {
          "question": string,
          "options": string[4],
          "correct_answer": string,
          "justification": string
        }
  
        La respuesta correcta debe coincidir exactamente con una de las opciones. La justificación debe explicar por qué esa opción es la correcta. Todo el contenido (pregunta, opciones y justificación) debe estar en español.
      
      `;

      try {
        const response = await openai.chat.completions.create({
            model: 'o4-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 1
        });

        const rawText = response.choices[0].message.content;

        try {
            const jsonTrivia = JSON.parse(rawText!);
            return res.json(jsonTrivia);
        } catch {
            return res.status(500).json({
                error: 'No se pudo interpretar la respuesta como JSON',
                raw: rawText
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al generar la trivia' });
    }


    } catch (ex) {
        handleError(res, ex)
    }
}
