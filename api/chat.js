
import OpenAI from "openai";

const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Você é um mecânico automotivo especialista. Responda sempre em português.`;

export default async function handler(req,res){
 if(req.method!=="POST"){
   return res.status(405).json({error:"Método não permitido"});
 }

 try{
   const completion = await client.chat.completions.create({
     model:"gpt-4.1-mini",
     messages:[
       {role:"system",content:SYSTEM_PROMPT},
       ...(req.body.history || []),
       {role:"user",content:req.body.message}
     ]
   });

   res.status(200).json({
     reply: completion.choices[0].message.content
   });
 }catch(err){
   res.status(500).json({error:err.message});
 }
}
